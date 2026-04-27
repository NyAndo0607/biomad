import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera } from "lucide-react";
import { donnees } from "@/data/biomad";

const categories = ["Tout", "Flore", "Faune", "Paysage"];

export function GalerieSection() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState("Tout");

  const filtered = useMemo(
    () => (filter === "Tout" ? donnees.galerie : donnees.galerie.filter((g) => g.category === filter)),
    [filter]
  );

  return (
    <section id="galerie" className="py-16 sm:py-20 md:py-28 bg-background relative overflow-hidden" aria-label="Galerie photos">
      {/* Decorative blob */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="container px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">
            <Camera className="w-4 h-4" />
            Photographie
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Galerie <span className="text-primary">Photos</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-lg mx-auto">
            Les plus beaux paysages et espèces de Madagascar
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => {
              const realIdx = donnees.galerie.indexOf(img);
              return (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                  className="break-inside-avoid mb-5 rounded-2xl overflow-hidden cursor-pointer relative group shadow-nature hover:shadow-nature-hover transition-shadow"
                  onClick={() => setLightboxIdx(realIdx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Voir ${img.caption} en plein écran`}
                  onKeyDown={(e) => e.key === "Enter" && setLightboxIdx(realIdx)}
                >
                  <img src={img.src} alt={img.caption} className="w-full block group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-accent mb-1">{img.category}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-foreground text-sm font-medium">{img.caption}</span>
                      <ZoomIn className="w-5 h-5 text-primary-foreground/80 flex-shrink-0 ml-2" aria-hidden="true" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/95 backdrop-blur-md z-[200] flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
            role="dialog"
            aria-label="Lightbox"
          >
            <button onClick={() => setLightboxIdx(null)} aria-label="Fermer" className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + donnees.galerie.length) % donnees.galerie.length); }} aria-label="Photo précédente" className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 cursor-pointer">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={donnees.galerie[lightboxIdx].src}
              alt={donnees.galerie[lightboxIdx].caption}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % donnees.galerie.length); }} aria-label="Photo suivante" className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 cursor-pointer">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground text-sm bg-primary-foreground/10 px-6 py-2.5 rounded-full backdrop-blur-sm max-w-[90vw] text-center flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-accent">{donnees.galerie[lightboxIdx].category}</span>
              <span className="w-1 h-1 rounded-full bg-primary-foreground/30" />
              <span>{donnees.galerie[lightboxIdx].caption}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
