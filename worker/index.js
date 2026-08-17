const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({
        ok: true,
        service: "nextgenroboticx-api",
        paymentMode: env.RAZORPAY_KEY_ID ? "test-configured" : "not-configured",
      });
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "API endpoint not found." }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
