import { portfolioData } from '../data/portfolioData';

const { experience } = portfolioData;

const Experience = () => {
  return (
    <section id="experience" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-mono text-white text-center mb-12">
          <span className="text-accent">//</span> Work Experience
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-3 sm:left-1/2 top-0 h-full w-0.5 bg-light-text/10" aria-hidden="true"></div>
          {experience.map((job, index) => (
            <div key={index} className="relative mb-10">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-primary-dark border-2 border-accent rounded-full absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2">
                </div>
                <div className={`w-full p-4 sm:p-0 ${index % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12 sm:text-right'}`}>
                  <div className={`sm:w-1/2 ${index % 2 === 0 ? 'sm:float-left' : 'sm:float-right'}`}>
                    <h3 className="text-xl font-mono text-white">{job.role}</h3>
                    <p className="text-lg text-accent/80 mb-1">{job.company}</p>
                    <p className="text-sm text-light-text/50 mb-4">{job.dates}</p>
                    <ul className={`space-y-2 text-light-text/80 ${index % 2 === 0 ? 'text-left' : 'sm:text-right'}`}>
                      {job.description.map((item, i) => (
                        <li key={i} className="flex items-start justify-start sm:justify-end">
                           {index % 2 === 0 ? (
                            <>
                              <span className="text-accent mr-2 mt-1">&gt;</span>
                              <span>{item}</span>
                            </>
                          ) : (
                            <>
                              <span className="text-right">{item}</span>
                              <span className="text-accent ml-2 mt-1">&lt;</span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
