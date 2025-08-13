import { portfolioData } from '../data/portfolioData';

const { education, certifications } = portfolioData;

const Education = () => {
  return (
    <section id="education" className="py-16 sm:py-20 bg-primary-dark/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-mono text-white text-center mb-12">
          <span className="text-accent">//</span> Education & Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6">

          {/* Education Column */}
          <div className="md:col-span-2 border border-light-text/10 p-6 rounded-lg">
            <h3 className="text-2xl font-mono text-accent mb-4">Education</h3>
            <div>
              <h4 className="text-xl font-sans font-bold text-white">{education.degree}</h4>
              <p className="text-light-text/80 mt-1">{education.university}</p>
              <p className="text-light-text/50 mt-1">{education.year}</p>
            </div>
          </div>

          {/* Certifications Column */}
          <div className="md:col-span-3 border border-light-text/10 p-6 rounded-lg">
            <h3 className="text-2xl font-mono text-accent mb-4">Certifications</h3>
            <div>
              <ul className="space-y-2">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center text-light-text/80">
                    <span className="text-accent mr-3 text-lg">›</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
