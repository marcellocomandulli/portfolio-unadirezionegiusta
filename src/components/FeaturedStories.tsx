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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  // aumentare la distanza di scorrimento per rendere l'effetto più rapido
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-80%"]);

  const services = [
    {
      title: t("servicePhoto"),
      desc: t("servicePhotoDesc"),
      img: gallery1,
    },
    {
      title: t("serviceVideo"),
      desc: t("serviceVideoDesc"),
      img: gallery9,
    },
    {
      title: t("serviceDrone"),
      desc: t("serviceDroneDesc"),
      img: gallery11,
    },
  ];

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-16 sm:py-24 lg:py-32 overflow-hidden grain"
    >
      <div className="px-4 sm:px-6 lg:px-16 mb-10 sm:mb-16">
        <motion.p
          className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        ></motion.p>
        <motion.h2
          className="font-serif text-3xl sm:text-4xl lg:text-6xl text-foreground"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t("featuredTitle")}
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-16">
        {services.map((s, i) => (
          <motion.div
            key={i}
            className="relative group overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-xl text-foreground">{s.title}</h3>
              <p className="text-muted-foreground mt-2">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedStories;
