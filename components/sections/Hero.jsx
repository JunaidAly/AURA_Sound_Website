"use client";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const { scrollYProgress } = useScroll({ target: journey, offset: ["start start", "end end"] });
  const turn = useTransform(scrollYProgress, [0, .35, .7, 1], [-24, 30, -38, -12]);
  const tilt = useTransform(scrollYProgress, [0, .5, 1], [-12, 10, -8]);
  const lean = useTransform(scrollYProgress, [0, .5, 1], [7, -8, 0]);
  const lift = useTransform(scrollYProgress, [0, .5, 1], [0, -36, 30]);
  const zoom = useTransform(scrollYProgress, [0, .5, 1], [1, 1.12, .9]);
  const introOpacity = useTransform(scrollYProgress, [0, .15, .3], [1, 1, 0]);
  const detailOpacity = useTransform(scrollYProgress, [.25, .4, .7, .82], [0, 1, 1, 0]);
  const finalOpacity = useTransform(scrollYProgress, [.72, .9, 1], [0, 1, 1]);
  return (
    <section ref={journey} className={"hero-journey" + (!effects ? " journey-static" : "")} aria-label="Aura One product story">
    <div className="hero hero-sticky">
      <div className="hero-story">
      <motion.div className="hero-copy" style={effects ? { opacity: introOpacity } : undefined}>
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
      <motion.div className="journey-copy" style={{ opacity: effects ? detailOpacity : 0 }} aria-hidden="true">
        <Typography variant="eyebrow">01 / A CLOSER LOOK</Typography>
        <Typography as="h2">Beautiful from<br /><em>every angle.</em></Typography>
        <Typography>A tactile woven shell. Soft curves. A quieter kind of technology, made to feel at home.</Typography>
        <span className="journey-rule" />
        <Typography variant="caption">SCULPTURAL FORM · WOVEN TEXTURE</Typography>
      </motion.div>
      <motion.div className="journey-copy" style={{ opacity: effects ? finalOpacity : 0 }} aria-hidden="true">
        <Typography variant="eyebrow">02 / MADE TO BELONG</Typography>
        <Typography as="h2">Small presence.<br /><em>Fuller feeling.</em></Typography>
        <Typography>From the first light to your last record. Find a finish that fits your space, and make room for sound.</Typography>
        <span className="journey-rule" />
        <Typography variant="caption">THREE FINISHES · ONE EVERYDAY ICON</Typography>
      </motion.div>
      </div>
      <div
        className="stage"
        id="stage"
        aria-label="Interactive three-dimensional speaker visualization"
        onPointerMove={!effects ? rotateSpeaker : undefined}
        onPointerLeave={() => setRotation(undefined)}
      >
        <div className="stage-top">
          <span>AURA ONE</span>
          <span>001 / 003</span>
        </div>
        <div className="big-word" aria-hidden="true">
          aura
        </div>
        <div className="orbit orbit1"></div>
        <div className="orbit orbit2"></div>
        <div className="speaker-wrap" id="speakerWrap">
          <motion.div className="speaker" id="speaker" style={effects ? { rotateY: turn, rotateX: tilt, rotateZ: lean, y: lift, scale: zoom } : { transform: rotation }}>
            <div className="speaker-top">
              <span>−</span>
              <span>○</span>
              <span>
                <Icon name="plus" />
              </span>
            </div>
            <div className="speaker-face">
              <div className="speaker-brand">aura</div>
              <div className="led"></div>
            </div>
            <div className="speaker-side"></div>
            <div className="speaker-base"></div>
          </motion.div>
        </div>
        <div className="annotation">
          <span className="dot"></span> BIG SOUND. SMALL FOOTPRINT.
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
              className={"swatch clay" + (finish === "clay" ? " selected" : "")}
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
      <div className="journey-progress" aria-hidden="true"><motion.div style={{ scaleX: effects ? scrollYProgress : 0 }} /></div>
    </div>
    </section>
  );
}
