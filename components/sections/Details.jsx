"use client";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
export default function Details({ product, effects }) {
  return (
    <Section className="section details" id="details" effects={effects}>
      <div className="section-head">
        <div>
          <Typography variant="eyebrow">
            03 / CONSIDERED IN EVERY DETAIL
          </Typography>
          <Typography as="h2" variant="heading">
            Beautiful outside.
            <br />
            Wonderful within.
          </Typography>
        </div>
        <Typography>
          A concept built around simple pleasures.
          <br />
          Explore the imagined product specifications.
        </Typography>
      </div>
      <motion.div
        className="feature-grid"
        initial={false}
        whileInView={
          effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
        }
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7 }}
      >
        <article>
          <span className="feature-icon">
            <Icon name="disc" />
          </span>
          <Typography as="h3" variant="title">
            Room-filling sound
          </Typography>
          <Typography>
            A 360° acoustic concept that puts you in the sweet spot, wherever
            you sit.
          </Typography>
        </article>
        <article>
          <span className="feature-icon">
            <Icon name="wave" />
          </span>
          <Typography as="h3" variant="title">
            Connection, simplified
          </Typography>
          <Typography>
            Imagined with Bluetooth and Wi-Fi for a seamless move from quiet
            mornings to late nights.
          </Typography>
        </article>
        <article>
          <span className="feature-icon">
            <Icon name="contrast" />
          </span>
          <Typography as="h3" variant="title">
            Materials that matter
          </Typography>
          <Typography>
            A tactile woven shell and soft-touch top, envisioned in three
            earth-inspired finishes.
          </Typography>
        </article>
      </motion.div>
      <details>
        <summary>
          Compare the collection{" "}
          <span>
            <Icon name="plus" />
          </span>
        </summary>
        <div className="table-wrap">
          <table>
            <caption>Illustrative product specifications</caption>
            <thead>
              <tr>
                <th>Model</th>
                <th>One</th>
                <th>Go</th>
                <th>Studio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Designed for</th>
                <td>Everyday listening</td>
                <td>On the move</td>
                <td>Immersive listening</td>
              </tr>
              <tr>
                <th>Power concept</th>
                <td>Wall powered</td>
                <td>Rechargeable</td>
                <td>Wall powered</td>
              </tr>
              <tr>
                <th>Starting price</th>
                <td>$249</td>
                <td>$149</td>
                <td>$449</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </Section>
  );
}
