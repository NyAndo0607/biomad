import { useState } from "react";
import { motion } from "framer-motion";
import { donnees } from "@/data/biomad";
import { Sprout, ChevronRight } from "lucide-react";
import plantationBg from "@/assets/section-plantation.jpg";

const steps = [
  { icon: "🌱", title: "Préparation du sol", desc: "Un sol riche et bien drainé est essentiel. Enrichissez-le avec du compost naturel et des matières organiques." },
  { icon: "💧", title: "Arrosage", desc: "Adaptez l'arrosage selon les saisons. Les plantes malgaches résistent souvent très bien à la sécheresse." },
  { icon: "☀️", title: "Exposition", desc: "La plupart des plantes tropicales ont besoin de beaucoup de lumière. Tenez compte des ombres portées." },
  { icon: "🌿", title: "Entretien", desc: "Taille régulière et protection naturelle contre les nuisibles — sans pesticides chimiques." },
];

const moisList = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

export function PlantationSection() {
  const [selectedMois, setSelectedMois] = useState<string | null>(null);

  return (
    <section id="plantation" className="py-16 sm:py-20 md:py-28 bg-secondary relative overflow-hidden" aria-label="Guide de plantation">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      {/* Themed image */}
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full overflow-hidden opacity-20 hidden lg:block"
      >
        <img src={plantationBg} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="container px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">
            <Sprout className="w-4 h-4" aria-hidden="true" />
            Jardinage
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Guide de <span className="text-primary">Plantation</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-lg mx-auto">
            Cultivez les espèces locales avec les bonnes pratiques
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 bg-card rounded-2xl shadow-nature hover:shadow-nature-hover hover:-translate-y-2 transition-all duration-300 border border-border group relative overflow-hidden"
            >
              {/* Step number */}
              <div className="absolute top-3 right-4 text-6xl font-display font-bold text-primary/5 select-none">
                {i + 1}
              </div>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform relative z-10">{step.icon}</div>
              <div className="w-8 h-1 bg-primary/20 rounded-full mx-auto mb-4 group-hover:w-12 group-hover:bg-primary/40 transition-all" />
              <h3 className="font-display text-lg text-foreground mb-3 relative z-10">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-3xl p-6 sm:p-8 md:p-10 shadow-nature border border-border"
        >
          <h3 className="font-display text-2xl text-center text-foreground mb-8">
            Calendrier des <span className="text-primary">Plantations</span>
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-8">
            {moisList.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMois(m)}
                aria-pressed={selectedMois === m}
                className={`text-center py-3 px-1 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                  selectedMois === m
                    ? "bg-primary text-primary-foreground shadow-sm scale-105"
                    : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {m.substring(0, 3)}
              </button>
            ))}
          </div>
          <div className={`rounded-2xl p-6 text-center text-sm border-l-4 min-h-[64px] flex items-center justify-center transition-all ${
            selectedMois ? "bg-primary/5 border-primary text-foreground" : "bg-secondary border-muted-foreground/20 text-muted-foreground"
          }`}>
            {selectedMois ? (
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span>{donnees.calendrier[selectedMois]}</span>
              </div>
            ) : "Cliquez sur un mois pour voir les conseils de plantation"}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
