import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import { useLang } from "@/i18n/LanguageContext";

const FeaturedStories = () => {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-55%"]);

  const stories = [
    { img: gallery1, title: t("story1Title"), location: t("story1Location"), year: "2024" },
    { img: gallery3, title: t("story2Title"), location: t("story2Location"), year: "2023" },
    { img: gallery9, title: t("story5Title"), location: t("story5Location"), year: "2024" },
    { img: gallery5, title: t("story3Title"), location: t("story3Location"), year: "2024" },
    { img: gallery10, title: t("story6Title"), location: t("story6Location"), year: "2023" },
    { img: gallery8, title: t("story4Title"), location: t("story4Location"), year: "2023" },
    { img: gallery11, title: t("story7Title"), location: t("story7Location"), year: "2024" },
    { img: gallery12, title: t("story8Title"), location: t("story8Location"), year: "2023" },
  ];

  return (
    <section id="stories" ref={containerRef} className="py-16 sm:py-24 lg:py-32 overflow-hidden grain">
      <div className="px-4 sm:px-6 lg:px-16 mb-10 sm:mb-16">
        <motion.p className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-4"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {t("featuredLabel")}
        </motion.p>
        <motion.h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-foreground"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {t("featuredTitle")}
        </motion.h2>
      </div>

      <motion.div className="flex gap-4 sm:gap-6 lg:gap-8 pl-4 sm:pl-6 lg:pl-16" style={{ x }}>
        {stories.map((story, i) => (
          <motion.div key={i} className="relative flex-shrink-0 group cursor-pointer"
            style={{ width: i % 2 === 0 ? "clamp(240px, 38vw, 660px)" : "clamp(190px, 29vw, 520px)" }}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }}>
            <div className="relative overflow-hidden aspect-[3/2]">
              <img src={story.img} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-500" />
            </div>
            <div className="mt-3 sm:mt-5 flex items-baseline justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-serif text-base sm:text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors duration-300 truncate">{story.title}</h3>
                <p className="font-body text-xs sm:text-sm text-muted-foreground mt-1">{story.location}</p>
              </div>
              <span className="font-sans-display text-[10px] sm:text-xs text-muted-foreground tracking-wider flex-shrink-0">{story.year}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedStories;
