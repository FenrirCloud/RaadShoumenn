import React from 'react';
import { useInView } from 'react-intersection-observer';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInSection = ({ children, className = '' }: FadeInSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px', // Start animation a little sooner
  });

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
