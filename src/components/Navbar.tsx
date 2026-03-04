import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import type { ArchiveCategory, Continent } from "@/i18n/translations";
import logo from "@/assets/logo.png";

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (id === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

interface ArchiveSubItem {
  labelKey: string;
  category: ArchiveCategory;
  continent?: Continent;
}

const continents: { labelKey: string; continent: Continent }[] = [
  { labelKey: "contEurope", continent: "europe" },
  { labelKey: "contAsia", continent: "asia" },
  { labelKey: "contAfrica", continent: "africa" },
  { labelKey: "contNorthAmerica", continent: "north-america" },
  { labelKey: "contSouthAmerica", continent: "south-america" },
  { labelKey: "contOceania", continent: "oceania" },
];

const archiveCategories: ArchiveSubItem[] = [
  { labelKey: "catAll", category: "all" },
  { labelKey: "catShooting", category: "shooting" },
  { labelKey: "catTravel", category: "travel" },
  { labelKey: "catWeddings", category: "weddings" },
  { labelKey: "catEvents", category: "events" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [travelOpen, setTravelOpen] = useState(false);
  const [mobileArchiveOpen, setMobileArchiveOpen] = useState(false);
  const [mobileTravelOpen, setMobileTravelOpen] = useState(false);
  const archiveRef = useRef<HTMLLIElement>(null);
  const { lang, toggleLang, t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (archiveRef.current && !archiveRef.current.contains(e.target as Node)) {
        setArchiveOpen(false);
        setTravelOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goToArchive = (category: ArchiveCategory, continent?: Continent) => {
    let url = "/archive";
    if (category !== "all") url += `?category=${category}`;
    if (continent) url += `&continent=${continent}`;
    navigate(url);
    setArchiveOpen(false);
    setTravelOpen(false);
    setMenuOpen(false);
    setMobileArchiveOpen(false);
    setMobileTravelOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHome) {
      scrollToSection(e, id);
    } else {
      e.preventDefault();
      navigate(`/#${id}`);
    }
  };

  const simpleLinks = [
    { label: t("navStories"), id: "stories" },
    { label: t("navProcess"), id: "about" },
    { label: t("navContact"), id: "contact" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-500"
        animate={{ height: scrolled ? 64 : 88 }}
      >
        <nav className="container mx-auto flex items-center justify-between h-full px-6 lg:px-12">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}
            className="flex items-center gap-2.5 font-serif text-foreground tracking-widest transition-all duration-500"
            style={{ fontSize: scrolled ? "1.1rem" : "1.25rem" }}>
            <img src={logo} alt="Una Direzione Giusta" className="brightness-0 invert transition-all duration-500" style={{ height: scrolled ? "44px" : "56px" }} />
            <span>UNA DIREZIONE GIUSTA</span>
          </a>

          {/* Desktop/Tablet nav links */}
          <ul className="hidden md:flex items-center gap-8">
            <li ref={archiveRef} className="relative">
              <button
                onClick={() => setArchiveOpen(!archiveOpen)}
                className="font-sans-display text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1"
              >
                {t("navArchive")}
                <ChevronDown size={12} className={`transition-transform duration-200 ${archiveOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {archiveOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-3 bg-background/95 backdrop-blur-md border border-border/50 py-3 px-1 min-w-[160px] shadow-xl"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {archiveCategories.map((cat) => (
                      <div key={cat.category} className="relative">
                        {cat.category === "travel" ? (
                          <div
                            onMouseEnter={() => setTravelOpen(true)}
                            onMouseLeave={() => setTravelOpen(false)}
                          >
                            <button
                              onClick={() => goToArchive("travel")}
                              className="w-full text-left font-sans-display text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary px-4 py-2 transition-colors flex items-center justify-between gap-2"
                            >
                              {t(cat.labelKey as any)}
                              <ChevronRight size={10} />
                            </button>
                            <AnimatePresence>
                              {travelOpen && (
                                <motion.div
                                  className="absolute left-full top-0 ml-1 bg-background/95 backdrop-blur-md border border-border/50 py-3 px-1 min-w-[160px] shadow-xl"
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -8 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  {continents.map((cont) => (
                                    <button
                                      key={cont.continent}
                                      onClick={() => goToArchive("travel", cont.continent)}
                                      className="w-full text-left font-sans-display text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-primary px-4 py-2 transition-colors"
                                    >
                                      {t(cont.labelKey as any)}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <button
                            onClick={() => goToArchive(cat.category)}
                            className="w-full text-left font-sans-display text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary px-4 py-2 transition-colors"
                          >
                            {t(cat.labelKey as any)}
                          </button>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            {simpleLinks.slice(1).map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="font-sans-display text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button onClick={toggleLang}
                className="font-sans-display text-xs tracking-[0.2em] uppercase border border-border text-muted-foreground px-3 py-1.5 hover:text-primary hover:border-primary/30 transition-all duration-300">
                {lang === "it" ? "EN" : "IT"}
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={toggleLang}
              className="font-sans-display text-xs tracking-[0.2em] uppercase border border-border text-muted-foreground px-3 py-1.5 hover:text-primary hover:border-primary/30 transition-all duration-300">
              {lang === "it" ? "EN" : "IT"}
            </button>
            <button className="text-foreground p-2" onClick={() => setMenuOpen(true)} aria-label="Apri menu">
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between px-6 h-20">
              <span className="flex items-center gap-2 font-serif text-foreground tracking-widest text-lg">
                <img src={logo} alt="Una Direzione Giusta" className="brightness-0 invert h-7" />
                UNA DIREZIONE GIUSTA
              </span>
              <button onClick={() => setMenuOpen(false)} className="text-foreground p-2" aria-label="Chiudi menu">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6 overflow-y-auto">
              {/* Archive with accordion */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <button
                  onClick={() => setMobileArchiveOpen(!mobileArchiveOpen)}
                  className="font-serif text-3xl text-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2"
                >
                  {t("navArchive")}
                  <ChevronDown size={20} className={`transition-transform duration-200 ${mobileArchiveOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileArchiveOpen && (
                    <motion.div
                      className="flex flex-col items-center gap-3 mt-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {archiveCategories.map((cat) => (
                        <div key={cat.category} className="flex flex-col items-center">
                          {cat.category === "travel" ? (
                            <>
                              <button
                                onClick={() => setMobileTravelOpen(!mobileTravelOpen)}
                                className="font-sans-display text-lg tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                              >
                                {t(cat.labelKey as any)}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${mobileTravelOpen ? "rotate-180" : ""}`} />
                              </button>
                              <AnimatePresence>
                                {mobileTravelOpen && (
                                  <motion.div
                                    className="flex flex-col items-center gap-2 mt-2"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                  >
                                    <button
                                      onClick={() => goToArchive("travel")}
                                      className="font-sans-display text-sm tracking-[0.1em] uppercase text-primary/60 hover:text-primary transition-colors"
                                    >
                                      {t("catAll")}
                                    </button>
                                    {continents.map((cont) => (
                                      <button
                                        key={cont.continent}
                                        onClick={() => goToArchive("travel", cont.continent)}
                                        className="font-sans-display text-sm tracking-[0.1em] uppercase text-primary/60 hover:text-primary transition-colors"
                                      >
                                        {t(cont.labelKey as any)}
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <button
                              onClick={() => goToArchive(cat.category)}
                              className="font-sans-display text-lg tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors"
                            >
                              {t(cat.labelKey as any)}
                            </button>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Process & Contact */}
              {simpleLinks.slice(1).map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { handleNavClick(e, link.id); setMenuOpen(false); }}
                  className="font-serif text-3xl text-foreground hover:text-primary transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.08 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="flex items-center gap-4 mt-8">
                <button onClick={toggleLang}
                  className="font-sans-display text-sm tracking-[0.2em] uppercase border border-border text-muted-foreground px-4 py-2 hover:text-primary hover:border-primary/30 transition-all duration-300">
                  {lang === "it" ? "EN" : "IT"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
