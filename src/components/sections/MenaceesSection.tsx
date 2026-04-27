import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { donnees, uicnClass, threatPct, threatColor } from "@/data/biomad";
import { ShieldAlert } from "lucide-react";
import menaceesBg from "@/assets/section-menacees.jpg";

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.width = `${pct}%`;
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div className="h-2 rounded-full bg-primary-foreground/10 overflow-hidden">
      <div ref={ref} className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: "0%", backgroundColor: color }} />
    </div>
  );
}

export function MenaceesSection() {
  return (
    <section id="menacees" className="bg-gradient-danger py-16 sm:py-20 md:py-28 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <img src={menaceesBg} alt="" className="w-full h-full object-cover" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/75 to-foreground/95" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(239,68,68,0.08),transparent_50%)]" />
      <div className="container px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-destructive/70 mb-4">
            <ShieldAlert className="w-4 h-4" />Conservation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            Espèces en <span className="text-destructive/80">Danger</span>
          </h2>
          <p className="text-primary-foreground/60 font-light max-w-lg mx-auto text-sm sm:text-base">
            Ces espèces ont besoin de notre aide pour survivre
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {donnees.menacees.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-2xl overflow-hidden hover:bg-primary-foreground/[0.08] transition-all duration-300 group">
              <div className="h-44 sm:h-52 relative overflow-hidden">
                <img src={item.image} alt={item.nom} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-md text-xs font-bold text-primary-foreground ${uicnClass[item.uicn]}`}>{item.uicn}</span>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-xl sm:text-2xl" aria-hidden="true">{item.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base sm:text-lg font-bold text-primary-foreground leading-tight truncate">{item.nom}</h3>
                    <p className="text-xs italic text-primary-foreground/50 truncate">{item.sci}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-primary-foreground/60 mb-3 leading-relaxed line-clamp-2">{item.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-primary-foreground/50">Population estimée</span>
                    <span className="font-bold" style={{ color: threatColor[item.uicn] }}>{item.population.toLocaleString("fr")}</span>
                  </div>
                  <ProgressBar pct={threatPct[item.uicn]} color={threatColor[item.uicn]} />
                  <p className="text-xs text-primary-foreground/40 truncate">⚠ {item.menace}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
