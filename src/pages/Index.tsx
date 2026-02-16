import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedStories from "@/components/FeaturedStories";
import ArchiveGallery from "@/components/ArchiveGallery";
import ProcessSection from "@/components/ProcessSection";
import ContactFooter from "@/components/ContactFooter";

const Index = () => (
  <main className="bg-background">
    <Navbar />
    <HeroSection />
    <FeaturedStories />
    <ArchiveGallery />
    <ProcessSection />
    <ContactFooter />
  </main>
);

export default Index;
