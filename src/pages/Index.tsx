import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ValueProposition from "@/components/ValueProposition";
import ContaminationData from "@/components/ContaminationData";
import Footer from "@/components/Footer";
import SupplyChain from "@/components/SupplyChain";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ValueProposition />
      <SupplyChain />
      <Footer />
    </div>
  );
};

export default Index;
