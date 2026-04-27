/**
 * useNewsletter — hook d'inscription newsletter via Resend
 *
 * Configuration requise :
 *   1. Créer un compte sur https://resend.com (gratuit)
 *   2. Générer une API Key dans Resend > API Keys
 *   3. Ajouter dans votre fichier .env à la racine du projet :
 *        VITE_RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
 *        VITE_NEWSLETTER_TO=votre@email.com
 *
 * Note : Pour la production, il est recommandé de ne PAS exposer la clé API
 * côté client. Utilisez une fonction serverless (Vercel, Netlify Functions,
 * Supabase Edge Functions) pour relayer l'appel Resend en toute sécurité.
 * Ce hook est adapté pour un usage prototypage / MVP.
 */

import { useState } from "react";

type NewsletterStatus = "idle" | "loading" | "success" | "error";

interface UseNewsletterReturn {
  email: string;
  setEmail: (v: string) => void;
  status: NewsletterStatus;
  errorMessage: string | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useNewsletter(): UseNewsletterReturn {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const apiKey = import.meta.env.VITE_RESEND_API_KEY as string | undefined;
    const toEmail = import.meta.env.VITE_NEWSLETTER_TO as string | undefined;

    // — Fallback si la clé n'est pas configurée (mode démo) —
    if (!apiKey || apiKey === "re_votre_cle_ici") {
      await new Promise((r) => setTimeout(r, 800)); // simule latence réseau
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "Biomad <newsletter@biomad.mg>",
          to: [toEmail ?? email],
          reply_to: email,
          subject: "🌿 Bienvenue sur Biomad !",
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:32px">
              <h1 style="color:#16a34a;margin-bottom:8px">Bienvenue sur Biomad 🌿</h1>
              <p style="color:#374151;line-height:1.6">
                Merci de rejoindre notre communauté dédiée à la biodiversité malgache.<br/>
                Vous recevrez bientôt nos conseils de jardinage, les actualités sur la faune
                et flore endémiques, et bien plus encore.
              </p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
              <p style="font-size:12px;color:#9ca3af">
                Vous recevez cet email car vous vous êtes inscrit sur biomad.mg.<br/>
                <a href="#" style="color:#6b7280">Se désabonner</a>
              </p>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? `Erreur ${res.status}`);
      }

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return { email, setEmail, status, errorMessage, handleSubmit };
}
