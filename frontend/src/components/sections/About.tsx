import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { PERSONAL, EDUCATION, CERTIFICATIONS } from "../../lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  const { ref: leftRef, isInView: leftVisible } = useScrollReveal();
  const { ref: rightRef, isInView: rightVisible } = useScrollReveal();

  return (
    <section id="about" className="py-32 bg-surface-container-low relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left - bio */}
          <motion.div
            ref={leftRef}
            variants={fadeUp}
            initial="hidden"
            animate={leftVisible ? "show" : "hidden"}
          >
            <p className="section-label text-tertiary-fixed-dim">The Architect</p>
            <h2 className="section-title mb-8">
              Engineering{" "}
              <span className="text-gradient">Latent Space</span>
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-base">
              {PERSONAL.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Education */}
            <div className="mt-12">
              <h3 className="text-sm font-label text-outline uppercase tracking-widest mb-6">
                Education
              </h3>
              <div className="space-y-4">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.institution}
                    className="bg-surface-container-highest p-5 border-l-2 border-primary/30"
                  >
                    <div className="text-sm font-label text-primary mb-1">
                      {edu.period}
                    </div>
                    <div className="font-headline font-bold text-on-surface">
                      {edu.degree}
                    </div>
                    <div className="text-on-surface-variant text-sm">
                      {edu.institution}
                    </div>
                    <div className="text-tertiary-fixed-dim text-xs font-label mt-1">
                      CGPA: {edu.grade}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - skills chips + certifications */}
          <motion.div
            ref={rightRef}
            variants={fadeUp}
            initial="hidden"
            animate={rightVisible ? "show" : "hidden"}
            transition={{ delay: 0.15 }}
          >
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { value: "5+", label: "Years in AI/ML" },
                { value: "10K+", label: "Students Trained" },
                { value: "M.Tech", label: "IIT Tirupati" },
                { value: "Azure", label: "Cloud Platform" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-surface-container-highest p-6 text-center"
                >
                  <div className="text-3xl font-headline font-bold text-gradient mb-1">
                    {value}
                  </div>
                  <div className="text-xs text-on-surface-variant font-label uppercase tracking-widest">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Skill chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { label: "Deep Learning", color: "primary" },
                { label: "RAG Architectures", color: "secondary" },
                { label: "Vector Search", color: "tertiary" },
                { label: "LangChain", color: "primary" },
                { label: "PyTorch", color: "secondary" },
                { label: "Azure ML", color: "tertiary" },
                { label: "FastAPI", color: "primary" },
                { label: "MLOps", color: "secondary" },
                { label: "OpenAI API", color: "tertiary" },
                { label: "Docker", color: "primary" },
              ].map(({ label, color }) => (
                <div
                  key={label}
                  className={`px-4 py-2 bg-surface-container-highest border-l-2 font-label text-sm transition-colors ${color === "primary"
                      ? "border-primary text-primary hover:bg-primary/10"
                      : color === "secondary"
                        ? "border-secondary text-secondary hover:bg-secondary/10"
                        : "border-tertiary text-tertiary hover:bg-tertiary/10"
                    }`}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-sm font-label text-outline uppercase tracking-widest mb-6">
                Certifications
              </h3>
              <div className="flex flex-wrap gap-3">
                {CERTIFICATIONS.map((cert) =>
                  cert.url ? (
                    <a
                      key={cert.title}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:border-primary/50 hover:text-primary transition-all font-label"
                    >
                      {cert.title} ↗
                    </a>
                  ) : (
                    <span
                      key={cert.title}
                      className="text-xs px-3 py-1.5 bg-surface-container border border-outline-variant/30 text-on-surface-variant font-label"
                    >
                      {cert.title}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
