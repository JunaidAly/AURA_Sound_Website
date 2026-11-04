"use client";
import { useState, useEffect, useRef } from "react";
import { useReducedMotion, useScroll } from "framer-motion";
export function useShowroom() {
  const [finish, setFinish] = useState("sand"),
    [mood, setMood] = useState("morning"),
    [paused, setPaused] = useState(false),
    [scrolled, setScrolled] = useState(false),
    [rotation, setRotation] = useState(),
    [product, setProduct] = useState("One"),
    [dialog, setDialog] = useState(null),
    [selection, setSelection] = useState([]),
    [notice, setNotice] = useState("");
  const reduced = useReducedMotion();
  const effects = !reduced && !paused;
  const { scrollYProgress } = useScroll();
  const timer = useRef(null);
  const nextId = useRef(0);
  const finishLabel = finish[0].toUpperCase() + finish.slice(1);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 15);
    fn();
    window.addEventListener("scroll", fn, { passive: true });

    return () => {
      window.removeEventListener("scroll", fn);
      clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (reduced) setPaused(true);
  }, [reduced]);
  function rotateSpeaker(e) {
    if (!effects || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    setRotation(
      `rotateX(${-12 - y * 12}deg) rotateY(${-24 + x * 25}deg) rotateZ(7deg)`,
    );
  }
  const selectedFinish =
    product === "One" ? finishLabel : product === "Go" ? "Charcoal" : "Clay";
  function add() {
    const item = {
      id: ++nextId.current,
      model: product,
      finish: selectedFinish,
    };
    setSelection((s) => [...s, item]);
    setDialog(null);
    setNotice("Aura " + product + " added to your selection");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(""), 2600);
  }

  return {
    finish,
    setFinish,
    mood,
    setMood,
    paused,
    setPaused,
    scrolled,
    rotation,
    setRotation,
    product,
    setProduct,
    dialog,
    setDialog,
    selection,
    setSelection,
    notice,
    effects,
    scrollYProgress,
    finishLabel,
    selectedFinish,
    rotateSpeaker,
    add,
  };
}
