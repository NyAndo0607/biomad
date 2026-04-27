import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";

const chapitres = [
  {
    id: "histoire",
    emoji: "📜",
    titre: "Histoire & Peuplement",
    contenu: [
      {
        sous: "Les premiers habitants",
        texte:
          "Madagascar aurait été peuplée il y a environ 2 000 ans par des navigateurs austronésiens venus d'Indonésie, puis par des populations bantous africaines. Ce métissage unique a donné naissance aux 18 ethnies malagasy, partageant une langue commune : le malgache.",
      },
      {
        sous: "L'ère des royaumes",
        texte:
          "Entre les XIIᵉ et XIXᵉ siècles, plusieurs royaumes se succèdent : le Merina, le Sakalava, le Betsimisaraka. Le roi Andrianampoinimerina unifie l'île au début du XIXᵉ siècle. Sa fille Ranavalona III est la dernière souveraine, déposée en 1897 lors de la colonisation française.",
      },
      {
        sous: "L'indépendance",
        texte:
          "Madagascar accède à l'indépendance le 26 juin 1960. Depuis, le pays a traversé plusieurs crises politiques tout en préservant sa richesse culturelle. La fête nationale est célébrée chaque année avec fierté.",
      },
    ],
  },
  {
    id: "culture",
    emoji: "🎭",
    titre: "Culture & Traditions",
    contenu: [
      {
        sous: "Le Fady",
        texte:
          "Le fady est un système de tabous culturels et religieux propre à Madagascar. Chaque région, chaque clan possède ses propres fady — interdiction de manger certains aliments, de travailler certains jours, ou de visiter certains lieux sacrés.",
      },
      {
        sous: "Le Famadihana",
        texte:
          "Le retournement des morts est l'une des pratiques les plus connues de Madagascar. Tous les sept ans environ, les familles déterrent les corps de leurs ancêtres, les enveloppent dans de nouveaux linceuls et célèbrent leur mémoire dans une atmosphère festive, avec musique et danse.",
      },
      {
        sous: "Musique et artisanat",
        texte:
          "La musique malgache, riche et variée, mêle influences africaines, asiatiques et malgaches. Le valiha (cithare en bambou) est l'instrument national. L'artisanat local est réputé : broderie, raphia, sculpture sur bois et poterie.",
      },
    ],
  },
  {
    id: "geographie",
    emoji: "🗺️",
    titre: "Géographie & Climat",
    contenu: [
      {
        sous: "Une île aux cinq visages",
        texte:
          "Madagascar présente cinq zones climatiques distinctes : les hauts plateaux centraux au climat tempéré, la côte est tropicale et humide, le nord tropical, le sud aride et semi-désertique, et l'ouest à savane sèche. Cette diversité engendre une extraordinaire variété d'écosystèmes.",
      },
      {
        sous: "Les saisons",
        texte:
          "L'île connaît deux grandes saisons : l'été austral (novembre-avril), chaud et pluvieux, propice aux cyclones sur la côte est ; et l'hiver (mai-octobre), plus sec et doux, idéal pour voyager. La saison des pluies est cruciale pour l'agriculture et la régénération des forêts.",
      },
      {
        sous: "Reliefs et fleuves",
        texte:
          "Le cœur de l'île est traversé par une dorsale montagneuse culminant à 2 876 m (Tsaratanana). Les fleuves descendent vers les côtes, alimentant de larges plaines alluviales propices à la riziculture, base de l'alimentation malgache.",
      },
    ],
  },
  {
    id: "economie",
    emoji: "🌾",
    titre: "Économie & Ressources",
    contenu: [
      {
        sous: "Agriculture et pêche",
        texte:
          "Le riz est la base de l'alimentation et de la culture malgache — « tsy misy vary, tsy misy fiainana » signifie « sans riz, pas de vie ». Madagascar est aussi le premier producteur mondial de vanille, et exporte des litchis, des crevettes et du café.",
      },
      {
        sous: "Ressources naturelles",
        texte:
          "Le sous-sol malgache regorge de ressources minières : saphirs, émeraudes, graphite, nickel, cobalt. Cependant, l'extraction minière représente une menace pour les écosystèmes locaux et fait l'objet de vifs débats entre développement et conservation.",
      },
      {
        sous: "Tourisme",
        texte:
          "L'écotourisme est un secteur en pleine croissance. Les parcs nationaux, les plages et la culture attirent chaque année des milliers de visiteurs du monde entier. Ce secteur représente une opportunité économique majeure tout en sensibilisant à la conservation.",
      },
    ],
  },
];

export function MadagascarSection() {
  const [ouvert, setOuvert] = useState<string | null>("histoire");

  return (
    <section id="madagascar" className="py-16 sm:py-20 md:py-28 bg-secondary relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container px-4 sm:px-6 relative z-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">
            <BookOpen className="w-4 h-4" />
            Encyclopédie
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tout sur <span className="text-primary">Madagascar</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            Histoire, culture, géographie et économie de la Grande Île
          </p>
        </motion.div>

        {/* Accordéons */}
        <div className="max-w-3xl mx-auto space-y-3">
          {chapitres.map((ch, i) => (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-nature"
            >
              {/* En-tête accordéon */}
              <button
                onClick={() => setOuvert(ouvert === ch.id ? null : ch.id)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left group cursor-pointer"
                aria-expanded={ouvert === ch.id}
              >
                <span className="text-2xl flex-shrink-0">{ch.emoji}</span>
                <span className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                  {ch.titre}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${ouvert === ch.id ? "rotate-180" : ""}`}
                />
              </button>

              {/* Contenu accordéon */}
              <AnimatePresence>
                {ouvert === ch.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-5 border-t border-border pt-5">
                      {ch.contenu.map((bloc) => (
                        <div key={bloc.sous}>
                          <h4 className="font-semibold text-sm text-primary mb-1.5">{bloc.sous}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{bloc.texte}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
