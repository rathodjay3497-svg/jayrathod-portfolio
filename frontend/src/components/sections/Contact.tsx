import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import GridBackground from "../ui/GridBackground";
import ContactForm from "./ContactForm";
import GradientText from "../ui/GradientText";
import { PERSONAL } from "../../lib/data";

export default function Contact() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="contact" className="py-32 bg-surface-container-low relative overflow-hidden">
      <GridBackground />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label text-primary">Transmission</p>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 leading-tight">
              Let's Build the{" "}
              <GradientText>Future</GradientText>
            </h2>
            <p className="text-lg text-on-surface-variant mb-12 leading-relaxed">
              Looking for an engineer who understands both the latent space and
              the server rack? Open to full-time roles, freelance AI projects,
              and research collaborations.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <a
                href={`mailto:${PERSONAL.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest rounded-full text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-label text-outline uppercase tracking-widest">Email</p>
                  <p className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                    {PERSONAL.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${PERSONAL.phone}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest rounded-full text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-label text-outline uppercase tracking-widest">Phone</p>
                  <p className="text-base font-bold text-on-surface group-hover:text-tertiary transition-colors">
                    (+91) 70169 15420
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest rounded-full text-secondary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-label text-outline uppercase tracking-widest">Location</p>
                  <p className="text-base font-bold text-on-surface">{PERSONAL.location}</p>
                </div>
              </div>

              {/* GitHub */}
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest rounded-full text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-label text-outline uppercase tracking-widest">GitHub</p>
                  <p className="text-base font-bold text-on-surface group-hover:text-tertiary transition-colors">
                    JayRathod341997
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest rounded-full text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-label text-outline uppercase tracking-widest">LinkedIn</p>
                  <p className="text-base font-bold text-on-surface group-hover:text-secondary transition-colors">
                    jay-rathod
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
