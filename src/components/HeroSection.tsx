import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";
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
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          webkit-playsinline="true"
          x-webkit-airplay="deny"
          disablePictureInPicture
          ref={(el) => {
            if (el) el.play().catch(() => {});
          }}
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col justify-end h-full pb-32 sm:pb-28 lg:pb-32 px-4 sm:px-6 lg:px-16"
        style={{ y: textY, opacity }}
      >
        <motion.p
          className="font-sans-display text-sm sm:text-base tracking-[0.4em] uppercase text-primary mb-4 sm:mb-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {t("loaderSubtitle")}
        </motion.p>

        <motion.h1
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {t("heroTitlePart1")}{" "}
          <span className="text-gold-gradient">{t("heroTitleEm")}</span>
          <br />
          <span className="">{t("heroTitlePart2")}</span>
        </motion.h1>

        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-block font-sans-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase border-2 border-primary text-primary px-6 sm:px-10 py-3 sm:py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300 mt-6 w-fit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {t("heroCTA")}
        </motion.a>
      </motion.div>

      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="font-sans-display text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          {t("heroScroll")}
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
