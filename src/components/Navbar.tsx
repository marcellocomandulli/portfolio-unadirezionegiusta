import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (id === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("navStories"), id: "stories" },
    { label: t("navArchive"), id: "archive" },
    { label: t("navProcess"), id: "process" },
    { label: t("navContact"), id: "contact" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-500"
      animate={{ height: scrolled ? 64 : 88 }}
    >
      <nav className="container mx-auto flex items-center justify-between h-full px-6 lg:px-12">
        <a href="#" onClick={(e) => scrollToSection(e, "#")}
          className="font-serif text-foreground tracking-widest transition-all duration-500"
          style={{ fontSize: scrolled ? "1.1rem" : "1.4rem" }}>
          ELARA<span className="text-primary">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="font-sans-display text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="font-sans-display text-xs tracking-[0.2em] uppercase border border-border text-muted-foreground px-3 py-1.5 hover:text-primary hover:border-primary/30 transition-all duration-300"
          >
            {lang === "it" ? "EN" : "IT"}
          </button>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="font-sans-display text-xs tracking-[0.3em] uppercase border border-primary/30 text-primary px-5 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {t("navInquire")}
          </a>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
