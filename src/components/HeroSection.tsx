
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, Leaf, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const phrases = [
  "Radically Clean",
  "Built for Farmers", 
  "Independently American",
  "Radically Clean",
];

const HeroSection = () => {
  /* Phrase Cycling State */
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [reset, setReset] = useState(false);

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

  /* Cycles phrases back to the beginning seamlessly */
  useEffect(() => {
    if (activeIndex == phrases.length - 1) {
      setTimeout(() => {
        setActiveIndex(0);
      }, 1500);
    }
  }, [activeIndex]);

  /* Title animation on mount with delay for phrases */
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Enhanced Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[0.5]"
      >
        <source src="https://res.cloudinary.com/dfsk4hkjz/video/upload/v1752098410/output_koccg5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />

      {/* Content */}
      <div className="relative z-10 px-8 sm:px-16 lg:px-24">
        <div className="space-y-4">
          {/* Enhanced Typography with staggered animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight">
            <span 
              className={`text-muted-foreground transition-all duration-1000 ease-out inline-block ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
            >
              The Future of Farming
            </span>
          </h1>

          {/* Phrase Cycling */}
          <div className="mb-8 whitespace-nowrap overflow-hidden [--line-height:4em] md:[--line-height:5.5em] lg:[--line-height:7em] h-[calc(var(--line-height)*1)]">
            <div className={`space-y-4
              ${activeIndex != 0 ? 'transition-transform duration-500 ease-out' : 'translate-y-0'}`}
              style={{ transform: `translateY(calc(-${activeIndex} * var(--line-height)))` }}>
                {phrases.map((phrase, index) => (
                  <p
                    key={index}
                    className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight"
                  >
                    {phrase}
                  </p>
                ))}
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="flex pt-4">
            <Button 
              size="lg" 
              onClick={scrollToTarget}
              className="group relative px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 
                         transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-2xl 
                         hover:shadow-primary/25 sm:px-12 sm:py-5 sm:text-xl"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="ml-3 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </Button>
          </div>

          {/* Enhanced Feature Pills */}
          <div className="flex flex-wrap gap-4 pt-8">
            <div className="group flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full 
                            border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 
                            hover:scale-105 hover:shadow-lg cursor-pointer">
              <Cpu className="h-5 w-5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm font-medium text-white">AI-Powered</span>
            </div>
            <div className="group flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full 
                            border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 
                            hover:scale-105 hover:shadow-lg cursor-pointer">
              <Leaf className="h-5 w-5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm font-medium text-white">Soil Health</span>
            </div>
            <div className="group flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full 
                            border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 
                            hover:scale-105 hover:shadow-lg cursor-pointer">
              <TrendingUp className="h-5 w-5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm font-medium text-white">Yield Optimization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
