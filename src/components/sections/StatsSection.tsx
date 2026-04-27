import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, PawPrint, Flower, Mountain, Bug } from "lucide-react";

const stats = [
  { target: 90,    suffix: "%", label: "Espèces endémiques",  Icon: Leaf },
  { target: 200,   suffix: "+", label: "Espèces de lémuriens", Icon: PawPrint },
  { target: 12000, suffix: "+", label: "Espèces de plantes",  Icon: Flower },
  { target: 50,    suffix: "",  label: "Parcs nationaux",     Icon: Mountain },
  { target: 600,   suffix: "+", label: "Espèces de reptiles", Icon: Bug },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        let cur = 0;
        const inc = target / 60;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.round(cur));
        }, 25);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref} className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-none tabular-nums">{count.toLocaleString("fr")}{suffix}</div>;
}

export function StatsSection() {
  return (
    <section id="stats" className="bg-gradient-nature py-16 sm:py-20 md:py-24 text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-accent/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      <div className="container px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">
            <span className="w-8 h-px bg-primary-foreground/30" />En chiffres<span className="w-8 h-px bg-primary-foreground/30" />
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
            Une biodiversité <span className="text-green-accent">incomparable</span>
          </h2>
        </motion.div>
        {/* Mobile : 2 colonnes + la 5e seule; md : 5 colonnes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`p-4 sm:p-6 md:p-8 rounded-2xl bg-primary-foreground/[0.06] border border-primary-foreground/10 hover:-translate-y-2 hover:bg-primary-foreground/[0.12] hover:border-green-accent/30 transition-all duration-300 text-center backdrop-blur-sm group${i === 4 ? " col-span-2 sm:col-span-1" : ""}`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl bg-green-accent/15 flex items-center justify-center group-hover:bg-green-accent/25 group-hover:scale-110 transition-all">
                <s.Icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-accent" />
              </div>
              <AnimatedNumber target={s.target} suffix={s.suffix} />
              <div className="text-xs sm:text-sm opacity-70 font-medium mt-2 leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
