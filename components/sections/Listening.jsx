"use client";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { moods } from "../../data/catalog";
export default function Listening({ mood, setMood, effects }) {
  return (
    <Section className="listening section" id="listening" effects={effects}>
      <div className="section-head">
        <div>
          <Typography variant="eyebrow">04 / FIND YOUR RHYTHM</Typography>
          <Typography as="h2" variant="heading">
            One space.
            <br />A thousand moods.
          </Typography>
        </div>
        <Typography>
          Set the scene. Let the day slow down.
          <br />
          Explore three ways to make room for music.
        </Typography>
      </div>
      <div className="mood-layout">
        <div className="mood-scene" data-mood={mood}>
          <div className="scene-window"></div>
          <div className="scene-sun"></div>
          <div className="scene-table"></div>
          <div className="scene-speaker mini-speaker">
            <span>aura</span>
          </div>
          <div className="scene-vinyl"></div>
          <span className="scene-label">{moods[mood][0]}</span>
        </div>
        <div className="mood-controls">
          <div
            className="mood-buttons"
            role="group"
            aria-label="Listening mood"
          >
            <Button
              data-mood="morning"
              aria-pressed={mood === "morning"}
              onClick={() => setMood("morning")}
              whileHover={effects ? { scale: 1.04 } : undefined}
              whileTap={effects ? { scale: 0.97 } : undefined}
            >
              01 / Slow mornings{" "}
              <span>
                <Icon name="arrow" />
              </span>
            </Button>
            <Button
              data-mood="focus"
              aria-pressed={mood === "focus"}
              onClick={() => setMood("focus")}
              whileHover={effects ? { scale: 1.04 } : undefined}
              whileTap={effects ? { scale: 0.97 } : undefined}
            >
              02 / Find your focus{" "}
              <span>
                <Icon name="arrow" />
              </span>
            </Button>
            <Button
              data-mood="evening"
              aria-pressed={mood === "evening"}
              onClick={() => setMood("evening")}
              whileHover={effects ? { scale: 1.04 } : undefined}
              whileTap={effects ? { scale: 0.97 } : undefined}
            >
              03 / After hours{" "}
              <span>
                <Icon name="arrow" />
              </span>
            </Button>
          </div>
          <Typography id="moodCopy" aria-live="polite">
            {moods[mood][1]}
          </Typography>
          <div className="wave" aria-hidden="true">
            <i style={{ "--i": "0" }}></i>
            <i style={{ "--i": "1" }}></i>
            <i style={{ "--i": "2" }}></i>
            <i style={{ "--i": "3" }}></i>
            <i style={{ "--i": "4" }}></i>
            <i style={{ "--i": "5" }}></i>
            <i style={{ "--i": "6" }}></i>
            <i style={{ "--i": "7" }}></i>
            <i style={{ "--i": "8" }}></i>
            <i style={{ "--i": "9" }}></i>
            <i style={{ "--i": "10" }}></i>
            <i style={{ "--i": "11" }}></i>
            <i style={{ "--i": "12" }}></i>
            <i style={{ "--i": "13" }}></i>
            <i style={{ "--i": "14" }}></i>
            <i style={{ "--i": "15" }}></i>
            <i style={{ "--i": "16" }}></i>
            <i style={{ "--i": "17" }}></i>
            <i style={{ "--i": "18" }}></i>
            <i style={{ "--i": "19" }}></i>
            <i style={{ "--i": "20" }}></i>
            <i style={{ "--i": "21" }}></i>
            <i style={{ "--i": "22" }}></i>
            <i style={{ "--i": "23" }}></i>
            <i style={{ "--i": "24" }}></i>
            <i style={{ "--i": "25" }}></i>
            <i style={{ "--i": "26" }}></i>
            <i style={{ "--i": "27" }}></i>
            <i style={{ "--i": "28" }}></i>
            <i style={{ "--i": "29" }}></i>
          </div>
          <span className="mood-note">
            A visual listening concept · no audio playback
          </span>
        </div>
      </div>
    </Section>
  );
}
