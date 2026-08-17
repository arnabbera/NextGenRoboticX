const FIREBASE_PROJECT_ID = "nextgenroboticx";
const PASS_AMOUNT = 9900;
const PASS_CURRENCY = "INR";
const PASS_PRODUCT = "all-nine-projects-lifetime";

let firebaseCertificateCache = null;
let firebaseCertificateExpiresAt = 0;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "no-referrer",
    },
  });

const base64UrlBytes = (value) => {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

const parseJwtPart = (value) =>
  JSON.parse(new TextDecoder().decode(base64UrlBytes(value)));

async function getFirebaseCertificates() {
  if (firebaseCertificateCache && Date.now() < firebaseCertificateExpiresAt) {
    return firebaseCertificateCache;
  }

  const response = await fetch(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  );

  if (!response.ok) {
    throw new Error("Unable to load Firebase signing certificates.");
  }

  const cacheControl = response.headers.get("cache-control") || "";
  const maxAge = Number(cacheControl.match(/max-age=(\d+)/)?.[1] || 3600);

  const keySet = await response.json();
  firebaseCertificateCache = Object.fromEntries(
    (keySet.keys || []).map((key) => [key.kid, key])
  );
  firebaseCertificateExpiresAt = Date.now() + maxAge * 1000;
  return firebaseCertificateCache;
}

async function verifyFirebaseToken(request) {
  const authorization = request.headers.get("authorization") || "";

  if (!authorization.startsWith("Bearer ")) {
    throw new Error("Authentication required.");
  }

  const token = authorization.slice(7);
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid authentication token.");
  }

  const header = parseJwtPart(parts[0]);
  const payload = parseJwtPart(parts[1]);

  if (header.alg !== "RS256" || !header.kid) {
    throw new Error("Unsupported authentication token.");
  }

  const certificates = await getFirebaseCertificates();
  const certificate = certificates[header.kid];

  if (!certificate) {
    firebaseCertificateCache = null;
    throw new Error("Unknown authentication certificate.");
  }

  const key = await crypto.subtle.importKey(
    "jwk",
    certificate,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const validSignature = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    base64UrlBytes(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
  );

  const now = Math.floor(Date.now() / 1000);
  const expectedIssuer =
    `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;

  if (
    !validSignature ||
    payload.aud !== FIREBASE_PROJECT_ID ||
    payload.iss !== expectedIssuer ||
    !payload.sub ||
    payload.exp <= now ||
    payload.iat > now + 60
  ) {
    throw new Error("Invalid or expired authentication token.");
  }

  return {
    uid: payload.sub,
    email: payload.email || "",
    name: payload.name || "",
  };
}

const razorpayAuthorization = (env) =>
  `Basic ${btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`)}`;

async function razorpayRequest(env, path, options = {}) {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay Test Mode is not configured.");
  }

  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: razorpayAuthorization(env),
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Razorpay request failed", response.status, data?.error?.code);
    throw new Error(data?.error?.description || "Payment service request failed.");
  }

  return data;
}

async function hmacHex(secret, value) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );
  return [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(left, right) {
  if (
    typeof left !== "string" ||
    typeof right !== "string" ||
    left.length !== right.length
  ) {
    return false;
  }

  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

async function readJson(request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 10000) throw new Error("Request is too large.");
  return request.json();
}

function requireKv(env) {
  if (!env.PROJECT_ACCESS) {
    throw new Error("Project access storage is not configured.");
  }
  return env.PROJECT_ACCESS;
}

async function getEntitlement(env, uid) {
  const kv = requireKv(env);
  return kv.get(`entitlement:${uid}`, "json");
}

async function handleStatus(request, env) {
  const user = await verifyFirebaseToken(request);
  const entitlement = await getEntitlement(env, user.uid);

  return json({
    active: entitlement?.active === true,
    type: entitlement?.type || null,
    purchasedAt: entitlement?.purchasedAt || null,
  });
}

async function handleOrder(request, env) {
  const user = await verifyFirebaseToken(request);
  const body = await readJson(request);

  if (body.product !== PASS_PRODUCT) {
    return json({ error: "Invalid project pass product." }, 400);
  }

  const existing = await getEntitlement(env, user.uid);
  if (existing?.active) {
    return json({ error: "Project Pass is already active." }, 409);
  }

  const receipt = `ngrx_${user.uid.slice(0, 10)}_${Date.now()}`;
  const order = await razorpayRequest(env, "/orders", {
    method: "POST",
    body: JSON.stringify({
      amount: PASS_AMOUNT,
      currency: PASS_CURRENCY,
      receipt,
      payment_capture: 1,
      notes: {
        firebase_uid: user.uid,
        product: PASS_PRODUCT,
      },
    }),
  });

  const kv = requireKv(env);
  await kv.put(
    `order:${order.id}`,
    JSON.stringify({
      uid: user.uid,
      email: user.email,
      amount: PASS_AMOUNT,
      currency: PASS_CURRENCY,
      createdAt: new Date().toISOString(),
    }),
    { expirationTtl: 86400 }
  );

  return json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: env.RAZORPAY_KEY_ID,
  });
}

async function handleVerify(request, env) {
  const user = await verifyFirebaseToken(request);
  const body = await readJson(request);

  const orderId = body.razorpay_order_id;
  const paymentId = body.razorpay_payment_id;
  const receivedSignature = body.razorpay_signature;

  if (!orderId || !paymentId || !receivedSignature) {
    return json({ error: "Incomplete payment verification data." }, 400);
  }

  const kv = requireKv(env);
  const pendingOrder = await kv.get(`order:${orderId}`, "json");

  if (!pendingOrder || pendingOrder.uid !== user.uid) {
    return json({ error: "Payment order does not belong to this user." }, 403);
  }

  const expectedSignature = await hmacHex(
    env.RAZORPAY_KEY_SECRET,
    `${orderId}|${paymentId}`
  );

  if (!constantTimeEqual(expectedSignature, receivedSignature)) {
    return json({ error: "Invalid payment signature." }, 400);
  }

  const payment = await razorpayRequest(
    env,
    `/payments/${encodeURIComponent(paymentId)}`,
    { method: "GET" }
  );

  if (
    payment.order_id !== orderId ||
    payment.amount !== PASS_AMOUNT ||
    payment.currency !== PASS_CURRENCY ||
    payment.status !== "captured"
  ) {
    return json(
      {
        error:
          payment.status === "authorized"
            ? "Payment is authorised and awaiting capture. Please retry shortly."
            : "Payment has not been captured successfully.",
      },
      409
    );
  }

  const entitlement = {
    active: true,
    type: "lifetime",
    product: PASS_PRODUCT,
    amountPaid: 99,
    currency: PASS_CURRENCY,
    projectCount: 9,
    purchasedAt: new Date().toISOString(),
    razorpayOrderId: orderId,
    razorpayPaymentId: paymentId,
    email: user.email,
  };

  await kv.put(`entitlement:${user.uid}`, JSON.stringify(entitlement));
  await kv.delete(`order:${orderId}`);

  return json({ active: true, type: "lifetime" });
}

async function handleApi(request, env, url) {
  if (request.method === "GET" && url.pathname === "/api/health") {
    return json({
      ok: true,
      service: "nextgenroboticx-api",
      paymentMode:
        env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET
          ? "test-configured"
          : "not-configured",
      storage: env.PROJECT_ACCESS ? "configured" : "not-configured",
    });
  }

  if (request.method === "GET" && url.pathname === "/api/project-pass/status") {
    return handleStatus(request, env);
  }

  if (request.method === "POST" && url.pathname === "/api/project-pass/order") {
    return handleOrder(request, env);
  }

  if (request.method === "POST" && url.pathname === "/api/project-pass/verify") {
    return handleVerify(request, env);
  }

  return json({ error: "API endpoint not found." }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (url.pathname.startsWith("/api/")) {
        return await handleApi(request, env, url);
      }

      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error("Request failed", url.pathname, error.message);

      const status =
        error.message.includes("Authentication") ||
        error.message.includes("token")
          ? 401
          : error.message.includes("not configured")
            ? 503
            : 500;

      return json(
        {
          error:
            status === 500
              ? "Unable to complete the request."
              : error.message,
        },
        status
      );
    }
  },
};
