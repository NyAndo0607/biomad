import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Leaf, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroForest from "@/assets/hero-1-forest.jpg";
import heroBaobabs from "@/assets/hero-2-baobabs.jpg";
import heroLemur from "@/assets/hero-3-lemur.jpg";
import heroTsingy from "@/assets/hero-4-tsingy.jpg";

const slides = [
  { image: heroForest,   tag: "Forêts primaires",     title: "La nature malgache", accent: "vous attend",       description: "Plongez au cœur de forêts ancestrales qui abritent des écosystèmes uniques au monde" },
  { image: heroBaobabs,  tag: "Géants millénaires",    title: "L'allée des",        accent: "Baobabs",           description: "Témoins d'un autre temps, ces géants façonnent les paysages emblématiques de l'île verte" },
  { image: heroLemur,    tag: "Faune endémique",       title: "Des espèces",        accent: "extraordinaires",   description: "Lémuriens, caméléons, oiseaux rares — découvrez une faune que l'on ne trouve nulle part ailleurs" },
  { image: heroTsingy,   tag: "Merveilles géologiques",title: "Les Tsingy de",      accent: "Bemaraha",          description: "Une cathédrale de pierre sculptée par le temps, classée au patrimoine mondial de l'UNESCO" },
];

const SLIDE_DURATION = 6000;

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), SLIDE_DURATION);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const slide = slides[current];

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Accueil">
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: SLIDE_DURATION / 1000 + 1.5, ease: "linear" } }}
            className="absolute inset-0"
          >
            <img src={slide.image} alt={slide.tag} className="w-full h-full object-cover" fetchPriority={current === 0 ? "high" : "auto"} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute top-20 left-4 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-40 right-4 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div key={`tag-${current}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-primary-foreground backdrop-blur-md mb-6 sm:mb-8">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            {slide.tag}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.h1 key={`title-${current}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 sm:mb-8 leading-[1.05] tracking-tight">
            {slide.title}<br />
            <span className="text-green-accent">{slide.accent}</span>
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p key={`desc-${current}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-primary-foreground/85 font-light mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            {slide.description}
          </motion.p>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="flex gap-3 sm:gap-4 justify-center flex-wrap px-2">
          <Button variant="hero" size="lg" onClick={() => scrollTo("flore")} className="text-sm sm:text-base px-5 sm:px-8 py-4 sm:py-6 rounded-2xl">
            <Leaf className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            Explorer la flore
          </Button>
          <Button variant="heroOutline" size="lg" onClick={() => scrollTo("quiz")} className="text-sm sm:text-base px-5 sm:px-8 py-4 sm:py-6 rounded-2xl">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            Tester ses connaissances
          </Button>
        </motion.div>

        <div className="mt-10 sm:mt-14 flex items-center justify-center gap-2.5" role="tablist" aria-label="Sélection de diapositive">
          {slides.map((s, i) => (
            <button key={s.tag} onClick={() => setCurrent(i)} role="tab" aria-selected={i === current} aria-label={`Diapositive ${i + 1} : ${s.tag}`}
              className="group relative h-1.5 rounded-full overflow-hidden cursor-pointer transition-all"
              style={{ width: i === current ? 56 : 24 }}>
              <span className="absolute inset-0 bg-primary-foreground/30" />
              {i === current && (
                <motion.span key={`fill-${current}`} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-green-accent" />
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.button onClick={() => scrollTo("stats")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        aria-label="Défiler vers le bas"
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors cursor-pointer flex flex-col items-center gap-2">
        <span className="text-xs font-medium tracking-widest uppercase hidden sm:block">Défiler</span>
        <ArrowDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
