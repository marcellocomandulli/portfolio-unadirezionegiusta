import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/hero.jpg";
import { useLang } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden grain">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroImg} alt="Signature photograph" className="w-full h-[130%] object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </motion.div>

      <motion.div className="relative z-10 flex flex-col justify-end h-full pb-20 lg:pb-32 px-6 lg:px-16" style={{ y: textY, opacity }}>
        <motion.p className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-6"
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          {t("heroSubtitle")}
        </motion.p>
        <motion.h1 className="font-serif text-5xl sm:text-7xl lg:text-9xl font-bold leading-[0.9] text-foreground"
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }}>
          Elara<br /><span className="text-gold-gradient">Voss</span>
        </motion.h1>
        <motion.p className="font-body text-xl lg:text-2xl text-muted-foreground mt-8 max-w-lg"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
          {t("heroTagline")}
        </motion.p>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <span className="font-sans-display text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{t("heroScroll")}</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
