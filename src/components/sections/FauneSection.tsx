import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { fauneSlides } from "@/data/biomad";

export function FauneSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % fauneSlides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + fauneSlides.length) % fauneSlides.length), []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <section id="faune" className="py-16 sm:py-20 md:py-28 bg-secondary relative" aria-label="Faune endémique">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">
            <span className="w-8 h-px bg-primary/30" />
            Zoologie
            <span className="w-8 h-px bg-primary/30" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            La Faune <span className="text-primary">Endémique</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-lg mx-auto">
            Des créatures extraordinaires que l'on ne trouve nulle part ailleurs
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-nature-hover" role="region" aria-roledescription="carousel" aria-label="Galerie de la faune">
          <div
            className="flex transition-transform"
            style={{ transform: `translateX(-${current * 100}%)`, transitionDuration: "700ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
          >
            {fauneSlides.map((slide, i) => (
              <div key={slide.alt} className="min-w-full relative" role="group" aria-roledescription="slide" aria-label={`${i + 1} sur ${fauneSlides.length}: ${slide.title}`}>
                <img src={slide.image} alt={slide.alt} className="w-full h-[420px] sm:h-[520px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-primary-foreground">
                  <span className="inline-block bg-green-accent/90 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg mb-3">
                    {slide.tag}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl mb-2">{slide.title}</h3>
                  <p className="text-sm opacity-80 font-light max-w-md leading-relaxed">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={prev} aria-label="Diapositive précédente" className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm text-foreground flex items-center justify-center hover:bg-card hover:scale-110 transition-all shadow-nature cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} aria-label="Diapositive suivante" className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm text-foreground flex items-center justify-center hover:bg-card hover:scale-110 transition-all shadow-nature cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2" role="tablist">
            {fauneSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Aller à la diapositive ${i + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  i === current ? "w-8 h-2.5 bg-primary-foreground" : "w-2.5 h-2.5 bg-primary-foreground/40 hover:bg-primary-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
