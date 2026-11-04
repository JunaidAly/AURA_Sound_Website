"use client";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
export default function Philosophy({ effects }) {
  return (
    <Section className="philosophy" id="philosophy" effects={effects}>
      <div className="sound-art" aria-hidden="true">
        <div className="sound-ring r1"></div>
        <div className="sound-ring r2"></div>
        <div className="sound-ring r3"></div>
        <div className="sound-ring r4"></div>
        <div className="sound-core">a.</div>
        <span>FORM FOLLOWS FEELING.</span>
      </div>
      <div className="philosophy-copy">
        <Typography variant="eyebrow">02 / OUR PHILOSOPHY</Typography>
        <Typography as="h2" variant="heading">
          Not just in your room.
          <br />
          <em>Part of it.</em>
        </Typography>
        <Typography>
          We believe the things you live with should bring something to your
          everyday. A little warmth. A moment of connection. A song that makes
          you stay a little longer.
        </Typography>
        <Typography>
          Aura explores a quieter approach to audio: considered shapes, tactile
          finishes, and nothing that gets between you and the music.
        </Typography>
        <a className="text-link" href="#details">
          A closer look{" "}
          <span>
            <Icon name="arrow" />
          </span>
        </a>
      </div>
    </Section>
  );
}
