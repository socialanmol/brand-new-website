import { useEffect } from "react";
import { useLocation } from "react-router";
import { pageMeta, structuredData } from "../seo/metadata";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function DocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = pageMeta(pathname);
    document.title = meta.title;
    upsertMeta("name", "description", meta.description);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", meta.canonical);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", meta.canonical);

    let script = document.getElementById("site-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "site-jsonld";
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData(pathname));
  }, [pathname]);

  return null;
}
