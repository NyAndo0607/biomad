import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import { donnees } from "@/data/biomad";
import type { ArticleBlock } from "@/data/biomad";
import { FooterSection } from "@/components/sections/FooterSection";
import { useSEO } from "@/hooks/useSEO";

function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="font-display text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4"
            >
              {block.text}
            </h2>
          );
        }
        return (
          <p
            key={i}
            className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = donnees.articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-foreground px-4">
        <h1 className="font-display text-4xl font-bold">Article introuvable</h1>
        <p className="text-muted-foreground">Cet article n'existe pas ou a été déplacé.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const others = donnees.articles.filter((a) => a.slug !== slug).slice(0, 2);

  useSEO({
    title: article.titre,
    description: article.extrait,
    image: article.image,
    url: `/blog/${article.slug}`,
    type: "article",
    schema: {
      "@type": "Article",
      "headline": article.titre,
      "description": article.extrait,
      "author": { "@type": "Person", "name": article.author },
      "datePublished": article.date,
      "image": article.image,
      "publisher": {
        "@type": "Organization",
        "name": "BioMad",
        "url": "https://biomad.mg"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://biomad.mg/blog/${article.slug}`
      }
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero image */}
      <div className="relative h-[40vh] sm:h-[55vh] min-h-[280px] sm:min-h-[360px] overflow-hidden">
        <img
          src={article.image}
          alt={article.titre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-foreground/30 to-foreground/10" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 inline-flex items-center gap-2 bg-card/80 backdrop-blur-md text-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-card transition-colors shadow-nature cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
      </div>

      {/* Article */}
      <article className="container max-w-3xl mx-auto px-3 sm:px-4 -mt-12 sm:-mt-20 relative z-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl sm:rounded-3xl shadow-nature border border-border p-5 sm:p-8 md:p-12"
        >
          {/* Catégorie */}
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary/70 mb-4">
            <Tag className="w-3 h-3" />
            {article.cat}
          </span>

          {/* Titre */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {article.titre}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readTime} de lecture
            </span>
          </div>

          {/* Extrait mis en avant */}
          <p className="text-lg text-foreground/80 font-light leading-relaxed border-l-4 border-primary pl-6 mb-10 italic">
            {article.extrait}
          </p>

          {/* Contenu complet */}
          <ArticleContent blocks={article.contenu} />
        </motion.div>

        {/* Articles similaires */}
        {others.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Autres articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((a) => (
                <Link
                  key={a.id}
                  to={`/blog/${a.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border shadow-nature hover:shadow-nature-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                      {a.cat}
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                      {a.titre}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                      {a.extrait}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
                      <span>{a.author}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {a.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </article>

      <FooterSection />
    </div>
  );
}
