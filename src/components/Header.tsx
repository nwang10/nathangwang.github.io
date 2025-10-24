import { useState } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onLogoTripleClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoTripleClick }) => {
  const [clickCount, setClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState<number | null>(null);

  const handleLogoClick = () => {
    if (clickTimeout) clearTimeout(clickTimeout);

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      onLogoTripleClick();
      setClickCount(0);
    } else {
      const timeout = setTimeout(() => {
        setClickCount(0);
      }, 500);
      setClickTimeout(timeout);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={handleLogoClick}
          className="text-2xl font-bold gradient-text cursor-pointer hover:scale-110 transition-transform"
          aria-label="Nathan Wang logo - click three times for a surprise"
        >
          NW
        </button>

        <ul className="hidden md:flex space-x-1">
          <li>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-opacity-10 no-underline"
              style={{
                color: 'var(--color-text-muted)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)';
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Projects
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('experience')}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-opacity-10 no-underline"
              style={{
                color: 'var(--color-text-muted)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)';
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Experience
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('skills')}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-opacity-10 no-underline"
              style={{
                color: 'var(--color-text-muted)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)';
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Skills
            </button>
          </li>
          <li>
            <a
              href="/now"
              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-opacity-10 no-underline inline-block"
              style={{
                color: 'var(--color-text-muted)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)';
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Now
            </a>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-opacity-10 no-underline"
              style={{
                color: 'var(--color-text-muted)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)';
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
              mobileMenu.classList.toggle('hidden');
            }
          }}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" className="hidden md:hidden px-4 pb-4">
        <ul className="flex flex-col space-y-4">
          <li>
            <button
              onClick={() => {
                scrollToSection('projects');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="block hover:text-accent transition-colors duration-200"
            >
              Projects
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToSection('experience');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="block hover:text-accent transition-colors duration-200"
            >
              Experience
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToSection('skills');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="block hover:text-accent transition-colors duration-200"
            >
              Skills
            </button>
          </li>
          <li>
            <a
              href="/now"
              className="block hover:text-accent transition-colors duration-200"
            >
              Now
            </a>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToSection('contact');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="block hover:text-accent transition-colors duration-200"
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </motion.header>
  );
};
