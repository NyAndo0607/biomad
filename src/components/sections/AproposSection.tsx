import { motion } from "framer-motion";
import { Leaf, Globe, Award, Users } from "lucide-react";

const chiffres = [
  { icon: Globe, valeur: "587 041 km²", label: "Superficie de l'île" },
  { icon: Leaf, valeur: "90%", label: "Espèces endémiques" },
  { icon: Award, valeur: "6", label: "Sites UNESCO" },
  { icon: Users, valeur: "28 M+", label: "Habitants" },
];

const sections = [
  {
    emoji: "🌍",
    titre: "La Grande Île",
    texte:
      "Madagascar, la quatrième plus grande île du monde, s'est séparée du continent africain il y a plus de 165 millions d'années. Cette isolation extrême a engendré une biodiversité sans égale : près de 90 % des espèces animales et végétales qui y vivent ne se trouvent nulle part ailleurs sur Terre.",
  },
  {
    emoji: "🦎",
    titre: "Un trésor vivant",
    texte:
      "L'île abrite plus de 200 000 espèces connues, dont les célèbres lémuriens, les caméléons aux couleurs éblouissantes, et des plantes comme le baobab et les orchidées sauvages. Les scientifiques y découvrent encore régulièrement de nouvelles espèces.",
  },
  {
    emoji: "⚠️",
    titre: "Un écosystème fragile",
    texte:
      "Malgré sa richesse, Madagascar est confrontée à des défis environnementaux majeurs : déforestation, braconnage, changement climatique. Environ 90 % des forêts originelles ont déjà disparu. La conservation est urgente et mobilise des acteurs locaux et internationaux.",
  },
  {
    emoji: "🌱",
    titre: "Notre mission",
    texte:
      "BioMad est une plateforme dédiée à la sensibilisation et à l'éducation sur la biodiversité malgache. Notre objectif est de connecter les citoyens, les chercheurs et les décideurs autour d'une cause commune : protéger et valoriser le patrimoine naturel de Madagascar.",
  },
];

export function AproposSection() {
  return (
    <section id="apropos" className="py-16 sm:py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Blobs décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 sm:px-6 relative z-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">
            <Leaf className="w-4 h-4" />
            Notre histoire
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            À propos de <span className="text-primary">BioMad</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto text-lg">
            Comprendre Madagascar pour mieux la protéger
          </p>
        </motion.div>

        {/* Chiffres clés */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {chiffres.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 text-center shadow-nature hover:shadow-nature-hover hover:-translate-y-1 transition-all duration-300"
            >
              <c.icon className="w-7 h-7 text-primary mx-auto mb-3" />
              <p className="font-display text-2xl font-bold text-foreground mb-1">{c.valeur}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Blocs texte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s, i) => (
            <motion.div
              key={s.titre}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-nature hover:shadow-nature-hover transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl group-hover:scale-110 transition-transform flex-shrink-0">{s.emoji}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {s.titre}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.texte}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
