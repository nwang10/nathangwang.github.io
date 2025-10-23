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
            className="mt-16 text-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div
              className="inline-block px-8 py-4 rounded-full text-2xl font-bold shadow-2xl"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                boxShadow: '0 0 40px var(--color-accent)'
              }}
            >
              🎉 Level Up! Journey Complete! 🎉
            </div>
          </motion.div>
        )}

        {/* Confetti effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'][i % 4],
                  left: `${Math.random() * 100}%`,
                  top: '-10px'
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  y: window.innerHeight + 100,
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
