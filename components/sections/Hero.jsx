"use client";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
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
  return (
    <Section className="hero" effects={effects}>
      <div className="hero-copy">
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
      </div>
      <div
        className="stage"
        id="stage"
        aria-label="Interactive three-dimensional speaker visualization"
        onPointerMove={rotateSpeaker}
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
          <div className="speaker" id="speaker" style={{ transform: rotation }}>
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
          </div>
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
    </Section>
  );
}
