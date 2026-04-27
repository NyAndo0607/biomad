import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Info, Flower2, Bug, AlertTriangle, Globe, Compass,
  MapPin, Shield, Image, BookOpen, HelpCircle, Newspaper,
  Mail, ChevronLeft, ChevronRight, Menu, X, Sun, Moon,
  Settings, Languages, ChevronDown,
} from "lucide-react";
import { useSidebarState } from "@/contexts/SidebarContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import biomadLogo from "@/assets/biomad-logo.png";

// ── Types ────────────────────────────────────────────────────────────────────
type NavLeaf = {
  kind: "leaf";
  id: string;
  label: string;
  icon: React.ElementType;
};

type NavGroup = {
  kind: "group";
  id: string;
  label: string;
  icon: React.ElementType;
  children: NavLeaf[];
};

type NavItem = NavLeaf | NavGroup;

// ── Navigation structure ──────────────────────────────────────────────────────
const navItems: NavItem[] = [
  { kind: "leaf", id: "accueil", label: "Accueil", icon: Home },
  { kind: "leaf", id: "apropos", label: "À propos", icon: Info },
  {
    kind: "group",
    id: "biodiversite",
    label: "Biodiversité",
    icon: Flower2,
    children: [
      { kind: "leaf", id: "flore", label: "Flore", icon: Flower2 },
      { kind: "leaf", id: "faune", label: "Faune", icon: Bug },
    ],
  },
  {
    kind: "group",
    id: "conservation",
    label: "Conservation",
    icon: Globe,
    children: [
      { kind: "leaf", id: "menacees", label: "Espèces menacées", icon: AlertTriangle },
      { kind: "leaf", id: "plantation", label: "Écotourisme & Reboisement", icon: Compass },
    ],
  },
  {
    kind: "group",
    id: "decouverte",
    label: "Découverte",
    icon: MapPin,
    children: [
      { kind: "leaf", id: "parcs", label: "Parcs nationaux", icon: MapPin },
      { kind: "leaf", id: "reserves", label: "Réserves naturelles", icon: Shield },
      { kind: "leaf", id: "galerie", label: "Galerie", icon: Image },
    ],
  },
  {
    kind: "group",
    id: "apprentissage",
    label: "Apprentissage",
    icon: BookOpen,
    children: [
      { kind: "leaf", id: "madagascar", label: "Tout sur Madagascar", icon: BookOpen },
      { kind: "leaf", id: "quiz", label: "Quiz", icon: HelpCircle },
    ],
  },
  { kind: "leaf", id: "blog", label: "Blog", icon: Newspaper },
  { kind: "leaf", id: "contact", label: "Contact", icon: Mail },
];

// Flat list of all leaf IDs for intersection observer
const allLeafIds = navItems.flatMap((item) =>
  item.kind === "leaf" ? [item.id] : item.children.map((c) => c.id)
);

// ── Constants ─────────────────────────────────────────────────────────────────
const SIDEBAR_EXPANDED = 268;
const SIDEBAR_COLLAPSED = 68;
export { SIDEBAR_EXPANDED, SIDEBAR_COLLAPSED };

// ── Language options ──────────────────────────────────────────────────────────
const languages = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "mg", label: "Malagasy", flag: "🇲🇬" },
  { code: "en", label: "Anglais", flag: "🇬🇧" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function BioSidebar() {
  const { collapsed, toggle } = useSidebarState();
  const { theme, toggle: toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("accueil");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    biodiversite: false,
    conservation: false,
    decouverte: false,
    apprentissage: false,
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("fr");

  // Intersection observer
  useEffect(() => {
    const sections = allLeafIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Auto-open the group containing the active section
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.kind === "group") {
        const isChildActive = item.children.some((c) => c.id === activeSection);
        if (isChildActive) {
          setOpenGroups((prev) => ({ ...prev, [item.id]: true }));
        }
      }
    });
  }, [activeSection]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const toggleGroup = (id: string) => {
    if (collapsed) return;
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ── Leaf button ──────────────────────────────────────────────────────────
  const LeafButton = ({
    item,
    indent = false,
  }: {
    item: NavLeaf;
    indent?: boolean;
  }) => {
    const isActive = activeSection === item.id;
    const button = (
      <button
        onClick={() => scrollTo(item.id)}
        aria-label={item.label}
        aria-current={isActive ? "true" : undefined}
        className={[
          "group w-full flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer relative",
          collapsed ? "justify-center px-2 py-2.5" : indent ? "pl-8 pr-3 py-2" : "px-3 py-2.5",
          isActive
            ? "bg-primary text-primary-foreground font-medium shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        ].join(" ")}
      >
        {indent && !collapsed && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 w-2.5 h-px bg-muted-foreground/30" />
        )}
        <item.icon
          className={`w-[17px] h-[17px] flex-shrink-0 transition-colors ${
            isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
          }`}
        />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-sm overflow-hidden whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      );
    }
    return button;
  };

  // ── Group button ─────────────────────────────────────────────────────────
  const GroupButton = ({ item }: { item: NavGroup }) => {
    const isGroupActive = item.children.some((c) => c.id === activeSection);
    const isOpen = openGroups[item.id];

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              className={[
                "group w-full flex items-center justify-center px-2 py-2.5 rounded-xl transition-all duration-200 cursor-pointer",
                isGroupActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
            >
              <item.icon className="w-[17px] h-[17px] flex-shrink-0" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            <div className="text-xs font-semibold mb-1">{item.label}</div>
            {item.children.map((c) => (
              <button
                key={c.id}
                onClick={() => scrollTo(c.id)}
                className="flex items-center gap-1.5 text-xs py-0.5 hover:text-primary transition-colors w-full text-left"
              >
                <c.icon className="w-3 h-3" /> {c.label}
              </button>
            ))}
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <div>
        <button
          onClick={() => toggleGroup(item.id)}
          aria-expanded={isOpen}
          className={[
            "group w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 cursor-pointer",
            isGroupActive
              ? "text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          ].join(" ")}
        >
          <item.icon className="w-[17px] h-[17px] flex-shrink-0" />
          <span className="text-sm flex-1 text-left whitespace-nowrap overflow-hidden">{item.label}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden pl-1"
            >
              <div className="py-0.5 space-y-0.5">
                {item.children.map((child) => (
                  <LeafButton key={child.id} item={child} indent />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // ── Settings panel ───────────────────────────────────────────────────────
  const SettingsBlock = () => (
    <div className="border-t border-sidebar-border p-2 space-y-0.5">
      {/* Paramètres (always visible when expanded) */}
      {!collapsed && (
        <>
          <button
            onClick={() => setSettingsOpen((p) => !p)}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <Settings className="w-[17px] h-[17px] flex-shrink-0" />
            <span className="flex-1 text-left">Paramètres</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${settingsOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {settingsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pl-1"
              >
                {/* Theme toggle */}
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleTheme}
                      aria-label={theme === "dark" ? "Passer en mode jour" : "Passer en mode nuit"}
                      className="w-full flex items-center gap-3 rounded-xl pl-8 pr-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer relative"
                    >
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 w-2.5 h-px bg-muted-foreground/30" />
                      <span className="relative w-[17px] h-[17px] flex-shrink-0">
                        <span
                          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                          style={{
                            opacity: theme === "dark" ? 1 : 0,
                            transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
                          }}
                        >
                          <Sun className="w-[17px] h-[17px]" />
                        </span>
                        <span
                          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                          style={{
                            opacity: theme === "light" ? 1 : 0,
                            transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
                          }}
                        >
                          <Moon className="w-[17px] h-[17px]" />
                        </span>
                      </span>
                      <span className="flex-1 text-left text-xs">Apparence</span>
                      <span className="text-xs text-muted-foreground">
                        {theme === "dark" ? "🌙" : "☀️"}
                      </span>
                    </button>
                  </TooltipTrigger>
                </Tooltip>

                {/* Langue */}
                <button
                  onClick={() => setLangOpen((p) => !p)}
                  className="w-full flex items-center gap-3 rounded-xl pl-8 pr-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer relative"
                >
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 w-2.5 h-px bg-muted-foreground/30" />
                  <Languages className="w-[15px] h-[15px] flex-shrink-0" />
                  <span className="flex-1 text-left text-xs">Langue</span>
                  <span className="text-xs mr-1">
                    {languages.find((l) => l.code === currentLang)?.flag}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden pl-2"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setLangOpen(false);
                          }}
                          className={[
                            "w-full flex items-center gap-2 rounded-xl pl-10 pr-3 py-1.5 text-xs transition-colors cursor-pointer relative",
                            currentLang === lang.code
                              ? "text-primary font-semibold"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          ].join(" ")}
                        >
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-px bg-muted-foreground/25" />
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                          {currentLang === lang.code && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Collapse toggle – desktop only */}
      <div className="hidden lg:block">
        <button
          onClick={toggle}
          aria-label={collapsed ? "Agrandir le menu" : "Réduire le menu"}
          className={`w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-sm cursor-pointer ${collapsed ? "justify-center" : ""}`}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Réduire
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Theme toggle - collapsed mode only */}
      {collapsed && (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Passer en mode jour" : "Passer en mode nuit"}
              className="w-full flex items-center justify-center px-2 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="relative w-[17px] h-[17px]">
                <span
                  className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                  style={{
                    opacity: theme === "dark" ? 1 : 0,
                    transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
                  }}
                >
                  <Sun className="w-[17px] h-[17px]" />
                </span>
                <span
                  className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                  style={{
                    opacity: theme === "light" ? 1 : 0,
                    transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
                  }}
                >
                  <Moon className="w-[17px] h-[17px]" />
                </span>
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            <p>{theme === "dark" ? "Mode jour" : "Mode nuit"}</p>
          </TooltipContent>
        </Tooltip>
      )}

      {/* Settings button - collapsed mode */}
      {collapsed && (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              onClick={() => setSettingsOpen((p) => !p)}
              aria-label="Paramètres"
              className="w-full flex items-center justify-center px-2 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <Settings className="w-[17px] h-[17px]" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            <p>Paramètres</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );

  // ── Main sidebar content ─────────────────────────────────────────────────
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo – NE PAS TOUCHER */}
      <div className="flex items-center gap-3 px-1.5 py-2 border-b border-sidebar-border">
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
          <img
            src={biomadLogo}
            alt="Logo BioMad"
            className="w-full h-full object-contain drop-shadow-[0_0_6px_hsl(152_70%_48%/0.35)]"
            style={{
              filter:
                theme === "dark"
                  ? "drop-shadow(0 0 5px hsl(152 70% 48% / 0.3))"
                  : "drop-shadow(0 1px 3px hsl(152 65% 28% / 0.25))",
            }}
          />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap flex flex-col leading-tight"
            >
              <span
                className="font-display text-xl font-bold tracking-tight"
                style={{ color: theme === "dark" ? "hsl(152 70% 72%)" : "hsl(152 65% 22%)" }}
              >
                BioMad
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.18em] font-medium"
                style={{ color: theme === "dark" ? "hsl(152 50% 45%)" : "hsl(152 50% 38%)" }}
              >
                Madagascar
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto"
        aria-label="Navigation principale"
      >
        {!collapsed && (
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60 px-3 py-2 mb-1">
            Navigation
          </p>
        )}
        {navItems.map((item) =>
          item.kind === "leaf" ? (
            <LeafButton key={item.id} item={item} />
          ) : (
            <GroupButton key={item.id} item={item} />
          )
        )}
      </nav>

      {/* Settings + Theme + Collapse */}
      <SettingsBlock />
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Ouvrir le menu"
        className="fixed top-3 left-3 z-50 lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-card/90 backdrop-blur-md shadow-nature flex items-center justify-center border border-border cursor-pointer hover:scale-105 transition-transform"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[270px] z-50 lg:hidden border-r border-sidebar-border shadow-xl"
              style={{
                background:
                  theme === "dark"
                    ? "linear-gradient(180deg, hsl(150 30% 7%) 0%, hsl(155 25% 9%) 100%)"
                    : "linear-gradient(180deg, hsl(140 22% 95%) 0%, hsl(144 20% 93%) 100%)",
              }}
              role="navigation"
              aria-label="Menu mobile"
            >
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer le menu"
                className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 border-r border-sidebar-border z-30 overflow-hidden"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(180deg, hsl(150 30% 7%) 0%, hsl(152 28% 8%) 50%, hsl(155 25% 9%) 100%)"
              : "linear-gradient(180deg, hsl(140 22% 95%) 0%, hsl(144 20% 93%) 100%)",
        }}
        role="navigation"
        aria-label="Navigation principale"
      >
        {sidebarContent}
      </motion.aside>

      {/* Settings Popover - shown when collapsed mode and settings clicked */}
      <AnimatePresence>
        {collapsed && settingsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              onClick={() => setSettingsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="fixed left-16 top-16 z-50 w-56 rounded-xl border border-sidebar-border bg-card shadow-xl overflow-hidden"
            >
              <div className="p-2 space-y-0.5">
                <p className="text-xs font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">
                  Paramètres
                </p>
                {/* Theme toggle in popover */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  <span className="relative w-[17px] h-[17px] flex-shrink-0">
                    <span
                      className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                      style={{
                        opacity: theme === "dark" ? 1 : 0,
                        transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
                      }}
                    >
                      <Sun className="w-[17px] h-[17px]" />
                    </span>
                    <span
                      className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                      style={{
                        opacity: theme === "light" ? 1 : 0,
                        transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
                      }}
                    >
                      <Moon className="w-[17px] h-[17px]" />
                    </span>
                  </span>
                  <span className="flex-1 text-left">Apparence</span>
                  <span className="text-xs">{theme === "dark" ? "🌙" : "☀️"}</span>
                </button>

                {/* Language selector in popover */}
                <button
                  onClick={() => setLangOpen((p) => !p)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  <Languages className="w-[17px] h-[17px] flex-shrink-0" />
                  <span className="flex-1 text-left">Langue</span>
                  <span className="text-xs">{languages.find((l) => l.code === currentLang)?.flag}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-2"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setLangOpen(false);
                          }}
                          className={[
                            "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
                            currentLang === lang.code
                              ? "text-primary font-medium bg-primary/10"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          ].join(" ")}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                          {currentLang === lang.code && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapse toggle in popover */}
                <button
                  onClick={toggle}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-[17px] h-[17px] flex-shrink-0" />
                  <span className="flex-1 text-left">Agrandir le menu</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
