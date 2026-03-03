import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";
import { useLang } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden grain">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </motion.div>

      <motion.div className="relative z-10 flex flex-col justify-end h-full pb-16 sm:pb-20 lg:pb-32 px-4 sm:px-6 lg:px-16" style={{ y: textY, opacity }}>
        <motion.p className="font-sans-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary mb-4 sm:mb-6"
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          {t("heroSubtitle")}
        </motion.p>
        <motion.h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-[0.9] text-foreground"
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }}>
          Una Direzione<br /><span className="text-gold-gradient">Giusta</span>
        </motion.h1>
        <motion.p className="font-body text-lg sm:text-xl lg:text-2xl text-muted-foreground mt-6 sm:mt-8 max-w-lg"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
          {t("heroTagline")}
        </motion.p>
      </motion.div>

      <motion.div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <span className="font-sans-display text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{t("heroScroll")}</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
