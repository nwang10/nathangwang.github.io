import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { timelineData, getTotalXP, getLevel } from '../data/timeline';
import { TimelineNode } from './TimelineNode';

export const Timeline: React.FC = () => {
  const [unlockedNodes, setUnlockedNodes] = useState<Set<string>>(new Set());
  const [totalEarnedXP, setTotalEarnedXP] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalXP = getTotalXP();
  const currentLevel = getLevel(totalEarnedXP);

  const handleUnlock = (nodeId: string, xp: number) => {
    if (!unlockedNodes.has(nodeId)) {
      setUnlockedNodes(prev => new Set(prev).add(nodeId));
      setTotalEarnedXP(prev => prev + xp);
    }
  };

  useEffect(() => {
    // Check if all nodes are unlocked to show "Level Up" confetti
    if (unlockedNodes.size === timelineData.length && unlockedNodes.size > 0) {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  }, [unlockedNodes]);

  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            My Journey
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-secondary)' }}>
            Unlock each milestone to explore my experience
          </p>

          {/* XP Progress */}
          <motion.div
            className="mt-8 max-w-md mx-auto"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">Level {currentLevel}</span>
              <span className="text-sm font-semibold">{totalEarnedXP} / {totalXP} XP</span>
            </div>
            <div className="w-full h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <motion.div
                className="h-full"
                style={{ backgroundColor: 'var(--color-accent)' }}
                initial={{ width: 0 }}
                animate={{ width: `${(totalEarnedXP / totalXP) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12 relative">
          {timelineData.map((node, index) => (
            <TimelineNode
              key={node.id}
              node={node}
              index={index}
              isUnlocked={unlockedNodes.has(node.id)}
              onUnlock={() => handleUnlock(node.id, node.xp)}
            />
          ))}
        </div>

        {/* Level Up Badge */}
        {unlockedNodes.size === timelineData.length && unlockedNodes.size > 0 && (
          <motion.div
            className="mt-16 text-center relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {/* Pulsing glow rings */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ filter: 'blur(30px)' }}
            >
              <motion.div
                className="w-64 h-20 rounded-full"
                style={{ backgroundColor: 'var(--color-accent)' }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0.3, 0.6]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>

            {/* Badge */}
            <motion.div
              className="relative inline-block px-8 py-4 rounded-full text-2xl font-bold shadow-2xl"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                boxShadow: '0 0 60px var(--color-accent)'
              }}
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut'
              }}
            >
              🎉 Level Up! Journey Complete! 🎉
            </motion.div>

            {/* Sparkles around badge */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: '#fbbf24',
                    left: '50%',
                    top: '50%',
                    boxShadow: '0 0 10px #fbbf24'
                  }}
                  animate={{
                    x: [0, x, 0],
                    y: [0, y, 0],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: i * 0.1,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
          </motion.div>
        )}

        {/* Confetti effect - optimized */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => {
              // Pre-calculate values to avoid doing it during render
              const colors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'];
              const color = colors[i % colors.length];
              const size = i % 2 === 0 ? 6 : 8; // Only 2 sizes
              const startX = (i * 3.33) % 100; // Evenly distributed
              const wobble = ((i % 3) - 1) * 100; // Simplified wobble: -100, 0, or 100
              const duration = 2 + (i % 3); // 2, 3, or 4 seconds
              const delay = (i % 5) * 0.1; // 0 to 0.4s delay

              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    backgroundColor: color,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: i % 2 === 0 ? '50%' : '2px', // Circle or square only
                    left: `${startX}%`,
                    top: '-20px',
                    willChange: 'transform, opacity'
                  }}
                  initial={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    y: window.innerHeight + 100,
                    x: wobble,
                    opacity: 0,
                    rotate: (i % 2 === 0 ? 360 : -360) // Simple rotation
                  }}
                  transition={{
                    duration,
                    delay,
                    ease: 'linear'
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
