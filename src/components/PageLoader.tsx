import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.img
            src={logo}
            alt="Una Direzione Giusta"
            className="brightness-0 invert h-16 sm:h-20 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          <motion.h1
            className="font-serif text-2xl sm:text-3xl text-foreground tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            UNA DIREZIONE GIUSTA
          </motion.h1>
          <motion.div
            className="mt-8 h-px bg-primary/60"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
          />
          <motion.p
            className="mt-4 font-sans-display text-[10px] tracking-[0.4em] uppercase text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Photography & Storytelling
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
