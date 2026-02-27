import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedStories from "@/components/FeaturedStories";
import ArchiveGallery from "@/components/ArchiveGallery";
import ProcessSection from "@/components/ProcessSection";
import ContactFooter from "@/components/ContactFooter";
import PageLoader from "@/components/PageLoader";
import ParallaxDivider from "@/components/ParallaxDivider";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import { LanguageProvider } from "@/i18n/LanguageContext";

const Index = () => (
  <LanguageProvider>
    <main className="bg-background">
      <PageLoader />
      <Navbar />
      <HeroSection />
      <FeaturedStories />
      <ParallaxDivider image={gallery2} alt="Landscape transition" />
      <ArchiveGallery />
      <ParallaxDivider image={gallery6} alt="Portrait transition" />
      <ProcessSection />
      <ParallaxDivider image={gallery8} alt="Detail transition" />
      <ContactFooter />
    </main>
  </LanguageProvider>
);

export default Index;
