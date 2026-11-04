"use client";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
export default function Questions({ selection, effects }) {
  return (
    <Section className="section questions" effects={effects}>
      <div>
        <Typography variant="eyebrow">06 / A LITTLE MORE CLARITY</Typography>
        <Typography as="h2" variant="heading">
          Good questions.
        </Typography>
      </div>
      <div>
        <details>
          <summary>
            Can I buy an Aura speaker?
            <span>
              <Icon name="plus" />
            </span>
          </summary>
          <Typography>
            Aura is an independent portfolio concept by Junaid Ali. These
            products are not for sale; the selection flow demonstrates a
            possible shopping experience.
          </Typography>
        </details>
        <details>
          <summary>
            Can this experience be made for my business?
            <span>
              <Icon name="plus" />
            </span>
          </summary>
          <Typography>
            Yes. The visual direction can be adapted to your real products,
            branding and customer journey, with enquiries or a full shopping
            experience depending on your needs.
          </Typography>
        </details>
        <details>
          <summary>
            How do I explore the finishes?
            <span>
              <Icon name="plus" />
            </span>
          </summary>
          <Typography>
            Use the Sand, Charcoal and Clay controls in the hero. On a desktop,
            move your pointer over the speaker to explore its depth. Use Pause
            motion for a calmer experience.
          </Typography>
        </details>
      </div>
    </Section>
  );
}
