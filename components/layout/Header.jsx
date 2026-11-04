"use client";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { motion } from "framer-motion";
export default function Header({ scrolled, setDialog, selection, effects }) {
  return (
    <header className={scrolled ? "scrolled" : ""}>
      <a className="logo" href="#" aria-label="Aura home">
        aura<span>®</span>
      </a>
      <nav aria-label="Main navigation">
        <Button asChild><a href="#collection">Collection</a></Button>
        <Button asChild><a href="#philosophy">Our philosophy</a></Button>
        <Button asChild><a href="#details">The details</a></Button>
      </nav>
      <Button
        className="bag"
        id="bag"
        onClick={() => setDialog("selection")}
        whileHover={effects ? { scale: 1.04 } : undefined}
        whileTap={effects ? { scale: 0.97 } : undefined}
      >
        Your selection <span id="count">{selection.length}</span>{" "}
        <Icon name="arrow" />
      </Button>
    </header>
  );
}
