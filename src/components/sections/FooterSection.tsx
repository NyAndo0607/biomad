import { ArrowRight } from "lucide-react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import biomadLogo from "@/assets/biomad-logo.png";

export function FooterSection() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground pt-12 sm:pt-16 md:pt-20 pb-8" role="contentinfo">
      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
              <div className="w-10 h-10 rounded-xl bg-green-accent/15 flex items-center justify-center p-1.5 flex-shrink-0">
                <img src={biomadLogo} alt="Logo BioMad" className="w-full h-full object-contain" loading="lazy" />
              </div>
              <span className="font-display text-xl font-bold">BioMad</span>
            </div>
            <p className="text-sm text-primary-foreground/40 leading-relaxed mb-4 sm:mb-5 max-w-xs">
              Préservation et valorisation de la biodiversité unique de Madagascar à travers l'éducation et le partage.
            </p>
            <div className="flex gap-3">
              <a 
                key="Facebook" 
                href="https://www.facebook.com/ramarozatovo.nyando" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 flex items-center justify-center transition-colors text-primary-foreground/40 hover:text-[#1877F2]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                key="Twitter" 
                href="https://twitter.com/" 
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 flex items-center justify-center transition-colors text-primary-foreground/40 hover:text-[#1DA1F2]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                key="Instagram" 
                href="https://www.instagram.com/" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 flex items-center justify-center transition-colors text-primary-foreground/40 hover:text-[#E4405F]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-sm sm:text-base mb-4 sm:mb-5 text-primary-foreground/80">Navigation</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm text-primary-foreground/40">
              {["flore", "menacees", "faune", "parcs", "plantation", "quiz", "blog"].map((id) => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)} className="hover:text-green-accent transition-colors cursor-pointer capitalize inline-flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {id === "menacees" ? "Espèces menacées" : id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm sm:text-base mb-4 sm:mb-5 text-primary-foreground/80">Contact</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm text-primary-foreground/40">
              <li className="flex items-start gap-2">📍 <span>Antananarivo, Madagascar</span></li>
              <li><a href="mailto:info@biomad.mg" className="flex items-center gap-2 hover:text-green-accent transition-colors break-all">📧 info@biomad.mg</a></li>
              <li><a href="tel:+261341837631" className="flex items-center gap-2 hover:text-green-accent transition-colors">📞 +261 34 18 376 31</a></li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-display text-sm sm:text-base mb-4 sm:mb-5 text-primary-foreground/80">Horaires</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm text-primary-foreground/40">
              <li>Lun–Ven : 9h – 17h</li>
              <li>Sam : 9h – 12h</li>
              <li>Dim : Fermé</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/8 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/25 text-center">
          <span>© {new Date().getFullYear()} BioMad — Biodiversité Madagascar. Tous droits réservés.</span>
          <span>Conçu avec 💚 pour l'île verte</span>
        </div>
      </div>
    </footer>
  );
}