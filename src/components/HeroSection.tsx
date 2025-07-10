
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, Leaf, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const phrases = [
  "Radically Clean",
  "Built for Farmers", 
  "Independently American"
];

const HeroSection = () => {
  /* Phrase Cycling State */
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  /* Scrolls from homepage landing section to target section */
  const scrollToTarget = () => {
    document.getElementById("scroll-target-section")?.scrollIntoView({ behavior: 'smooth' });
  }

  /* Timer for phrase cycling with smooth transitions */
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, 200);
    }, 3500); // Hold for 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  /* Title animation on mount with delay for phrases */
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
      >
        <source src="https://res.cloudinary.com/dfsk4hkjz/video/upload/v1752098410/output_koccg5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Enhanced Typography with staggered animation */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">
              <span 
                className={`block text-white/90 transition-all duration-1000 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)', 
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                The Future of
              </span>
              <span 
                className={`block text-primary font-semibold transition-all duration-1000 ease-out delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                Farming
              </span>
            </h1>
          </div>
          
          {/* Enhanced Phrase Cycling - Engaging Spring Animations */}
          <div className="flex justify-center mb-4">
            <div className="relative h-24 w-full max-w-4xl flex items-center justify-center">
              {phrases.map((phrase, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out text-2xl md:text-3xl lg:text-4xl font-bold ${
                    index === activeIndex && isVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-6 scale-90'
                  }`}
                  style={{ 
                    color: index === activeIndex ? '#ffffff' : 'transparent',
                    textShadow: index === activeIndex 
                      ? '0 0 30px rgba(34, 197, 94, 0.9), 0 0 60px rgba(34, 197, 94, 0.4), 0 2px 20px rgba(0, 0, 0, 1)' 
                      : 'none',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: '700',
                    letterSpacing: '0.02em',
                    transform: `
                      translateY(${index === activeIndex && isVisible ? '0px' : '24px'}) 
                      scale(${index === activeIndex && isVisible ? '1' : '0.9'})
                    `,
                    filter: index === activeIndex && isVisible ? 'blur(0px)' : 'blur(4px)',
                    animation: index === activeIndex && isVisible 
                      ? 'phraseSpringIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both, phraseGlow 4s ease-in-out infinite 1.5s' 
                      : 'none',
                    transitionDelay: index === activeIndex ? '0.4s' : '0s',
                  }}
                >
                  <span className="relative px-8 py-3">
                    {/* Animated background glow */}
                    {index === activeIndex && isVisible && (
                      <>
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-xl blur-lg"
                          style={{
                            animation: 'glowPulse 3s ease-in-out infinite 0.8s'
                          }}
                        />
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg"
                          style={{
                            animation: 'shimmerSweep 2.5s ease-in-out infinite 1.2s'
                          }}
                        />
                      </>
                    )}
                    
                    {/* Text content with staggered character animation */}
                    <span className="relative z-10 inline-block">
                      {phrase.split('').map((char, charIndex) => (
                        <span
                          key={charIndex}
                          className="inline-block"
                          style={{
                            animation: index === activeIndex && isVisible 
                              ? `charBounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${0.6 + charIndex * 0.05}s both`
                              : 'none'
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </span>
                  </span>
                </div>
              ))}
              
              {/* Dynamic background orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className={`w-96 h-20 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-full blur-2xl transition-all duration-1000 ${
                    phrases[activeIndex] && isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{
                    animation: isVisible ? 'orbFloat 6s ease-in-out infinite 2s' : 'none'
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Enhanced indicator dots with spring animations */}
          <div className="flex justify-center space-x-4 mb-8">
            {phrases.map((_, index) => (
              <button
                key={index}
                className={`relative w-3 h-3 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  index === activeIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-white/40 hover:bg-white/60 hover:scale-110'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to phrase ${index + 1}: ${phrases[index]}`}
                style={{
                  animation: index === activeIndex 
                    ? 'dotSpring 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), dotGlow 2s ease-in-out infinite 0.8s'
                    : 'none'
                }}
              >
                {/* Active dot inner glow */}
                {index === activeIndex && (
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
                )}
              </button>
            ))}
          </div>

          {/* Enhanced CTA Button */}
          <div className="flex justify-center pt-4">
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
          <div className="flex flex-wrap justify-center gap-4 pt-8">
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
