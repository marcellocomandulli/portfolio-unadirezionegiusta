import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { usePortfolioPhotos } from "@/hooks/usePortfolioPhotos";
import type { PhotoCategory } from "@/hooks/usePortfolioPhotos";

const FeaturedStories = () => {
  const { t } = useLang();
  const { photos: allPhotos } = usePortfolioPhotos();

  const getFirstPhoto = (cat: PhotoCategory) =>
    allPhotos.find((p) => p.category === cat);

  const services = [
    {
      title: t("serviceWeddingTitle"),
      desc: t("serviceWeddingDesc"),
      category: "matrimonio" as PhotoCategory,
    },
    {
      title: t("serviceShootingTitle"),
      desc: t("serviceShootingDesc"),
      category: "shooting" as PhotoCategory,
    },
    {
      title: t("serviceEventsTitle"),
      desc: t("serviceEventsDesc"),
      category: "evento" as PhotoCategory,
    },
    {
      title: t("serviceTravelTitle"),
      desc: t("serviceTravelDesc"),
      category: "viaggio" as PhotoCategory,
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 overflow-hidden grain">
      <div className="px-4 sm:px-6 lg:px-16 mb-10 sm:mb-16">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-16">
        {services.map((s, i) => {
          const photo = getFirstPhoto(s.category);
          return (
            <motion.div
              key={i}
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                {photo && (
                  <img
                    src={photo.url}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-xl sm:text-2xl text-foreground">{s.title}</h3>
                <p className="text-foreground/90 mt-2 text-base sm:text-lg">{s.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedStories;
