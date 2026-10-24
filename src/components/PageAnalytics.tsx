import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export default function PageAnalytics() {
  const { pathname } = useLocation();
  const viewIdRef = useRef<number | null>(null);
  const startedRef = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;
    startedRef.current = Date.now();
    viewIdRef.current = null;

    fetch("/api/analytics/views", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        title: document.title,
        referrer: document.referrer,
      }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { viewId?: number } | null) => {
        if (!cancelled && data?.viewId) viewIdRef.current = data.viewId;
      })
      .catch(() => {});

    const sendDuration = (useBeacon: boolean) => {
      const viewId = viewIdRef.current;
      if (!viewId) return;
      const body = JSON.stringify({ durationMs: Date.now() - startedRef.current });
      const url = `/api/analytics/views/${viewId}`;
      if (useBeacon && navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
        return;
      }
      fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    };

    const onHide = () => {
      if (document.visibilityState === "hidden") sendDuration(true);
    };
    document.addEventListener("visibilitychange", onHide);
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") sendDuration(false);
    }, 10000);

    return () => {
      cancelled = true;
      sendDuration(true);
      document.removeEventListener("visibilitychange", onHide);
      window.clearInterval(timer);
    };
  }, [pathname]);

  return null;
}
