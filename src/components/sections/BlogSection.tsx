import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { donnees } from "@/data/biomad";
import { BookOpen, ArrowRight, Clock, User } from "lucide-react";

export function BlogSection() {
  return (
    <section id="blog" className="py-16 sm:py-20 md:py-28 bg-background relative">
      <div className="container px-4 sm:px-6">
        {/* En-tête centré — comme les autres sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-3">
            <BookOpen className="w-4 h-4" />
            Blog
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
            Actualités & <span className="text-primary">Conseils</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-lg mx-auto text-sm sm:text-base">
            Les dernières nouvelles de la biodiversité malgache
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {donnees.articles.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${a.slug}`}
                className="bg-card rounded-2xl overflow-hidden shadow-nature hover:shadow-nature-hover hover:-translate-y-1.5 transition-all duration-300 border border-border group flex flex-col h-full"
                aria-label={`Lire l'article : ${a.titre}`}
              >
                <div className="h-44 sm:h-52 overflow-hidden relative">
                  <img
                    src={a.image}
                    alt={a.titre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-3 left-3 text-xs bg-card/90 backdrop-blur-sm text-primary font-semibold px-3 py-1.5 rounded-full">
                    {a.cat}
                  </span>
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <span>{a.date}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {a.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl text-foreground mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {a.titre}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5 line-clamp-3 flex-1">
                    {a.extrait}
                  </p>
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                      <User className="w-3 h-3" /> {a.author}
                    </span>
                    <span className="text-primary font-semibold text-xs inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Lire la suite <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
