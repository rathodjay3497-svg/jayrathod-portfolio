import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { SKILL_CATEGORIES } from "../../lib/data";
import GridBackground from "../ui/GridBackground";

const iconMap: Record<string, JSX.Element> = {
  model_training: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
    </svg>
  ),
  database: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm0 14c-3.87 0-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17c0 .5-2.13 2-6 2zm0-4c-3.87 0-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V13c0 .5-2.13 2-6 2z" />
    </svg>
  ),
  code: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
    </svg>
  ),
  cloud_done: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zm-3.5 3.46l-3.5 3.5c-.39.39-1.02.39-1.41 0l-1.5-1.5c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l.79.79 2.79-2.79c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02.01 1.41z" />
    </svg>
  ),
};

export default function Skills() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="skills" className="py-32 bg-surface relative overflow-hidden">
      <GridBackground />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="section-label text-primary">The Toolchain</p>
          <h2 className="section-title">
            Production <span className="text-gradient">Stack</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group p-5 sm:p-6 md:p-8 bg-surface-container-low border-b-2 transition-all duration-300 ${
                cat.accentColor === "primary"
                  ? "border-primary/20 hover:border-primary"
                  : cat.accentColor === "secondary"
                  ? "border-secondary/20 hover:border-secondary"
                  : "border-tertiary/20 hover:border-tertiary"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <span
                  className={`${
                    cat.accentColor === "primary"
                      ? "text-primary"
                      : cat.accentColor === "secondary"
                      ? "text-secondary"
                      : "text-tertiary"
                  }`}
                >
                  {iconMap[cat.icon]}
                </span>
                <h3 className="font-headline font-bold text-lg">{cat.name}</h3>
              </div>
              <ul className="space-y-2.5">
                {cat.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-on-surface-variant font-label text-sm flex items-center gap-2 group-hover:text-on-surface transition-colors"
                  >
                    <span
                      className={`w-1 h-1 rounded-full flex-shrink-0 ${
                        cat.accentColor === "primary"
                          ? "bg-primary/50"
                          : cat.accentColor === "secondary"
                          ? "bg-secondary/50"
                          : "bg-tertiary/50"
                      }`}
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
