import { portfolioData } from '../data/portfolioData';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi'; // Assuming GitHub might be wanted too

const { contact, personalInfo } = portfolioData;

const Contact = () => {
  return (
    <footer id="contact" className="py-16 sm:py-20 border-t border-light-text/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-mono text-white mb-4">
          {contact.cta}
        </h2>
        <p className="text-light-text/70 max-w-xl mx-auto mb-8">
          I'm currently open to new opportunities. Feel free to reach out if you have a project in mind or just want to connect.
        </p>
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-block bg-accent text-primary-dark font-mono py-3 px-8 rounded-sm hover:bg-white hover:text-primary-dark transition-all duration-300 transform hover:scale-105"
        >
          Say Hello
        </a>

        <div className="flex justify-center gap-6 mt-12">
          <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="text-light-text/60 hover:text-accent transition-colors duration-300">
            <FiMail size={28} />
          </a>
          <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-light-text/60 hover:text-accent transition-colors duration-300">
            <FiLinkedin size={28} />
          </a>
          {/* Example for adding more socials */}
          {/* <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-light-text/60 hover:text-accent transition-colors duration-300">
            <FiGithub size={28} />
          </a> */}
        </div>

        <div className="mt-12 pt-8 border-t border-light-text/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-light-text/50">
                <div className="text-center md:text-left">
                    <h3 className="font-mono text-accent mb-2">Languages</h3>
                    <p>{contact.languages.join(' / ')}</p>
                </div>
                <div className="text-center md:text-right">
                    <h3 className="font-mono text-accent mb-2">Interests</h3>
                    <p>{contact.interests.join(' / ')}</p>
                </div>
            </div>
            <p className="text-light-text/30 text-xs mt-8">
              Designed & Built by Jules. Inspired by futuristic UI concepts.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
