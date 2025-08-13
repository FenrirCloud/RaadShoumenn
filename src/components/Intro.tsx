import { useState, useEffect } from 'react';

const bootSequence = [
  'INITIALIZING CRYO-CHAMBER...',
  'VITAL SIGNS: STABLE',
  'SYSTEMS: NOMINAL',
  'AWAKENING SUBJECT: RAAD K. SHOUMENN',
  'BOOT SEQUENCE COMPLETE.',
];

interface IntroProps {
  onAnimationComplete: () => void;
}

const Intro = ({ onAnimationComplete }: IntroProps) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    // Line-by-line animation
    bootSequence.forEach((line, index) => {
      timeouts.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
        }, 700 * (index + 1))
      );
    });

    const totalDuration = 700 * (bootSequence.length + 1);

    // Trigger fade out
    timeouts.push(
      setTimeout(() => {
        setIsFadingOut(true);
      }, totalDuration)
    );

    // Call completion callback after fade out
    timeouts.push(
        setTimeout(() => {
            onAnimationComplete();
        }, totalDuration + 500) // 500ms for fade-out transition
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onAnimationComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-primary-dark transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="font-mono text-accent text-center p-4 text-sm md:text-lg">
        {visibleLines.map((line, index) => (
          <p key={index} className="animate-fade-in">{line}</p>
        ))}
      </div>
    </div>
  );
};

export default Intro;
