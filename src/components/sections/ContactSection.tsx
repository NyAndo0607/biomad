import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";

const infos = [
  { icon: Mail, label: "Email", valeur: "contact@biomad.mg" },
  { icon: Phone, label: "Téléphone", valeur: "+261 34 18 376 31" },
  { icon: MapPin, label: "Adresse", valeur: "Antananarivo, Madagascar" },
];

export function ContactSection() {
  const [envoye, setEnvoye] = useState(false);
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnvoye(true);
    setTimeout(() => setEnvoye(false), 4000);
    setForm({ nom: "", email: "", sujet: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container px-4 sm:px-6 relative z-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">
            <Mail className="w-4 h-4" />
            Nous écrire
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nous <span className="text-primary">Contacter</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            Une question, un partenariat, une suggestion ? Nous sommes à votre écoute
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Infos de contact */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {infos.map((info) => (
              <div
                key={info.label}
                className="bg-background border border-border rounded-2xl p-5 flex items-center gap-4 shadow-nature hover:shadow-nature-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{info.label}</p>
                  <p className="text-sm font-medium text-foreground">{info.valeur}</p>
                </div>
              </div>
            ))}

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mt-2">
              <p className="text-sm text-foreground font-medium mb-2">🌿 Rejoignez la communauté</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                BioMad rassemble chercheurs, naturalistes, étudiants et citoyens engagés pour la
                conservation de la biodiversité malgache. Votre voix compte.
              </p>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-background border border-border rounded-2xl p-6 sm:p-8 shadow-nature"
          >
            {envoye ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center gap-4"
              >
                <CheckCircle className="w-16 h-16 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">Message envoyé !</h3>
                <p className="text-muted-foreground text-sm">
                  Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5" htmlFor="nom">
                      Nom complet
                    </label>
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      value={form.nom}
                      onChange={handleChange}
                      placeholder="Ny Ando RAMAROZATOVO"
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5" htmlFor="email">
                      Adresse email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="nyando@exemple.com"
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5" htmlFor="sujet">
                    Sujet
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    required
                    value={form.sujet}
                    onChange={handleChange}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  >
                    <option value="">-- Choisir un sujet --</option>
                    <option value="partenariat">Partenariat / Collaboration</option>
                    <option value="information">Demande d'information</option>
                    <option value="signalement">Signalement environnemental</option>
                    <option value="media">Presse / Médias</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Votre message ici..."
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl px-6 py-3 text-sm font-semibold hover:bg-primary/90 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Envoyer le message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
