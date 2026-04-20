import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, MessageSquare, Send, AlertCircle } from "lucide-react";
import { submitContact } from "../../lib/api";
import type { ContactFormData } from "../../types";

const EMPTY: ContactFormData = { name: "", email: "", message: "" };

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Identification required";
    if (!form.email.trim()) {
      newErrors.email = "Secure channel (email) required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid transmission frequency (email format)";
    }
    if (!form.message.trim()) newErrors.message = "Directive briefing missing";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Identification required";
    if (!form.email.trim()) {
      newErrors.email = "Secure channel (email) required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid transmission frequency (email format)";
    }
    if (!form.message.trim()) newErrors.message = "Directive briefing missing";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error for this field when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ContactFormData];
        return next;
      });
    }
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error for this field when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ContactFormData];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("sending");
    setErrorMsg("");

    const result = await submitContact(form);

    if (result.data) {
      setStatus("success");
      setForm(EMPTY);
      setErrors({});
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Transmission failure. Please retry.");
    }
  };

  return (
    <div className="glass-card p-8 md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 12,
                stiffness: 200,
                delay: 0.1
              }}
              className="relative w-24 h-24 mb-10"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
              <div className="relative w-full h-full bg-surface-container border-2 border-primary/30 rounded-2xl flex items-center justify-center shadow-node-current overflow-hidden">
                <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <motion.path
                    d="M5 13l4 4L19 7"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 0.4
                    }}
                  />
                </svg>
                <motion.div
                  className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-3xl font-headline font-bold text-on-surface mb-3 tracking-wide">
                Message Dispatched
              </h3>
              <p className="text-on-surface-variant max-w-[280px] mx-auto text-lg leading-relaxed">
                Your transmission was successful. I\'ll get back to you shortly.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => setStatus("idle")}
              className="mt-12 text-primary/70 hover:text-primary text-sm font-label uppercase tracking-widest flex items-center gap-2 group transition-colors"
            >
              <span className="w-4 h-[1px] bg-primary/40 group-hover:w-8 transition-all" />
              Send another message
              <span className="w-4 h-[1px] bg-primary/40 group-hover:w-8 transition-all" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
              <label className={`flex items-center gap-2 text-xs font-label uppercase tracking-[0.2em] mb-3 transition-colors ${errors.name ? "text-error" : "text-outline"}`}>
                <User size={14} className={errors.name ? "text-error" : "text-primary"} />
                Your Identity
              </label>
              <div className="relative group">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`input-field transition-all duration-300 ${errors.name ? "border-error/50 bg-error/5" : "group-focus-within:border-primary/60"}`}
                />
                <div className={`absolute bottom-0 left-0 h-[2px] transition-all duration-500 ${errors.name ? "w-full bg-error" : "w-0 bg-primary group-focus-within:w-full"}`} />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -5 }}
                    className="text-error text-[10px] font-label uppercase tracking-wider mt-2 flex items-center gap-1"
                  >
                    <AlertCircle size={10} /> {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
              <label className={`flex items-center gap-2 text-xs font-label uppercase tracking-[0.2em] mb-3 transition-colors ${errors.email ? "text-error" : "text-outline"}`}>
                <Mail size={14} className={errors.email ? "text-error" : "text-primary"} />
                Secure Channel
              </label>
              <div className="relative group">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@domain.com"
                  className={`input-field transition-all duration-300 ${errors.email ? "border-error/50 bg-error/5" : "group-focus-within:border-primary/60"}`}
                />
                <div className={`absolute bottom-0 left-0 h-[2px] transition-all duration-500 ${errors.email ? "w-full bg-error" : "w-0 bg-primary group-focus-within:w-full"}`} />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -5 }}
                    className="text-error text-[10px] font-label uppercase tracking-wider mt-2 flex items-center gap-1"
                  >
                    <AlertCircle size={10} /> {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
              <label className={`flex items-center gap-2 text-xs font-label uppercase tracking-[0.2em] mb-3 transition-colors ${errors.message ? "text-error" : "text-outline"}`}>
                <MessageSquare size={14} className={errors.message ? "text-error" : "text-primary"} />
                Project Directive
              </label>
              <div className="relative group">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Outline your vision or inquiry..."
                  className={`input-field resize-none transition-all duration-300 ${errors.message ? "border-error/50 bg-error/5" : "group-focus-within:border-primary/60"}`}
                />
                <div className={`absolute bottom-0 left-0 h-[2px] transition-all duration-500 ${errors.message ? "w-full bg-error" : "w-0 bg-primary group-focus-within:w-full"}`} />
              </div>
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -5 }}
                    className="text-error text-[10px] font-label uppercase tracking-wider mt-2 flex items-center gap-1"
                  >
                    <AlertCircle size={10} /> {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-error/10 border border-error/20 p-4 rounded-lg text-error text-sm font-label flex items-start gap-3"
                >
                  <AlertCircle className="shrink-0 w-5 h-5" />
                  <div>
                    <span className="font-bold block mb-1">SYSTEM ALERT</span>
                    {errorMsg}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="w-full bg-primary text-on-primary font-bold font-headline py-4 hover:shadow-cyan-glow transition-all duration-300 uppercase tracking-widest disabled:opacity-60 relative overflow-hidden group"
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {status === "sending" ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" strokeWidth="4" className="opacity-75" />
                    </svg>
                    Syncing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Initiate Sequence
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
