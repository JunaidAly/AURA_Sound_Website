"use client";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
export default function Closing({ product, setProduct, setDialog, effects }) {
  return (
    <Section className="closing" effects={effects}>
      <Typography variant="eyebrow">MAKE ROOM FOR SOMETHING GOOD.</Typography>
      <Typography as="h2" variant="heading">
        Find your frequency.
      </Typography>
      <Button
        className="button"
        data-product="One"
        onClick={() => {
          setProduct("One");
          setDialog("product");
        }}
        whileHover={effects ? { scale: 1.04 } : undefined}
        whileTap={effects ? { scale: 0.97 } : undefined}
      >
        Explore your Aura{" "}
        <span>
          <Icon name="arrow" />
        </span>
      </Button>
    </Section>
  );
}
