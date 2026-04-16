import { motion } from "framer-motion";
import { useTypewriter } from "../../hooks/useTypewriter";
import GradientText from "../ui/GradientText";
import PulseIndicator from "../ui/PulseIndicator";
import NeuralBackground from "../ui/NeuralBackground";
import GridBackground from "../ui/GridBackground";
import { PERSONAL } from "../../lib/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const typeText = useTypewriter(PERSONAL.taglines, 55, 2200);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface"
    >
      <GridBackground />
      <NeuralBackground />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left col */}
        <motion.div
          className="lg:col-span-7"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="mb-6">
            <PulseIndicator />
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl lg:text-7xl font-bold font-headline leading-tight mb-4 tracking-tight"
          >
            {PERSONAL.headline.split(" ").slice(0, 1).join(" ")}{" "}
            <GradientText>
              {PERSONAL.headline.split(" ").slice(1, 3).join(" ")}
            </GradientText>{" "}
            {PERSONAL.headline.split(" ").slice(3).join(" ")}
          </motion.h1>

          <motion.div
            variants={item}
            className="text-xl text-primary font-label font-medium mb-4 h-8"
          >
            <span>{typeText}</span>
            <span className="animate-pulse ml-0.5">|</span>
          </motion.div>

          <motion.p
            variants={item}
            className="text-lg text-on-surface-variant mb-10 max-w-2xl leading-relaxed"
          >
            Designing the cognitive infrastructure of the next digital era.
            From RAG pipelines to Azure deployments - bridging the gap between
            research and production.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-primary text-on-primary px-8 py-4 font-bold text-base font-headline hover:shadow-cyan-glow-lg transition-all duration-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="border border-outline-variant hover:bg-surface-container-highest px-8 py-4 font-bold text-base font-headline transition-all duration-300"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-10 mt-14"
          >
            {[
              { value: "5+", label: "Years Experience" },
              { value: "10K+", label: "Students Trained" },
              { value: "3", label: "Companies" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-headline font-bold text-gradient">
                  {value}
                </div>
                <div className="text-xs text-on-surface-variant font-label uppercase tracking-widest mt-1">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right col - abstract visual */}
        <motion.div
          className="lg:col-span-5 relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-full aspect-square glass-card rounded-xl flex items-center justify-center p-8 overflow-hidden relative">
            <NeuralBackground />
            <div className="relative z-10 text-center">
              <div className="text-8xl font-headline font-bold text-gradient opacity-30">
                AI
              </div>
              <div className="mt-4 space-y-2">
                {["RAG", "LLMs", "MLOps", "Azure"].map((tag) => (
                  <div
                    key={tag}
                    className="inline-block mx-1 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-label rounded"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 blur-3xl rounded-full" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface-variant"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs font-label uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
