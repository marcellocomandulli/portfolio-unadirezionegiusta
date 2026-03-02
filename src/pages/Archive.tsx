import { useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import GalleryLightbox from "@/components/GalleryLightbox";
import { useLang } from "@/i18n/LanguageContext";
import type { TranslationKey, ArchiveCategory, Continent } from "@/i18n/translations";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";

interface ArchiveImage {
  src: string;
  titleKey: TranslationKey;
  spanDesktop: string;
  spanMobile: string;
  category: ArchiveCategory;
  continent?: Continent;
}

const allImages: ArchiveImage[] = [
  { src: gallery1, titleKey: "archImg1", spanDesktop: "col-span-2 row-span-2", spanMobile: "col-span-2 row-span-2", category: "travel", continent: "europe" },
  { src: gallery2, titleKey: "archImg2", spanDesktop: "col-span-1 row-span-2", spanMobile: "col-span-1 row-span-1", category: "shooting" },
  { src: gallery3, titleKey: "archImg3", spanDesktop: "col-span-1 row-span-1", spanMobile: "col-span-1 row-span-1", category: "travel", continent: "asia" },
  { src: gallery6, titleKey: "archImg4", spanDesktop: "col-span-1 row-span-1", spanMobile: "col-span-1 row-span-1", category: "events" },
  { src: gallery4, titleKey: "archImg5", spanDesktop: "col-span-1 row-span-2", spanMobile: "col-span-1 row-span-1", category: "weddings" },
  { src: gallery5, titleKey: "archImg6", spanDesktop: "col-span-2 row-span-1", spanMobile: "col-span-2 row-span-1", category: "travel", continent: "europe" },
  { src: gallery7, titleKey: "archImg7", spanDesktop: "col-span-1 row-span-1", spanMobile: "col-span-1 row-span-1", category: "shooting" },
  { src: gallery8, titleKey: "archImg8", spanDesktop: "col-span-2 row-span-1", spanMobile: "col-span-1 row-span-1", category: "travel", continent: "africa" },
  { src: gallery9, titleKey: "archImg9", spanDesktop: "col-span-1 row-span-2", spanMobile: "col-span-1 row-span-1", category: "travel", continent: "europe" },
  { src: gallery10, titleKey: "archImg10", spanDesktop: "col-span-2 row-span-1", spanMobile: "col-span-2 row-span-1", category: "events" },
  { src: gallery11, titleKey: "archImg11", spanDesktop: "col-span-1 row-span-1", spanMobile: "col-span-1 row-span-1", category: "shooting" },
  { src: gallery12, titleKey: "archImg12", spanDesktop: "col-span-2 row-span-2", spanMobile: "col-span-1 row-span-1", category: "travel", continent: "europe" },
  { src: gallery1, titleKey: "archImg1", spanDesktop: "col-span-1 row-span-1", spanMobile: "col-span-1 row-span-1", category: "weddings" },
  { src: gallery3, titleKey: "archImg3", spanDesktop: "col-span-2 row-span-1", spanMobile: "col-span-2 row-span-1", category: "events" },
  { src: gallery5, titleKey: "archImg6", spanDesktop: "col-span-1 row-span-2", spanMobile: "col-span-1 row-span-1", category: "shooting" },
  { src: gallery7, titleKey: "archImg7", spanDesktop: "col-span-1 row-span-1", spanMobile: "col-span-1 row-span-1", category: "travel", continent: "south-america" },
];

const ParallaxImage = ({ image, index, onClick }: { image: ArchiveImage; index: number; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      className={`${image.spanMobile} md:${image.spanDesktop} relative overflow-hidden group cursor-pointer`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      onClick={onClick}
    >
      <motion.div className="w-full h-full" style={{ y, scale }}>
        <img src={image.src} alt={t(image.titleKey)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      </motion.div>
    </motion.div>
  );
};

const Archive = () => {
  const { t } = useLang();
  const [searchParams] = useSearchParams();
  const categoryParam = (searchParams.get("category") || "all") as ArchiveCategory;
  const continentParam = searchParams.get("continent") as Continent | null;

  const filtered = allImages.filter((img) => {
    if (categoryParam !== "all" && img.category !== categoryParam) return false;
    if (categoryParam === "travel" && continentParam && img.continent !== continentParam) return false;
    return true;
  });

  const lightboxImages = filtered.map((img) => ({
    src: img.src,
    alt: t(img.titleKey),
  }));

  const categoryLabel = categoryParam === "all" ? t("catAll")
    : categoryParam === "shooting" ? t("catShooting")
    : categoryParam === "travel" ? (continentParam ? t(`cont${continentParam.charAt(0).toUpperCase() + continentParam.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase())}` as TranslationKey) : t("catTravel"))
    : categoryParam === "weddings" ? t("catWeddings")
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

        <motion.p className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {t("archivePageLabel")}
        </motion.p>
        <motion.h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-foreground mb-2"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {t("archivePageTitle")}
        </motion.h1>
        {categoryParam !== "all" && (
          <motion.p className="font-sans-display text-sm tracking-[0.15em] uppercase text-primary/70 mt-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            — {categoryLabel}
          </motion.p>
        )}
      </div>

      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 grain">
        <GalleryLightbox images={lightboxImages}>
          {(openAtIndex) => (
            <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] sm:auto-rows-[250px] lg:auto-rows-[300px] gap-2 sm:gap-3 lg:gap-4">
              {filtered.map((img, i) => (
                <ParallaxImage key={i} image={img} index={i} onClick={() => openAtIndex(i)} />
              ))}
            </div>
          )}
        </GalleryLightbox>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-body text-lg py-20">
            {categoryParam === "all" ? "Nessuna foto disponibile." : "Nessuna foto in questa categoria."}
          </p>
        )}
      </section>
      <ContactFooter />
    </main>
  );
};

export default Archive;
