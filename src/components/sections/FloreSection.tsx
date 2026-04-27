import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { donnees, uicnClass } from "@/data/biomad";
import { SpeciesModal } from "@/components/SpeciesModal";
import type { FloreItem } from "@/data/biomad";
import floreBg from "@/assets/section-flore.jpg";

const categories = ["all", "Arbre", "Plante médicinale", "Épice", "Fruit", "Légume"];
const catLabels: Record<string, string> = {
  all: "Tout voir", Arbre: "Arbres", "Plante médicinale": "Médicinales",
  "Épice": "Épices", Fruit: "Fruits", Légume: "Légumes",
};

export function FloreSection() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<FloreItem | null>(null);

  const filtered = donnees.flore.filter((f) => {
    const matchCat = filter === "all" || f.cat === filter;
    const matchSearch = !search || f.nom.toLowerCase().includes(search.toLowerCase()) || f.sci.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="flore" className="py-16 sm:py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative themed image */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-20 w-[420px] h-[420px] rounded-full overflow-hidden opacity-15 blur-[2px] hidden md:block"
      >
        <img src={floreBg} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-20 w-[360px] h-[360px] rounded-full overflow-hidden opacity-10 blur-[3px] hidden md:block"
      >
        <img src={floreBg} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="container px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">
            <span className="w-8 h-px bg-primary/30" />
            Botanique
            <span className="w-8 h-px bg-primary/30" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            La Flore <span className="text-primary">Malgache</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-lg mx-auto">
            Une richesse botanique sans égale dans le monde
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-3.5 shadow-nature">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Chercher une plante…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
            />
            <Filter className="w-4 h-4 text-muted-foreground" />
          </div>

          <div className="flex gap-2 justify-center flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {catLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedItem(item)}
                className="bg-card rounded-2xl overflow-hidden shadow-nature hover:shadow-nature-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer border border-border group"
              >
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.nom}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {item.cat}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-foreground mb-1 group-hover:text-primary transition-colors">{item.nom}</h3>
                  <p className="text-xs italic text-muted-foreground mb-3">{item.sci}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-t border-border text-sm">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold text-primary-foreground ${uicnClass[item.uicn] || "bg-green-light"}`}>
                    {item.uicn}
                  </span>
                  <span className="text-primary font-medium text-xs group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explorer →
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <SpeciesModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}
