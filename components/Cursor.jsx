"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
export default function Cursor({ enabled }) {
  const x = useMotionValue(-100),
    y = useMotionValue(-100),
    sx = useSpring(x, { stiffness: 250, damping: 25 }),
    sy = useSpring(y, { stiffness: 250, damping: 25 });
  const [visible, setVisible] = useState(false),
    [active, setActive] = useState(false);
  useEffect(() => {
    const fine = matchMedia("(hover:hover) and (pointer:fine)");
    if (!enabled) {
      setVisible(false);
      return;
    }
    const move = (e) => {
      if (!fine.matches || e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setActive(Boolean(e.target.closest("a,button,summary")));
    };
    const hide = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, [enabled, x, y]);
  return (
    <motion.div
      aria-hidden="true"
      className={"cursor-halo" + (active ? " active" : "")}
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
