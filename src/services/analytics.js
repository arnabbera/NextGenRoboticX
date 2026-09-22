const ANALYTICS_ENDPOINT = "/api/analytics/event";

function getSessionId() {
  try {
    const key = "nextgenroboticx_analytics_session";
    let sessionId = window.sessionStorage.getItem(key);
    if (!sessionId) {
      sessionId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.sessionStorage.setItem(key, sessionId);
    }
    return sessionId;
  } catch {
    return "";
  }
}

export function trackEvent(event, details = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    sessionId: getSessionId(),
    courseId: details.courseId || "",
    path: window.location.pathname,
    source:
      new URLSearchParams(window.location.search).get("utm_source") ||
      (() => {
        try {
          return document.referrer ? new URL(document.referrer).hostname : "direct";
        } catch {
          return "direct";
        }
      })(),
  };

  fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Analytics must never interrupt learning or checkout.
  });
}
