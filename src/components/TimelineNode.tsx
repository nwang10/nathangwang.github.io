import { motion } from 'framer-motion';
import { TimelineNode as TimelineNodeType } from '../data/timeline';
import { useState } from 'react';

interface TimelineNodeProps {
  node: TimelineNodeType;
  index: number;
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({ node, index, isUnlocked, onUnlock }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showXPPopup, setShowXPPopup] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  const nodeColors = {
    work: 'bg-blue-500',
    project: 'bg-purple-500',
    milestone: 'bg-yellow-500'
  };

  const nodeGlowColors = {
    work: 'rgba(59, 130, 246, 0.6)',
    project: 'rgba(168, 85, 247, 0.6)',
    milestone: 'rgba(234, 179, 8, 0.6)'
  };

  const nodeIcons = {
    work: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    project: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    ),
    milestone: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    )
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onViewportEnter={() => {
        if (!isUnlocked) {
          setTimeout(() => {
            onUnlock();
            setJustUnlocked(true);
            setShowXPPopup(true);
            setTimeout(() => setShowXPPopup(false), 3000);
          }, 300);
        }
      }}
    >
      {/* Connection line */}
      <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-accent to-transparent opacity-30" />

      {/* Node circle with glow */}
      <motion.div
        className="relative z-10 flex justify-center mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: isUnlocked ? 1 : 0.5 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <div className="relative">
          {/* Glow effect */}
          {isUnlocked && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: nodeGlowColors[node.type],
                  filter: 'blur(20px)',
                }}
                animate={justUnlocked ? {
                  scale: [1, 1.8, 1.3],
                  opacity: [0, 0.8, 0.4]
                } : {
                  scale: [1.2, 1.4, 1.2],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={justUnlocked ? {
                  duration: 1.5,
                  times: [0, 0.5, 1]
                } : {
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut'
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: nodeGlowColors[node.type],
                  filter: 'blur(10px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                  delay: 0.3
                }}
              />
            </>
          )}

          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`relative w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all ${
              nodeColors[node.type]
            } ${isUnlocked ? 'cursor-pointer hover:scale-110' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!isUnlocked}
            aria-label={`${node.title} at ${node.company}`}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {nodeIcons[node.type]}
            </svg>
          </button>
        </div>

        {/* XP Gained Popup */}
        {showXPPopup && (
          <motion.div
            className="absolute -right-20 top-0 pointer-events-none"
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div
              className="px-4 py-2 rounded-lg shadow-xl font-bold text-sm whitespace-nowrap"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                boxShadow: '0 0 20px var(--color-accent)'
              }}
            >
              +{node.xp} XP
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Card */}
      <motion.div
        className={`max-w-md mx-auto p-6 rounded-xl glass-effect shadow-xl ${
          isUnlocked ? '' : 'opacity-50'
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isUnlocked ? 1 : 0.8, opacity: isUnlocked ? 1 : 0.5 }}
        transition={{ delay: 0.2 }}
      >
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-1">{node.title}</h3>
          <p className="font-semibold" style={{ color: 'var(--color-accent)' }}>
            {node.company}
          </p>
          <div className="flex items-center justify-between mt-2 text-sm" style={{ color: 'var(--color-secondary)' }}>
            <span>{node.dates}</span>
            <span>{node.location}</span>
          </div>
        </div>

        {/* Bullets */}
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4"
          >
            <ul className="space-y-2 text-sm">
              {node.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="mr-2" style={{ color: 'var(--color-accent)' }}>•</span>
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Skills & XP */}
        <div className="flex flex-wrap gap-2 mb-3">
          {node.skills.map((skill, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: isUnlocked ? 1 : 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* XP Badge */}
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isUnlocked ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          <div
            className="px-3 py-1 rounded-full text-sm font-bold"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white'
            }}
          >
            +{node.xp} XP
          </div>
          {isUnlocked && (
            <motion.span
              className="text-sm font-semibold"
              style={{ color: 'var(--color-accent)' }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.6 }}
            >
              Unlocked!
            </motion.span>
          )}
        </motion.div>

        {/* Toggle details button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 text-sm font-semibold transition-colors"
          style={{ color: 'var(--color-accent)' }}
          disabled={!isUnlocked}
        >
          {showDetails ? '▲ Show Less' : '▼ Show More'}
        </button>
      </motion.div>
    </motion.div>
  );
};
