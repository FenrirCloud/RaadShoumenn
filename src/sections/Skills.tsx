import { portfolioData } from '../data/portfolioData';

const { skills } = portfolioData;

const Skills = () => {
  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-mono text-white text-center mb-12">
          <span className="text-accent">//</span> Technical Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillCategory) => (
            <div
              key={skillCategory.category}
              className="border border-light-text/10 bg-primary-dark/30 rounded-lg p-6 transition-transform duration-300 hover:border-accent/50 hover:-translate-y-1"
            >
              <h3 className="text-xl font-mono text-accent mb-4">{skillCategory.category}</h3>
              <ul className="space-y-2 font-sans text-light-text/80">
                {skillCategory.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
