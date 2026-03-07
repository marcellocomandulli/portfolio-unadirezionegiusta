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

const Index = () => (
  <main className="bg-background">
    <PageLoader />
    <Navbar />
    <div className="relative z-10 bg-background shadow-[0_20px_40px_-10px_hsl(var(--background))]">
      <HeroSection />
      <FeaturedStories />
    </div>
    <ParallaxDivider image={gallery2} alt="Landscape transition" />
    <div className="relative z-10 bg-background shadow-[0_-20px_40px_-10px_hsl(var(--background)),0_20px_40px_-10px_hsl(var(--background))]">
      <ArchiveGallery />
    </div>
    <ParallaxDivider image={gallery6} alt="Portrait transition" />
    <div className="relative z-10 bg-background shadow-[0_-20px_40px_-10px_hsl(var(--background)),0_20px_40px_-10px_hsl(var(--background))]">
      <ProcessSection />
    </div>
    <ParallaxDivider image={gallery8} alt="Detail transition" />
    <div className="relative z-10 bg-background shadow-[0_-20px_40px_-10px_hsl(var(--background))]">
      <ContactFooter />
    </div>
  </main>
);

export default Index;
