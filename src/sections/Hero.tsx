import { portfolioData } from '../data/portfolioData';
import { FiMapPin, FiMail, FiLinkedin } from 'react-icons/fi';

const { name, title, summary, location, email, linkedin } = portfolioData.personalInfo;

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-mono text-4xl md:text-6xl font-bold text-white mb-2">
          {name}
        </h1>
        <h2 className="font-mono text-2xl md:text-3xl text-accent mb-6">
          &gt; {title}
        </h2>
        <p className="max-w-3xl text-light-text/90 mb-8 text-base md:text-lg">
          {summary}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-light-text">
          <div className="flex items-center gap-2">
            <FiMapPin className="text-accent" size={18} />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMail className="text-accent" size={18} />
            <a href={`mailto:${email}`} className="hover:text-accent transition-colors duration-300 border-b border-dotted border-light-text/30 hover:border-accent">
              {email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FiLinkedin className="text-accent" size={18} />
            <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300 border-b border-dotted border-light-text/30 hover:border-accent">
              {linkedin}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
