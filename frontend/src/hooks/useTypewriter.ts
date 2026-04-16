import { useEffect, useState } from "react";

export function useTypewriter(strings: string[], speed = 60, pause = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[index];

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(t);
    }

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % strings.length);
    }
  }, [charIndex, deleting, index, strings, speed, pause]);

  useEffect(() => {
    setDisplayText(strings[index].slice(0, charIndex));
  }, [charIndex, index, strings]);

  return displayText;
}
