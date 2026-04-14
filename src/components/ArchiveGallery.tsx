import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { usePortfolioPhotos } from "@/hooks/usePortfolioPhotos";
import GalleryLightbox from "@/components/GalleryLightbox";

const spanPatterns = [
  { desktop: "col-span-2 row-span-2", mobile: "col-span-2 row-span-2" },
  { desktop: "col-span-1 row-span-2", mobile: "col-span-1 row-span-1" },
  { desktop: "col-span-1 row-span-1", mobile: "col-span-1 row-span-1" },
  { desktop: "col-span-1 row-span-1", mobile: "col-span-1 row-span-1" },
  { desktop: "col-span-1 row-span-2", mobile: "col-span-1 row-span-1" },
  { desktop: "col-span-2 row-span-1", mobile: "col-span-2 row-span-1" },
  { desktop: "col-span-1 row-span-1", mobile: "col-span-1 row-span-1" },
  { desktop: "col-span-2 row-span-1", mobile: "col-span-1 row-span-1" },
];

const ParallaxImage = ({
  src,
  alt,
  spanMobile,
  spanDesktop,
  index,
  onClick,
}: {
  src: string;
  alt: string;
  spanMobile: string;
  spanDesktop: string;
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      className={`${spanMobile} md:${spanDesktop} relative overflow-hidden group cursor-pointer`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      onClick={onClick}
    >
      <motion.div className="w-full h-full" style={{ y, scale }}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
    </motion.div>
  );
};

const ArchiveGallery = () => {
  const { t } = useLang();
  const { photos, loading } = usePortfolioPhotos();

  // Show up to 8 photos on home
  const displayPhotos = photos.slice(0, 8);
  const lightboxImages = displayPhotos.map((p) => ({ src: p.url, alt: p.name }));

  return (
    <section id="archive" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-16 grain">
      <div className="mb-10 sm:mb-16 flex items-center justify-between">
        <div>
          <motion.h2
            className="font-serif text-3xl sm:text-4xl lg:text-6xl text-foreground"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t("archiveTitle")}
          </motion.h2>
        </div>
        <div className="ml-4">
          <Link
            to="/archive"
            className="hidden md:inline-flex text-sm lg:text-base font-medium text-primary items-center gap-2 group relative"
          >
            <span className="relative">
              {t("btnViewGallery")}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="h-[300px] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : displayPhotos.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">Nessuna foto disponibile.</p>
      ) : (
        <GalleryLightbox images={lightboxImages}>
          {(openAtIndex) => (
            <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] sm:auto-rows-[250px] lg:auto-rows-[300px] gap-2 sm:gap-3 lg:gap-4">
              {displayPhotos.map((photo, i) => {
                const pattern = spanPatterns[i % spanPatterns.length];
                return (
                  <ParallaxImage
                    key={photo.name}
                    src={photo.url}
                    alt={photo.name}
                    spanMobile={pattern.mobile}
                    spanDesktop={pattern.desktop}
                    index={i}
                    onClick={() => openAtIndex(i)}
                  />
                );
              })}
            </div>
          )}
        </GalleryLightbox>
      )}

      <motion.div
        className="mt-10 sm:mt-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to="/archive"
          className="inline-flex items-center justify-center gap-2 font-sans-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase border-2 border-primary text-primary px-6 sm:px-10 py-3 sm:py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-none"
        >
          {t("archiveViewAll")}
        </Link>
      </motion.div>
    </section>
  );
};

export default ArchiveGallery;
