"use client";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
const variants = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "bg-paper text-ink hover:bg-white",
  ghost: "bg-transparent text-ink",
};
export const Button = forwardRef(function Button(
  { asChild = false, variant = "ghost", className, type = "button", ...props },
  ref,
) {
  const Component = asChild ? Slot : motion.button;
  return (
    <Component
      ref={ref}
      {...(!asChild ? { type } : {})}
      className={cn(
        "inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
});
