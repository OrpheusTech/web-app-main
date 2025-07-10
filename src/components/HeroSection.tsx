
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Cpu, Leaf, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const phrases = [
  "Radically Clean",
  "Built for Farmers",
  "Independently American"
];

const HeroSection = () => {
  /* Phrase Cycling State */
  const [activeIndex, setActiveIndex] = useState(0);

  /* Scrolls from homepage landing section to target section */
  const scrollToTarget = () => {
    document.getElementById("scroll-target-section")?.scrollIntoView({ behavior: 'smooth' });
  }

  /* Timer for phrase cycling */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
      >
        <source src="https://res.cloudinary.com/dfsk4hkjz/video/upload/v1752098410/output_koccg5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 z-10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}>
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-foreground">The Future of</span>
            <span className="block text-primary">Farming</span>
          </h1>
          
          {/* Phrase Cycling */}
          <div className="mb-8 space-y-2 whitespace-nowrap">
            {phrases.map((phrase, index) => (
              <p
                key={index}
                className={`transition-all duration-500 ease-in-out text-xl md:text-2xl ${
                  index === activeIndex
                    ? 'font-bold text-foreground tracking-wider'
                    : 'text-muted-foreground'
                }`}
              >
                {phrase}
              </p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="group" onClick={scrollToTarget}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="text-sm">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm">Soil Health</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm">Yield Optimization</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
