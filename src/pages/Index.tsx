
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ValueProposition from '@/components/ValueProposition';
import ContaminationData from '@/components/ContaminationData';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ValueProposition />
      <ContaminationData />
      <Footer />
    </div>
  );
};

export default Index;
