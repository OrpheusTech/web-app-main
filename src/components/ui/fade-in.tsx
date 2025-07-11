import { useEffect, useRef, useState } from 'react';

/* Use on text to give a typing animation */
export const TypingIn = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const animation = `typing 2000ms steps(30, end) forwards`;

  return (
    <div
      ref={ref}
      className={`typing-text ${
        isVisible ? 'opacity-100' : `opacity-0`
      }`}
      style={isVisible ? { animation } : {}}
    >
      {children}
    </div>
  );
};


interface FadeInFromUpStaggerProps {
  children: React.ReactNode;
  delay?: number; // in milliseconds
}

/* Fades in elements from above and can stagger multiple elements at a time to give a cascading effect */
export const FadeInFromUpStagger = ({ children, delay = 0 }: FadeInFromUpStaggerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-in-out delay-250 transform ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-y-20'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* Fades in elements after a small delay when the user scrolls over them */
export const FadeInSubtle = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDelay: '250ms' }}
    >
      {children}
    </div>
  );
};