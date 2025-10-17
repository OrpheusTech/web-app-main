import { useEffect, useRef, useState } from 'react';

/* Use on text to give a typing animation */
export const TypingIn = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(entry.target); // 👈 stop observing after first trigger
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const animation = `typing 2000ms steps(30, end) forwards`;

  return (
    <div
      ref={ref}
      className={`typing-text ${
        hasAnimated ? "opacity-100" : "opacity-0"
      }`}
      style={hasAnimated ? { animation, transitionDelay: "250ms" } : {}}
    >
      {children}
    </div>
  );
};



interface FadeInFromDownProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export const FadeInFromDown = ({
  className = "",
  children,
  delay = 0,
}: FadeInFromDownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasFadedIn, setHasFadedIn] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasFadedIn(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease transform ${className} ${
        hasFadedIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};


export const AnimatedLine = ({
  width = "100%",
  height = "2px",
  color = "white",
  delay = 0,
  duration = 1000,
}: {
  width?: string;
  height?: string;
  color?: string;
  delay?: number;
  duration?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width,
        height,
        backgroundColor: `hsl(var(--${color}))`,
        transformOrigin: "left center",
        transform: hasAnimated ? "scaleX(1)" : "scaleX(0)",
        transition: `transform ${duration}ms ease-out ${delay}ms`,
      }}
    />
  );
};