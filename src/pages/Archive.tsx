import { useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
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

interface ArchiveImage {
  src: string;
  titleKey: TranslationKey;
  exif: { aperture: string; shutter: string; iso: string };
  spanDesktop: string;
  spanMobile: string;
  category: ArchiveCategory;
  continent?: Continent;
}

const allImages: ArchiveImage[] = [
  { src: gallery1, titleKey: "archImg1", exif: { aperture: "f/2.8", shutter: "1/250s", iso: "ISO 400" }, spanDesktop: "col-span-2 row-span-2", spanMobile: "col-span-2 row-span-2", category: "travel", continent: "europe" },
  { src: gallery2, titleKey: "archImg2", exif: { aperture: "f/8", shutter: "1/125s", iso: "ISO 200" }, spanDesktop: "col-span-1 row-span-2", spanMobile: "col-span-1 row-span-1", category: "shooting" },
  { src: gallery3, titleKey: "archImg3", exif: { aperture: "f/1.4", shutter: "1/60s", iso: "ISO 1600" }, spanDesktop: "col-span-1 row-span-1", spanMobile: "col-span-1 row-span-1", category: "travel", continent: "asia" },
  { src: gallery6, titleKey: "archImg4", exif: { aperture: "f/4", shutter: "1/30s", iso: "ISO 800" }, spanDesktop: "col-span-1 row-span-1", spanMobile: "col-span-1 row-span-1", category: "events" },
  { src: gallery4, titleKey: "archImg5", exif: { aperture: "f/2", shutter: "1/500s", iso: "ISO 100" }, spanDesktop: "col-span-1 row-span-2", spanMobile: "col-span-1 row-span-1", category: "weddings" },
  { src: gallery5, titleKey: "archImg6", exif: { aperture: "f/11", shutter: "1/1000s", iso: "ISO 200" }, spanDesktop: "col-span-2 row-span-1", spanMobile: "col-span-2 row-span-1", category: "travel", continent: "europe" },
  { src: gallery7, titleKey: "archImg7", exif: { aperture: "f/2.8", shutter: "1/125s", iso: "ISO 640" }, spanDesktop: "col-span-1 row-span-1", spanMobile: "col-span-1 row-span-1", category: "shooting" },
  { src: gallery8, titleKey: "archImg8", exif: { aperture: "f/8", shutter: "1/500s", iso: "ISO 100" }, spanDesktop: "col-span-2 row-span-1", spanMobile: "col-span-1 row-span-1", category: "travel", continent: "africa" },
  // Duplicate images as additional examples
  { src: gallery1, titleKey: "archImg1", exif: { aperture: "f/2.8", shutter: "1/250s", iso: "ISO 400" }, spanDesktop: "col-span-1 row-span-1", spanMobile: "col-span-1 row-span-1", category: "weddings" },
  { src: gallery3, titleKey: "archImg3", exif: { aperture: "f/1.4", shutter: "1/60s", iso: "ISO 1600" }, spanDesktop: "col-span-2 row-span-1", spanMobile: "col-span-2 row-span-1", category: "events" },
  { src: gallery5, titleKey: "archImg6", exif: { aperture: "f/11", shutter: "1/1000s", iso: "ISO 200" }, spanDesktop: "col-span-1 row-span-2", spanMobile: "col-span-1 row-span-1", category: "shooting" },
  { src: gallery7, titleKey: "archImg7", exif: { aperture: "f/2.8", shutter: "1/125s", iso: "ISO 640" }, spanDesktop: "col-span-1 row-span-1", spanMobile: "col-span-1 row-span-1", category: "travel", continent: "south-america" },
];

const ParallaxImage = ({ image, index }: { image: ArchiveImage; index: number }) => {
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
    >
      <motion.div className="w-full h-full" style={{ y, scale }}>
        <img src={image.src} alt={t(image.titleKey)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3 sm:p-5">
        <h4 className="font-serif text-sm sm:text-lg text-foreground mb-1 sm:mb-2">{t(image.titleKey)}</h4>
        <div className="flex gap-2 sm:gap-4 font-sans-display text-[10px] sm:text-xs text-primary tracking-wider">
          <span>{image.exif.aperture}</span>
          <span>{image.exif.shutter}</span>
          <span>{image.exif.iso}</span>
        </div>
      </div>
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

  const categoryLabel = categoryParam === "all" ? t("catAll")
    : categoryParam === "shooting" ? t("catShooting")
    : categoryParam === "travel" ? (continentParam ? t(`cont${continentParam.charAt(0).toUpperCase() + continentParam.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase())}` as TranslationKey) : t("catTravel"))
    : categoryParam === "weddings" ? t("catWeddings")
    : t("catEvents");

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      {/* Header area with back button */}
      <div className="pt-24 sm:pt-32 px-4 sm:px-6 lg:px-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-sans-display text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
        >
          <ArrowLeft size={16} />
          {t("archiveBack")}
        </Link>

        <motion.p
          className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t("archivePageLabel")}
        </motion.p>
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
            className="font-sans-display text-sm tracking-[0.15em] uppercase text-primary/70 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            — {categoryLabel}
          </motion.p>
        )}
      </div>

      {/* Gallery grid */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 grain">
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] sm:auto-rows-[250px] lg:auto-rows-[300px] gap-2 sm:gap-3 lg:gap-4">
          {filtered.map((img, i) => (
            <ParallaxImage key={i} image={img} index={i} />
          ))}
        </div>
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
