/**
 * biomad.ts — Couche de données principale
 *
 * Les données textuelles vivent désormais dans src/data/json/*.json,
 * ce qui permet à n'importe qui de les éditer sans toucher au code TypeScript.
 *
 * Les images sont résolues dynamiquement via import.meta.glob de Vite,
 * ce qui garantit que le hash de cache est correct en production.
 */

// ── JSON data ────────────────────────────────────────────────────────────────
import floreRaw      from "./json/flore.json";
import fauneRaw      from "./json/faune.json";
import parcsRaw      from "./json/parcs.json";
import articlesRaw   from "./json/articles.json";
import quizRaw       from "./json/quiz.json";
import calendrierRaw from "./json/calendrier.json";

// ── Image resolution via Vite glob ──────────────────────────────────────────
const allImages = import.meta.glob<{ default: string }>(
  "../assets/**/*.{jpg,jpeg,png,webp,svg}",
  { eager: true }
);

function resolveImage(relativePath: string): string {
  const key = `../assets/${relativePath}`;
  return allImages[key]?.default ?? "";
}

// ── Types ────────────────────────────────────────────────────────────────────
export interface FloreItem {
  id: number; nom: string; sci: string; cat: string;
  uicn: string; uicnLabel: string; description: string;
  image: string; usages: string[];
}
export interface MenaceeItem {
  id: number; nom: string; sci: string; uicn: string; icon: string;
  image: string; population: number; populationMax: number;
  description: string; menace: string;
}
export interface ParcItem {
  id: number; nom: string; region: string; superficie: string;
  lat: number; lng: number; description: string;
  image: string; especes: string[];
}
export interface GalerieItem { src: string; caption: string; category: string; }
export interface ArticleBlock {
  type: "paragraph" | "heading";
  text: string;
}
export interface ArticleItem {
  id: number; slug: string; titre: string; date: string; extrait: string;
  image: string; cat: string; readTime: string; author: string;
  contenu: ArticleBlock[];
}
export interface CarouselSlide {
  image: string; alt: string; tag: string; title: string; description: string;
}
export interface QuizItem {
  q: string; hint: string; opts: string[]; correct: number; expl: string;
}

// ── UICN helpers ─────────────────────────────────────────────────────────────
export const uicnClass: Record<string, string> = {
  LC: "bg-[#60AB21]", NT: "bg-[#CCE226] text-foreground",
  VU: "bg-[#F9E814] text-foreground", EN: "bg-[#FC7F3F]", CR: "bg-[#D81E05]",
};
export const threatPct: Record<string, number>   = { CR: 95, EN: 75, VU: 55, NT: 35, LC: 15 };
export const threatColor: Record<string, string> = { CR: "#D81E05", EN: "#FC7F3F", VU: "#F9E814", NT: "#CCE226", LC: "#60AB21" };

// ── Faune carousel ────────────────────────────────────────────────────────────
import indriImg           from "@/assets/fauna/indri.jpg";
import cameleonPanthereImg from "@/assets/fauna/cameleon-panthere.jpg";
import fossaImg           from "@/assets/fauna/fossa.jpg";
import tortueRayonneeImg  from "@/assets/fauna/tortue-rayonnee.jpg";

export const fauneSlides: CarouselSlide[] = [
  { image: indriImg,            alt: "Lémurien Indri",    tag: "Primate",   title: "Lémurien Indri",    description: "Le plus grand de tous les lémuriens, connu pour ses chants mélodieux qui résonnent dans la forêt" },
  { image: cameleonPanthereImg, alt: "Caméléon Panthère", tag: "Reptile",   title: "Caméléon Panthère", description: "Un maître du camouflage aux couleurs spectaculaires — 160+ espèces recensées à Madagascar" },
  { image: fossaImg,            alt: "Fossa",             tag: "Carnivore", title: "Fossa",             description: "Le plus grand prédateur de Madagascar, agile chasseur des forêts de l'île" },
  { image: tortueRayonneeImg,   alt: "Tortue Rayonnée",   tag: "Reptile",   title: "Tortue Rayonnée",   description: "Sa carapace aux motifs géométriques en fait l'une des plus belles tortues du monde" },
];

// ── Galerie ───────────────────────────────────────────────────────────────────
export const galerieItems: GalerieItem[] = [
  { src: resolveImage("flora/baobab.jpg"),            caption: "Baobab géant au coucher du soleil",       category: "Flore"   },
  { src: resolveImage("fauna/indri.jpg"),             caption: "Lémurien Indri dans son habitat",         category: "Faune"   },
  { src: resolveImage("parks/tsingy-bemaraha.jpg"),   caption: "Tsingy de Bemaraha, site UNESCO",         category: "Paysage" },
  { src: resolveImage("fauna/cameleon-panthere.jpg"), caption: "Caméléon Panthère coloré",                category: "Faune"   },
  { src: resolveImage("gallery/orchid.jpg"),          caption: "Orchidée endémique en sous-bois",         category: "Flore"   },
  { src: resolveImage("parks/isalo.jpg"),             caption: "Piscine naturelle du parc de l'Isalo",    category: "Paysage" },
  { src: resolveImage("fauna/tortue-rayonnee.jpg"),   caption: "Tortue rayonnée dans la savane",          category: "Faune"   },
  { src: resolveImage("parks/masoala.jpg"),           caption: "Forêt et lagon de Masoala",               category: "Paysage" },
  { src: resolveImage("flora/vanille.jpg"),           caption: "Gousses de vanille malgache",             category: "Flore"   },
  { src: resolveImage("gallery/mouse-lemur.jpg"),     caption: "Microcèbes nocturnes",                    category: "Faune"   },
  { src: resolveImage("gallery/rice-fields.jpg"),     caption: "Rizières en terrasses des Hautes Terres", category: "Paysage" },
  { src: resolveImage("gallery/beach.jpg"),           caption: "Plage tropicale de Nosy Be",              category: "Paysage" },
];

// ── Données principales ───────────────────────────────────────────────────────
export const donnees = {
  flore: (floreRaw as (Omit<FloreItem, "image"> & { image: string })[]).map((item) => ({
    ...item, image: resolveImage(item.image),
  })) as FloreItem[],

  menacees: (fauneRaw as (Omit<MenaceeItem, "image"> & { image: string })[]).map((item) => ({
    ...item, image: resolveImage(item.image),
  })) as MenaceeItem[],

  parcs: (parcsRaw as (Omit<ParcItem, "image"> & { image: string })[]).map((item) => ({
    ...item, image: resolveImage(item.image),
  })) as ParcItem[],

  articles: (articlesRaw as (Omit<ArticleItem, "image"> & { image: string })[]).map((item) => ({
    ...item, image: resolveImage(item.image),
  })) as ArticleItem[],

  galerie: galerieItems,
  quiz: quizRaw as QuizItem[],
  calendrier: calendrierRaw as Record<string, string>,
};
