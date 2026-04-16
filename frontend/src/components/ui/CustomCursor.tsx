import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorState = "default" | "hover" | "click";

// Only render on devices with a fine pointer (mouse/trackpad), not touch screens
const hasFinePointer = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

export default function CustomCursor() {
  if (!hasFinePointer) return null;

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Main crosshair dot - nearly instant ────────────────────────────────────
  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 60, mass: 0.05 });
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 60, mass: 0.05 });

  // ── Outer ring - smooth, short lag ─────────────────────────────────────────
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.8 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const onMouseDown = () => {
      setState("click");
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
      clickTimeout.current = setTimeout(() => setState("default"), 300);
    };

    const onDocLeave = () => setVisible(false);
    const onDocEnter = () => setVisible(true);

    // Delegate hover detection - picks up dynamically added elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [role=button], input, textarea, select, label[for]")) {
        setState("hover");
      } else {
        setState((s) => (s === "click" ? s : "default"));
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
    };
  }, [mouseX, mouseY]);

  const isHover = state === "hover";
  const isClick = state === "click";

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Outer ring ───────────────────────────────────────────────── */}
          <motion.div
            key="ring"
            className="fixed top-0 left-0 pointer-events-none z-[9997]"
            style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3, transition: { duration: 0.2 } }}
          >
            <motion.div
              animate={{
                width: isClick ? 18 : isHover ? 44 : 32,
                height: isClick ? 18 : isHover ? 44 : 32,
                borderColor: isHover
                  ? "rgba(209,188,255,0.7)"
                  : "rgba(164,230,255,0.45)",
                backgroundColor: isHover
                  ? "rgba(209,188,255,0.06)"
                  : "rgba(164,230,255,0.0)",
              }}
              transition={{
                width: { type: "spring", stiffness: 380, damping: 28 },
                height: { type: "spring", stiffness: 380, damping: 28 },
                borderColor: { duration: 0.2 },
                backgroundColor: { duration: 0.2 },
              }}
              style={{
                borderWidth: isHover ? 1.5 : 1,
                borderStyle: "solid",
                borderRadius: 9999,
              }}
            />
          </motion.div>

          {/* ── Click ripple ──────────────────────────────────────────────── */}
          <AnimatePresence>
            {isClick && (
              <motion.div
                key={`ripple-${Date.now()}`}
                className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full"
                style={{
                  x: dotX,
                  y: dotY,
                  translateX: "-50%",
                  translateY: "-50%",
                  border: "1px solid rgba(164,230,255,0.6)",
                }}
                initial={{ width: 8, height: 8, opacity: 0.8 }}
                animate={{ width: 48, height: 48, opacity: 0 }}
                exit={{}}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* ── Inner crosshair dot ───────────────────────────────────────── */}
          <motion.div
            key="dot"
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.15 } }}
          >
            <motion.div
              animate={{
                width: isClick ? 3 : isHover ? 4 : 5,
                height: isClick ? 3 : isHover ? 4 : 5,
                backgroundColor: isHover
                  ? "rgba(209,188,255,1)"   // purple on hover
                  : "rgba(164,230,255,1)",  // cyan default
                scale: isClick ? 0.5 : 1,
                boxShadow: isHover
                  ? "0 0 8px 2px rgba(209,188,255,0.5)"
                  : "0 0 6px 1px rgba(164,230,255,0.4)",
              }}
              transition={{
                width: { type: "spring", stiffness: 400, damping: 25 },
                height: { type: "spring", stiffness: 400, damping: 25 },
                backgroundColor: { duration: 0.15 },
                scale: { type: "spring", stiffness: 500, damping: 30 },
                boxShadow: { duration: 0.2 },
              }}
              style={{ borderRadius: 9999 }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
