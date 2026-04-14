import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PageLoader from "@/components/PageLoader";
import { getStorageUrl } from "@/lib/storage";

const FeaturedStories = lazy(() => import("@/components/FeaturedStories"));
const ArchiveGallery = lazy(() => import("@/components/ArchiveGallery"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const ContactFooter = lazy(() => import("@/components/ContactFooter"));
const ParallaxDivider = lazy(() => import("@/components/ParallaxDivider"));

import { useLang } from "@/i18n/LanguageContext";

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
      <section id="services-purpose" className="py-28 grain" style={{ backgroundColor: 'hsl(30 8% 8%)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif text-foreground font-semibold max-w-3xl mx-auto">
            {t("servicesPurpose")}
          </h2>
          <div className="mt-10">
            <a href="#contact" className="inline-block font-sans-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase border-2 border-primary text-primary px-6 sm:px-10 py-3 sm:py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
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
      <Suspense fallback={<div className="h-[60vh] bg-background" />}>
        <ParallaxDivider image={getStorageUrl("divider-1.jpg")} alt="Portrait transition" />
      </Suspense>
      <div className="relative z-10 bg-background shadow-[0_-20px_40px_-10px_hsl(var(--background)),0_20px_40px_-10px_hsl(var(--background))]">
        <Suspense fallback={null}>
          <ArchiveGallery />
        </Suspense>
      </div>
      <Suspense fallback={<div className="h-[60vh] bg-background" />}>
        <ParallaxDivider image={getStorageUrl("divider-2.jpg")} alt="Detail transition" />
      </Suspense>
      <div className="relative z-10 bg-background shadow-[0_-20px_40px_-10px_hsl(var(--background))]">
        <Suspense fallback={null}>
          <ContactFooter />
        </Suspense>
      </div>
    </main>
  );
};

export default Index;
