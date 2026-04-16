import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../../lib/data";

export default function Projects() {
  const { ref, isInView } = useScrollReveal();
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="section-label text-secondary">Selected Deployments</p>
          <h2 className="section-title">
            Innovation <span className="text-gradient">Trace</span>
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-4">
            Production AI systems, MLOps pipelines, and LLM applications - each
            solving real-world problems at scale.
          </p>
        </motion.div>

        {/* Featured projects - larger grid */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i * 0.1} />
            ))}
          </div>
        )}

        {/* Rest of projects */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={(featured.length + i) * 0.08}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
