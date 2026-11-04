"use client";
import { motion } from "framer-motion";
export function Section({ effects = true, children, ...props }) {
  return (
    <motion.section
      initial={false}
      whileInView={
        effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7 }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
