
import video from "../assets/background_video.mp4";
import { useEffect, useState } from 'react';

const phrases = [
  "Radically Clean",
  "Built for Farmers", 
  "Independently American",
  "Radically Clean",
];

const    HeroSection = () => {
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
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />

      {/* Content */}
      <div className="relative z-10 px-8 sm:px-16 lg:px-24">
        <div className="space-y-1  md:space-y-4">
          {/* Enhanced Typography with staggered animation */}
          <h1 className="text-3xl md:text-6xl lg:text-8xl tracking-tight">
            <span 
              className={`text-muted-foreground transition-all duration-1000 ease-out inline-block ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
            >
              The Future of Farming
            </span>
          </h1>

          {/* Phrase Cycling */}
          <div className="mb-8 whitespace-nowrap overflow-hidden [--line-height:3.25em] md:[--line-height:4.75em] lg:[--line-height:7em] h-[calc(var(--line-height)*1)]">
            <div className={`space-y-4
              ${activeIndex != 0 ? 'transition-transform duration-500 ease-out' : 'translate-y-0'}`}
              style={{ transform: `translateY(calc(-${activeIndex} * var(--line-height)))` }}>
                {phrases.map((phrase, index) => (
                  <p
                    key={index}
                    className="text-3xl md:text-6xl lg:text-8xl text-white tracking-tight"
                  >
                    {phrase}
                  </p>
                ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll down button */}
      <button
        onClick={scrollToTarget}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-primary animate-bounce-centered z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 5l-7 7-7-7" />
        </svg>
      </button>
    </section>
  );
};

export default HeroSection;
