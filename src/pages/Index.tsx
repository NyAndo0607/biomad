import { BioSidebar } from "@/components/BioSidebar";
import { BackToTop } from "@/components/BackToTop";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AproposSection } from "@/components/sections/AproposSection";
import { FloreSection } from "@/components/sections/FloreSection";
import { MenaceesSection } from "@/components/sections/MenaceesSection";
import { FauneSection } from "@/components/sections/FauneSection";
import { GalerieSection } from "@/components/sections/GalerieSection";
import { ParcsSection } from "@/components/sections/ParcsSection";
import { ReservesSection } from "@/components/sections/ReservesSection";
import { PlantationSection } from "@/components/sections/PlantationSection";
import { MadagascarSection } from "@/components/sections/MadagascarSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { SidebarProvider, useSidebarState } from "@/contexts/SidebarContext";

function MainContent() {
  const { collapsed } = useSidebarState();

  return (
    <div className="min-h-screen">
      {/* Skip to content - accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-6 focus:py-3 focus:rounded-xl focus:shadow-lg"
      >
        Aller au contenu principal
      </a>
      <BioSidebar />
      {/*
        La marge gauche est désormais pilotée par deux classes Tailwind pures
        (ml-sidebar-collapsed / ml-sidebar-expanded) définies dans tailwind.config.ts.
        Plus d'inline style calculé en JS → meilleure cohérence et purge CSS correcte.
        Sur mobile (< lg) le sidebar est en overlay donc aucune marge n'est appliquée.
      */}
      <main
        id="main-content"
        className={[
          "transition-all duration-300 ease-in-out",
          collapsed
            ? "lg:ml-sidebar-collapsed"
            : "lg:ml-sidebar-expanded",
        ].join(" ")}
      >
        <HeroSection />
        <StatsSection />
        <AproposSection />
        <FloreSection />
        <FauneSection />
        <MenaceesSection />
        <PlantationSection />
        <ParcsSection />
        <ReservesSection />
        <GalerieSection />
        <MadagascarSection />
        <QuizSection />
        <BlogSection />
        <ContactSection />
        <NewsletterSection />
        <FooterSection />
      </main>
      <BackToTop />
    </div>
  );
}

const Index = () => {
  return (
    <SidebarProvider>
      <MainContent />
    </SidebarProvider>
  );
};

export default Index;
