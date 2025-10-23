import { useState } from 'react';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Timeline } from '../components/Timeline';
import { Skills } from '../components/Skills';
import { Experience } from '../components/Experience';
import { ChatOrb } from '../components/ChatOrb';
import { ChatPanel } from '../components/ChatPanel';

export const Home: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Hero />
      <Projects />
      <Timeline />
      <Skills />
      <Experience />

      {/* AI Chat Interface */}
      <ChatOrb onClick={() => setIsChatOpen(true)} isOpen={isChatOpen} />
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};
