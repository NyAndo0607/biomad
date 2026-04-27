import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { uicnClass, type FloreItem } from "@/data/biomad";

interface Props {
  item: FloreItem | null;
  onClose: () => void;
}

export function SpeciesModal({ item, onClose }: Props) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="bg-card max-w-lg w-full rounded-2xl overflow-hidden max-h-[88vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img src={item.image} alt={item.nom} className="w-full h-64 object-cover" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-foreground/50 text-primary-foreground flex items-center justify-center hover:bg-foreground/70 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6">
            <h2 className="font-display text-2xl text-primary mb-1">{item.nom}</h2>
            <p className="text-sm italic text-muted-foreground mb-4">{item.sci}</p>
            <p className="text-muted-foreground leading-relaxed mb-5">{item.description}</p>
            <div className="bg-secondary rounded-xl p-5 space-y-2 text-sm">
              <p><strong className="text-primary">Catégorie :</strong> {item.cat}</p>
              <p><strong className="text-primary">Utilisations :</strong> {item.usages.join(" · ")}</p>
              <div className="pt-3 border-t border-border mt-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Statut de conservation</p>
                <span className={`px-3 py-1 rounded text-xs font-bold text-primary-foreground ${uicnClass[item.uicn] || "bg-green-light"}`}>
                  {item.uicn} — {item.uicnLabel}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
