import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { useNewsletter } from "@/hooks/useNewsletter";

export function NewsletterSection() {
  const { email, setEmail, status, errorMessage, handleSubmit } = useNewsletter();

  return (
    <section
      className="py-14 sm:py-20 md:py-24 bg-gradient-nature text-primary-foreground relative overflow-hidden"
      aria-label="Newsletter"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_60%)]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-accent/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="container px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-accent/15 border border-green-accent/30 mb-6">
            <Mail className="w-6 h-6 text-green-accent" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Restez connecté avec la nature
          </h2>
          <p className="text-primary-foreground/70 font-light mb-10 max-w-md mx-auto">
            Recevez nos conseils de jardinage, actualités sur la biodiversité et
            exclusivités directement dans votre boîte mail
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-3 py-6"
              >
                <div className="w-16 h-16 rounded-full bg-green-accent/20 border border-green-accent/40 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-accent" />
                </div>
                <p className="font-semibold text-lg">Inscription confirmée !</p>
                <p className="text-primary-foreground/60 text-sm">
                  Vérifiez votre boîte mail — un email de bienvenue vous a été envoyé.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3 mb-6"
                noValidate
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  aria-label="Adresse email"
                  disabled={status === "loading"}
                  className="flex-1 px-6 py-4 rounded-2xl text-sm bg-card text-foreground outline-none shadow-nature focus:ring-2 focus:ring-green-accent transition-shadow placeholder:text-muted-foreground disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || !email}
                  className="bg-green-accent text-primary px-6 py-4 rounded-2xl font-bold text-sm hover:scale-105 hover:shadow-nature-hover transition-all cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      Envoi…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      S'abonner
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Message d'erreur */}
          <AnimatePresence>
            {status === "error" && errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-300 flex items-center justify-center gap-1.5 mb-4"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>

          {status !== "success" && (
            <p className="text-xs text-primary-foreground/50 inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Pas de spam — Désabonnement en un clic
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
