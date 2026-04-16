import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import TimelineNode from "../ui/TimelineNode";
import { EXPERIENCES } from "../../lib/data";

export default function Experience() {
  const { ref: headRef, isInView } = useScrollReveal();
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 bg-surface-container-low relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="section-label text-primary">Professional History</p>
          <h2 className="section-title">
            The Development <span className="text-gradient">Trace</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={lineRef} className="relative pl-8">
          {/* Track line */}
          <div className="absolute left-0 top-0 w-px h-full bg-outline-variant/20" />
          {/* Animated fill */}
          <motion.div
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-primary via-secondary to-tertiary origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <TimelineNode isCurrent={exp.isCurrent} />

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-1">
                    <span className="text-xs font-label text-tertiary-fixed-dim uppercase tracking-widest">
                      {exp.period}
                    </span>
                    <span className="text-xs font-label text-outline">
                      {exp.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-headline font-bold text-on-surface mt-1">
                    {exp.role}
                  </h3>

                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-label font-medium hover:underline inline-flex items-center gap-1"
                    >
                      {exp.company}
                      <span className="text-xs">↗</span>
                    </a>
                  ) : (
                    <p className="text-primary font-label font-medium">{exp.company}</p>
                  )}

                  <ul className="mt-3 space-y-2">
                    {exp.description.map((d, j) => (
                      <li
                        key={j}
                        className="text-on-surface-variant text-sm leading-relaxed grid grid-cols-[12px_1fr] gap-2"
                      >
                        <span className="text-primary/60 flex-shrink-0 leading-5 text-[10px] pt-px select-none">▸</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
