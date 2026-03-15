import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import { useLang } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

interface GalleryImage {
  src: string;
  titleKey: TranslationKey;
  spanDesktop: string;
  spanMobile: string;
}

const images: GalleryImage[] = [
  {
    src: gallery1,
    titleKey: "archImg1",
    spanDesktop: "col-span-2 row-span-2",
    spanMobile: "col-span-2 row-span-2",
  },
  {
    src: gallery2,
    titleKey: "archImg2",
    spanDesktop: "col-span-1 row-span-2",
    spanMobile: "col-span-1 row-span-1",
  },
  {
    src: gallery3,
    titleKey: "archImg3",
    spanDesktop: "col-span-1 row-span-1",
    spanMobile: "col-span-1 row-span-1",
  },
  {
    src: gallery6,
    titleKey: "archImg4",
    spanDesktop: "col-span-1 row-span-1",
    spanMobile: "col-span-1 row-span-1",
  },
  {
    src: gallery4,
    titleKey: "archImg5",
    spanDesktop: "col-span-1 row-span-2",
    spanMobile: "col-span-1 row-span-1",
  },
  {
    src: gallery5,
    titleKey: "archImg6",
    spanDesktop: "col-span-2 row-span-1",
    spanMobile: "col-span-2 row-span-1",
  },
  {
    src: gallery7,
    titleKey: "archImg7",
    spanDesktop: "col-span-1 row-span-1",
    spanMobile: "col-span-1 row-span-1",
  },
  {
    src: gallery8,
    titleKey: "archImg8",
    spanDesktop: "col-span-2 row-span-1",
    spanMobile: "col-span-1 row-span-1",
  },
];

const ParallaxImage = ({
  image,
  index,
}: {
  image: GalleryImage;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      className={`${image.spanMobile} md:${image.spanDesktop} relative overflow-hidden group`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
    >
      <motion.div className="w-full h-full" style={{ y, scale }}>
        <img
          src={image.src}
          alt={t(image.titleKey)}
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

  return (
    <section
      id="archive"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-16 grain"
    >
      <div className="mb-10 sm:mb-16">
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
          {t("archiveTitle")}
        </motion.h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] sm:auto-rows-[250px] lg:auto-rows-[300px] gap-2 sm:gap-3 lg:gap-4">
        {images.map((img, i) => (
          <ParallaxImage key={i} image={img} index={i} />
        ))}
      </div>
      <motion.div
        className="mt-10 sm:mt-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to="/archive"
          className="inline-block font-sans-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase border-2 border-primary text-primary px-6 sm:px-10 py-3 sm:py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          {t("archiveViewAll")}
        </Link>
      </motion.div>
    </section>
  );
};

export default ArchiveGallery;
