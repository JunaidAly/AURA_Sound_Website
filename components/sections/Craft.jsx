"use client";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
export default function Craft({ effects }) {
  return (
    <Section className="craft section" effects={effects}>
      <Typography variant="eyebrow">05 / THE ART OF LESS</Typography>
      <div className="craft-heading">
        <Typography as="h2" variant="heading">
          Good design is felt.
          <br />
          <em>In every little detail.</em>
        </Typography>
        <span className="craft-mark" aria-hidden="true">
          <Icon name="sun" />
        </span>
      </div>
      <motion.div
        className="craft-grid"
        initial={false}
        whileInView={
          effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
        }
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7 }}
      >
        <Card className="rounded-none border-x-0 border-b-0 bg-transparent backdrop-blur-none">
          <span>01</span>
          <Typography as="h3" variant="title">
            A softer silhouette.
          </Typography>
          <Typography>
            Rounded edges and balanced proportions give technology a more human
            presence.
          </Typography>
        </Card>
        <Card className="rounded-none border-x-0 border-b-0 bg-transparent backdrop-blur-none">
          <span>02</span>
          <Typography as="h3" variant="title">
            Texture with intention.
          </Typography>
          <Typography>
            A woven surface brings visual warmth to shelves, desks and quiet
            corners.
          </Typography>
        </Card>
        <Card className="rounded-none border-x-0 border-b-0 bg-transparent backdrop-blur-none">
          <span>03</span>
          <Typography as="h3" variant="title">
            Only what you need.
          </Typography>
          <Typography>
            Simple controls. Considered details. More space for the music, less
            for everything else.
          </Typography>
        </Card>
      </motion.div>
    </Section>
  );
}
