import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContact } from "../../lib/api";
import type { ContactFormData } from "../../types";

const EMPTY: ContactFormData = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const result = await submitContact(form);

    if (result.data) {
      setStatus("success");
      setForm(EMPTY);
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong.");
    }
  };

  return (
    <div className="glass-card p-8 md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">
              Transmission Received
            </h3>
            <p className="text-on-surface-variant">
              I'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 text-primary text-sm font-label underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div>
              <label className="block text-xs font-label text-outline uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Jay Rathod"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-label text-outline uppercase tracking-widest mb-2">
                Work Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@company.ai"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-label text-outline uppercase tracking-widest mb-2">
                Brief Intent
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your project or opportunity..."
                className="input-field resize-none"
              />
            </div>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-error text-sm font-label"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-primary text-on-primary font-bold font-headline py-4 hover:shadow-cyan-glow-lg transition-all duration-300 uppercase tracking-widest disabled:opacity-60"
              whileTap={{ scale: 0.98 }}
            >
              {status === "sending" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" strokeWidth="4" className="opacity-75" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Initiate Contact"
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
