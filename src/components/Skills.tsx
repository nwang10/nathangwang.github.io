import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Technical Skills
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-secondary)' }}>
            Tools and technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="glass-effect p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
                {category.category}
              </h3>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm">{skill.name}</span>
                      <span className="text-xs" style={{ color: 'var(--color-secondary)' }}>
                        {skill.level}/5
                      </span>
                    </div>

                    {/* Skill level bar */}
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.3 }}>
                      <motion.div
                        className="h-full rounded-full transition-all duration-300 group-hover:shadow-lg"
                        style={{
                          backgroundColor: 'var(--color-accent)',
                          boxShadow: '0 0 10px var(--color-accent)'
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Languages', value: '7+' },
            { label: 'Frameworks', value: '10+' },
            { label: 'Tools', value: '15+' },
            { label: 'Years Coding', value: '5+' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 glass-effect rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-3xl font-bold mb-2 gradient-text">
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: 'var(--color-secondary)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
