import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PageLoader from "@/components/PageLoader";

const FeaturedStories = lazy(() => import("@/components/FeaturedStories"));
const ArchiveGallery = lazy(() => import("@/components/ArchiveGallery"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const ContactFooter = lazy(() => import("@/components/ContactFooter"));
const ParallaxDivider = lazy(() => import("@/components/ParallaxDivider"));

const lazyImg = (p: () => Promise<{ default: string }>) =>
  p().then((m) => m.default);

const gallery2 = () => lazyImg(() => import("@/assets/gallery-2.jpg"));
const gallery6 = () => lazyImg(() => import("@/assets/gallery-6.jpg"));
const gallery8 = () => lazyImg(() => import("@/assets/gallery-8.jpg"));

import { useState, useEffect } from "react";
import { useLang } from "@/i18n/LanguageContext";

const LazyParallax = ({
  loader,
  alt,
}: {
  loader: () => Promise<string>;
  alt: string;
}) => {
  const [src, setSrc] = useState<string>();
  useEffect(() => {
    loader().then(setSrc);
  }, []);
  if (!src) return <div className="h-[60vh] bg-background" />;
  return (
    <Suspense fallback={<div className="h-[60vh] bg-background" />}>
      <ParallaxDivider image={src} alt={alt} />
    </Suspense>
  );
};

const Index = () => {
  const { t } = useLang();

  return (
    <main className="bg-background">
    <PageLoader />
    <Navbar />
    <div className="relative z-10 bg-background shadow-[0_20px_40px_-10px_hsl(var(--background))]">
      <HeroSection />
      <Suspense fallback={null}>
        <FeaturedStories />
      </Suspense>
    </div>
    <section id="services-purpose" className="py-28 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-serif text-foreground font-semibold max-w-3xl mx-auto">
          {t("servicesPurpose")}
        </h2>
        <div className="mt-10">
          <a href="#contact" className="inline-block rounded-md bg-primary px-8 py-4 text-base lg:text-lg font-medium text-primary-foreground hover:opacity-90">
            {t("btnRequestConsult")}
          </a>
        </div>
      </div>
    </section>
    <div className="relative z-10 bg-background shadow-[0_-20px_40px_-10px_hsl(var(--background)),0_20px_40px_-10px_hsl(var(--background))]">
      <Suspense fallback={null}>
        <ProcessSection />
      </Suspense>
    </div>
    <LazyParallax loader={gallery6} alt="Portrait transition" />
    <div className="relative z-10 bg-background shadow-[0_-20px_40px_-10px_hsl(var(--background)),0_20px_40px_-10px_hsl(var(--background))]">
      <Suspense fallback={null}>
        <ArchiveGallery />
      </Suspense>
    </div>
    <LazyParallax loader={gallery8} alt="Detail transition" />
    <div className="relative z-10 bg-background shadow-[0_-20px_40px_-10px_hsl(var(--background))]">
      <Suspense fallback={null}>
        <ContactFooter />
      </Suspense>
    </div>
  </main>
);
}

export default Index;
