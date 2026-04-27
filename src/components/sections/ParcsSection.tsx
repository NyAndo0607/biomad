import { motion } from "framer-motion";
import { donnees } from "@/data/biomad";
import { MapPin } from "lucide-react";
import parcsBg from "@/assets/section-parcs.jpg";

export function ParcsSection() {
  return (
    <section id="parcs" className="py-16 sm:py-20 md:py-28 bg-card relative overflow-hidden">
      {/* Themed banner top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-48 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${parcsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <div className="container px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">
            <MapPin className="w-4 h-4" />
            Aires protégées
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Parcs <span className="text-primary">Nationaux</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-lg mx-auto">
            Des parcs nationaux qui protègent les derniers joyaux naturels de l'île
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {donnees.parcs.map((parc, i) => (
            <motion.div
              key={parc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-nature hover:shadow-nature-hover hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-border group"
            >
              <div className="h-52 relative overflow-hidden">
                <img
                  src={parc.image}
                  alt={parc.nom}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {parc.region}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{parc.nom}</h3>
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {parc.superficie}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{parc.description}</p>
              </div>
              <div className="px-5 py-3 border-t border-border">
                <div className="flex flex-wrap gap-1.5">
                  {parc.especes.map((e) => (
                    <span key={e} className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
