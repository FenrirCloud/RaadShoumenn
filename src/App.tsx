import { useState, useEffect } from 'react';
import Intro from './components/Intro';
import Header from './components/Header';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Contact from './sections/Contact';
import FadeInSection from './components/FadeInSection';

function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleAnimationComplete = () => {
    setLoading(false);
    // Use a timeout to allow the intro to fade out before showing content
    setTimeout(() => setShowContent(true), 10);
  };

  // This effect ensures that on refresh, the user is at the top of the page.
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <div className="bg-primary-dark">
      {loading && <Intro onAnimationComplete={handleAnimationComplete} />}

      {showContent && (
        <>
          <Header />
          <main className="container mx-auto">
            <Hero />
            <FadeInSection>
              <Skills />
            </FadeInSection>
            <FadeInSection>
              <Experience />
            </FadeInSection>
            <FadeInSection>
              <Education />
            </FadeInSection>
            <FadeInSection>
              <Contact />
            </FadeInSection>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
