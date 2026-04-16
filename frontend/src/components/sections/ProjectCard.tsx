import { motion } from "framer-motion";
import { useCardTilt } from "../../hooks/useMousePosition";
import type { Project } from "../../types";

const accentClasses = {
  primary: {
    badge: "bg-primary/15 text-primary border border-primary/25",
    glow: "shadow-[0_0_20px_rgba(164,230,255,0.15)]",
  },
  secondary: {
    badge: "bg-secondary/15 text-secondary border border-secondary/25",
    glow: "shadow-[0_0_20px_rgba(209,188,255,0.15)]",
  },
  tertiary: {
    badge: "bg-tertiary/15 text-tertiary border border-tertiary/25",
    glow: "shadow-[0_0_20px_rgba(245,208,255,0.15)]",
  },
};

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = useCardTilt(8);
  const accent = project.accentColor ?? "primary";
  const classes = accentClasses[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? "transform 0.5s ease" : "none",
      }}
      className={`group relative bg-surface-container-low overflow-hidden neon-border-left flex flex-col h-full hover:${classes.glow} transition-all duration-300`}
    >
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${
          accent === "primary"
            ? "from-primary to-secondary"
            : accent === "secondary"
            ? "from-secondary to-tertiary"
            : "from-tertiary to-primary"
        }`}
      />

      <div className="p-8 flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-gradient transition-all mb-2">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`text-xs font-label px-2.5 py-1 ${classes.badge}`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-auto">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-sm font-label font-semibold transition-all ${
                accent === "primary"
                  ? "text-primary hover:text-primary-fixed-dim"
                  : accent === "secondary"
                  ? "text-secondary hover:text-secondary-fixed-dim"
                  : "text-tertiary hover:text-tertiary-fixed-dim"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-label font-semibold text-on-surface-variant hover:text-white transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
              </svg>
              Live
            </a>
          ) : null}
          {!project.githubUrl && !project.liveUrl && (
            <span className="text-xs font-label text-outline italic">
              Private / In Production
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
