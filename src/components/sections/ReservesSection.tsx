import { motion } from "framer-motion";
import { Shield, MapPin, Trees } from "lucide-react";

const reserves = [
  {
    id: 1,
    nom: "Réserve Naturelle Intégrale de Tsaratanana",
    region: "Nord",
    superficie: "48 622 ha",
    description:
      "Abritant le plus haut sommet de Madagascar (2 876 m), cette réserve préserve des forêts de montagne uniques et des espèces endémiques de haute altitude.",
    especes: ["Lémuriens", "Orchidées", "Grenouilles"],
    couleur: "from-emerald-600 to-green-800",
    emoji: "🏔️",
  },
  {
    id: 2,
    nom: "Réserve Naturelle de Lokobe",
    region: "Nosy Be",
    superficie: "740 ha",
    description:
      "L'une des dernières forêts primaires de Nosy Be, Lokobe est un sanctuaire pour le boa de Madagascar et de nombreuses espèces d'oiseaux endémiques.",
    especes: ["Boa de Madagascar", "Caméléons", "Oiseaux"],
    couleur: "from-teal-600 to-emerald-800",
    emoji: "🐍",
  },
  {
    id: 3,
    nom: "Réserve Spéciale d'Ankarana",
    region: "Nord",
    superficie: "18 225 ha",
    description:
      "Un massif calcaire criblé de grottes et de canyons spectaculaires, refuge de populations de lémuriens et de nombreuses chauves-souris endémiques.",
    especes: ["Lémuriens à collier", "Chauves-souris", "Fossas"],
    couleur: "from-stone-600 to-amber-800",
    emoji: "🦇",
  },
  {
    id: 4,
    nom: "Réserve de Biosphère de Mananara",
    region: "Est",
    superficie: "140 000 ha",
    description:
      "Reconnue par l'UNESCO, cette réserve terrestre et marine protège les forêts humides côtières, les mangroves et les récifs coralliens de la côte est.",
    especes: ["Aye-aye", "Tortues marines", "Coraux"],
    couleur: "from-blue-600 to-cyan-800",
    emoji: "🐢",
  },
  {
    id: 5,
    nom: "Réserve Spéciale de Beza Mahafaly",
    region: "Sud-Ouest",
    superficie: "600 ha",
    description:
      "Un laboratoire vivant pour la recherche sur les lémuriens. La réserve accueille des chercheurs du monde entier et des programmes d'éducation environnementale.",
    especes: ["Lémuriens Sifaka", "Tortues", "Renards volants"],
    couleur: "from-orange-600 to-red-800",
    emoji: "🐒",
  },
  {
    id: 6,
    nom: "Réserve Naturelle de Marotandrano",
    region: "Centre-Nord",
    superficie: "42 200 ha",
    description:
      "Une forêt dense et méconnue qui joue un rôle crucial dans la préservation des bassins versants du nord de Madagascar et abrite des espèces encore peu étudiées.",
    especes: ["Lémuriens", "Grenouilles rares", "Insectes endémiques"],
    couleur: "from-lime-600 to-green-800",
    emoji: "🌿",
  },
];

export function ReservesSection() {
  return (
    <section id="reserves" className="py-16 sm:py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container px-4 sm:px-6 relative z-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">
            <Shield className="w-4 h-4" />
            Aires protégées
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Réserves <span className="text-primary">Naturelles</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            Des sanctuaires de biodiversité qui protègent les espèces les plus rares de Madagascar
          </p>
        </motion.div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reserves.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-nature hover:shadow-nature-hover hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Header coloré */}
              <div className={`bg-gradient-to-br ${r.couleur} p-6 relative`}>
                <span className="text-5xl">{r.emoji}</span>
                <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                  {r.region}
                </span>
              </div>

              {/* Contenu */}
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors leading-tight">
                  {r.nom}
                </h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3" /> {r.superficie}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {r.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {r.especes.map((e) => (
                    <span
                      key={e}
                      className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full flex items-center gap-1"
                    >
                      <Trees className="w-2.5 h-2.5" />
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
