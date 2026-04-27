import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/8 rounded-full blur-[120px] animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10 px-6"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-nature flex items-center justify-center mx-auto mb-8 shadow-lg">
          <Leaf className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="font-display text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
        <p className="font-display text-2xl md:text-3xl text-foreground mb-3">Page introuvable</p>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          Cette page semble s'être perdue dans la forêt tropicale malgache. Retournez à l'accueil pour continuer votre exploration.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button variant="hero" size="lg" asChild className="rounded-2xl px-8 py-6">
            <a href="/">
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </a>
          </Button>
          <Button variant="heroOutline" size="lg" onClick={() => window.history.back()} className="rounded-2xl px-8 py-6 border-border text-foreground hover:bg-muted">
            <ArrowLeft className="w-5 h-5" />
            Page précédente
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
