import { useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import GalleryLightbox from "@/components/GalleryLightbox";
import { useLang } from "@/i18n/LanguageContext";
import { usePortfolioPhotos, type PhotoCategory } from "@/hooks/usePortfolioPhotos";
import type { ArchiveCategory } from "@/i18n/translations";

const categoryToPhoto: Record<string, PhotoCategory | undefined> = {
  weddings: "matrimonio",
  shooting: "shooting",
  events: "evento",
};

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
      transition={{ duration: 0.7, delay: index * 0.05 }}
      onClick={onClick}
    >
      <motion.div className="w-full h-full" style={{ y, scale }}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  );
};

const Archive = ({
  routeCategory,
}: {
  routeCategory?: ArchiveCategory;
  routeContinent?: string;
}) => {
  const { t } = useLang();
  const [searchParams] = useSearchParams();
  const categoryParam = (routeCategory ?? (searchParams.get("category") || "all")) as ArchiveCategory;

  const photoCategory = categoryParam === "all" ? undefined : categoryToPhoto[categoryParam];
  const { photos, loading } = usePortfolioPhotos(photoCategory);

  const lightboxImages = photos.map((p) => ({ src: p.url, alt: p.name }));

  const categoryLabel =
    categoryParam === "all"
      ? t("catAll")
      : categoryParam === "shooting"
        ? t("catShooting")
        : categoryParam === "weddings"
          ? t("catWeddings")
          : t("catEvents");

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="pt-24 sm:pt-32 px-4 sm:px-6 lg:px-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-sans-display text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
        >
          <ArrowLeft size={16} />
          {t("archiveBack")}
        </Link>

        <motion.h1
          className="font-serif text-4xl sm:text-5xl lg:text-7xl text-foreground mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("archivePageTitle")}
        </motion.h1>
        {categoryParam !== "all" && (
          <motion.p
            className="font-sans-display text-base sm:text-lg tracking-[0.12em] uppercase text-primary/70 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {categoryLabel}
          </motion.p>
        )}
      </div>

      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 grain">
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <GalleryLightbox images={lightboxImages}>
            {(openAtIndex) => (
              <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] sm:auto-rows-[250px] lg:auto-rows-[300px] gap-2 sm:gap-3 lg:gap-4">
                {photos.map((photo, i) => {
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
        {!loading && photos.length === 0 && (
          <p className="text-center text-muted-foreground font-body text-lg py-20">
            {categoryParam === "all"
              ? "Nessuna foto disponibile."
              : "Nessuna foto in questa categoria."}
          </p>
        )}
      </section>
      <ContactFooter />
    </main>
  );
};

export default Archive;
