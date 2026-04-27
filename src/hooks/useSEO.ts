/**
 * useSEO — Hook de gestion dynamique des métadonnées SEO
 *
 * Permet de définir title, description, og:image et données structurées
 * Schema.org pour chaque page sans dépendre d'une lib externe.
 *
 * Usage :
 *   useSEO({
 *     title: "Mon titre",
 *     description: "Ma description",
 *     image: "https://...",
 *     schema: { "@type": "Article", ... }
 *   });
 */

import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  schema?: Record<string, unknown>;
}

const SITE_NAME = "BioMad";
const BASE_URL  = "https://biomad.mg";
const DEFAULT_IMAGE = `${BASE_URL}/og-default.jpg`;

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    // Distinguer property vs name
    if (selector.includes("property=")) {
      el.setAttribute("property", selector.match(/property="([^"]+)"/)?.[1] ?? "");
    } else {
      el.setAttribute("name", selector.match(/name="([^"]+)"/)?.[1] ?? "");
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setOrUpdateJsonLd(schema: Record<string, unknown>) {
  const id = "biomad-jsonld";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify({ "@context": "https://schema.org", ...schema });
}

export function useSEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  schema,
}: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Biodiversité Madagascar`;
    const fullUrl   = url ? `${BASE_URL}${url}` : BASE_URL;

    // ── <title> ──────────────────────────────────────────────────────────────
    document.title = fullTitle;

    // ── <meta name> ──────────────────────────────────────────────────────────
    if (description) {
      setMeta('meta[name="description"]', "content", description);
    }

    // ── Open Graph ───────────────────────────────────────────────────────────
    setMeta('meta[property="og:title"]',       "content", fullTitle);
    setMeta('meta[property="og:type"]',        "content", type);
    setMeta('meta[property="og:url"]',         "content", fullUrl);
    setMeta('meta[property="og:image"]',       "content", image);
    if (description) {
      setMeta('meta[property="og:description"]', "content", description);
    }

    // ── Twitter Card ─────────────────────────────────────────────────────────
    setMeta('meta[name="twitter:title"]',       "content", fullTitle);
    setMeta('meta[name="twitter:image"]',       "content", image);
    if (description) {
      setMeta('meta[name="twitter:description"]', "content", description);
    }

    // ── Canonical ─────────────────────────────────────────────────────────────
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // ── Schema.org JSON-LD ────────────────────────────────────────────────────
    if (schema) {
      setOrUpdateJsonLd(schema);
    }

    // Nettoyage : on remet le titre par défaut en quittant la page
    return () => {
      document.title = `${SITE_NAME} — Biodiversité Madagascar`;
    };
  }, [title, description, image, url, type, schema]);
}
