
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ValueProposition from '@/components/ValueProposition';
import ContaminationData from '@/components/ContaminationData';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ValueProposition />
      <ContaminationData />
      <Footer />
    </div>
  );
};

export default Index;
