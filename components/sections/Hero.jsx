"use client";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { useRef } from "react";
import dynamic from "next/dynamic";
const Speaker3D = dynamic(() => import("../product/Speaker3D"), { ssr: false });
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export default function Hero({
  finish,
  setFinish,
  paused,
  setPaused,
  rotation,
  setRotation,
  effects,
  finishLabel,
  rotateSpeaker,
}) {
  const journey = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: journey,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.6,
    restDelta: 0.0001,
  });
  const introOpacity = useTransform(smoothProgress, [0, 0.18, 0.32], [1, 1, 0]);
  const detailOpacity = useTransform(
    smoothProgress,
    [0.32, 0.44, 0.62, 0.76],
    [0, 1, 1, 0],
  );
  const finalOpacity = useTransform(smoothProgress, [0.76, 0.88, 1], [0, 1, 1]);
  return (
    <section
      ref={journey}
      className={"hero-journey" + (reduced ? " journey-static" : "")}
      aria-label="Aura One product story"
    >
      <div className="hero hero-sticky">
        <div className="hero-story">
          <motion.div
            className="hero-copy"
            style={reduced ? undefined : { opacity: introOpacity }}
          >
            <Typography variant="eyebrow">
              <span className="dot"></span> OBJECTS OF SOUND · COLLECTION 01
            </Typography>
            <Typography as="h1" variant="hero">
              Less noise.
              <br />
              More <em>feeling.</em>
            </Typography>
            <Typography className="intro">
              Extraordinary sound. Effortless presence.
              <br />
              Meet the speaker that feels as good as it sounds.
            </Typography>
            <motion.a
              className="button orange"
              href="#collection"
              whileHover={effects ? { scale: 1.04 } : undefined}
              whileTap={effects ? { scale: 0.97 } : undefined}
            >
              Discover Aura One{" "}
              <span>
                <Icon name="arrow" />
              </span>
            </motion.a>
            <div className="hero-foot">
              <span className="small-orbit">
                <Icon name="disc" />
              </span>
              <span>
                Designed to be heard.
                <br />
                <b>Made to belong.</b>
              </span>
            </div>
          </motion.div>
          <motion.div
            className="journey-copy"
            style={{ opacity: reduced ? 0 : detailOpacity }}
            aria-hidden="true"
          >
            <Typography variant="eyebrow">01 / A CLOSER LOOK</Typography>
            <Typography as="h2">
              Considered.
              <br />
              <em>All around.</em>
            </Typography>
            <Typography>
              A sculpted rear panel. Recessed connections. Every surface belongs
              to the same considered form.
            </Typography>
            <span className="journey-rule" />
            <Typography variant="caption">
              REAR PANEL · RECESSED CONNECTIONS
            </Typography>
          </motion.div>
          <motion.div
            className="journey-copy"
            style={{ opacity: reduced ? 0 : finalOpacity }}
            aria-hidden="true"
          >
            <Typography variant="eyebrow">02 / MADE TO BELONG</Typography>
            <Typography as="h2">
              Small presence.
              <br />
              <em>Fuller feeling.</em>
            </Typography>
            <Typography>
              From the first light to your last record. Find a finish that fits
              your space, and make room for sound.
            </Typography>
            <span className="journey-rule" />
            <Typography variant="caption">
              THREE FINISHES · ONE EVERYDAY ICON
            </Typography>
          </motion.div>
        </div>
        <div
          className="stage"
          id="stage"
          aria-label="Interactive three-dimensional speaker visualization"
        >
          <div className="stage-top">
            <span>AURA ONE</span>
            <span>360° PRODUCT VIEW</span>
          </div>
          <div className="big-word" aria-hidden="true">
            aura
          </div>
          <div className="orbit orbit1"></div>
          <div className="orbit orbit2"></div>
          <Speaker3D
            progress={smoothProgress}
            finish={finish}
            enabled={effects}
          />
          <div className="annotation">
            <span className="dot"></span> SCROLL TO EXPLORE EVERY ANGLE
          </div>
          <div className="stage-bottom">
            <div
              className="swatches"
              role="group"
              aria-label="Choose speaker finish"
            >
              <Button
                data-finish="sand"
                aria-label="Sand finish"
                className={"swatch " + (finish === "sand" ? " selected" : "")}
                aria-pressed={finish === "sand"}
                onClick={() => setFinish("sand")}
                whileHover={effects ? { scale: 1.04 } : undefined}
                whileTap={effects ? { scale: 0.97 } : undefined}
              ></Button>
              <Button
                data-finish="charcoal"
                aria-label="Charcoal finish"
                className={
                  "swatch charcoal" + (finish === "charcoal" ? " selected" : "")
                }
                aria-pressed={finish === "charcoal"}
                onClick={() => setFinish("charcoal")}
                whileHover={effects ? { scale: 1.04 } : undefined}
                whileTap={effects ? { scale: 0.97 } : undefined}
              ></Button>
              <Button
                data-finish="clay"
                aria-label="Clay finish"
                className={
                  "swatch clay" + (finish === "clay" ? " selected" : "")
                }
                aria-pressed={finish === "clay"}
                onClick={() => setFinish("clay")}
                whileHover={effects ? { scale: 1.04 } : undefined}
                whileTap={effects ? { scale: 0.97 } : undefined}
              ></Button>
              <span id="finishLabel">{finishLabel}</span>
            </div>
            <Button
              className="motion"
              id="motion"
              onClick={() => setPaused((v) => !v)}
              aria-pressed={paused}
              whileHover={effects ? { scale: 1.04 } : undefined}
              whileTap={effects ? { scale: 0.97 } : undefined}
            >
              {paused ? "▷ Resume motion" : "Ⅱ Pause motion"}
            </Button>
          </div>
        </div>
        <div className="journey-progress" aria-hidden="true">
          <motion.div style={{ scaleX: smoothProgress }} />
        </div>
      </div>
    </section>
  );
}
