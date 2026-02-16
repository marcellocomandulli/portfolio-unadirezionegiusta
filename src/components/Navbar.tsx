import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Stories", "Archive", "Process", "Contact"];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-500"
      animate={{ height: scrolled ? 64 : 88 }}
    >
      <nav className="container mx-auto flex items-center justify-between h-full px-6 lg:px-12">
        <a href="#" className="font-serif text-foreground tracking-widest transition-all duration-500"
          style={{ fontSize: scrolled ? "1.1rem" : "1.4rem" }}>
          ELARA<span className="text-primary">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="font-sans-display text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden md:block font-sans-display text-xs tracking-[0.3em] uppercase border border-primary/30 text-primary px-5 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          Inquire
        </a>
      </nav>
    </motion.header>
  );
};

export default Navbar;
