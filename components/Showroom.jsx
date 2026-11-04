"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import ProductDialog from "./ProductDialog";
import Cursor from "./Cursor";
const products = {
  One: {
    price: 249,
    desc: "Your everyday listening companion. A compact, sculptural speaker envisioned for warm, room-filling sound.",
  },
  Go: {
    price: 149,
    desc: "A portable companion for wherever the day takes you. Small in scale, full of character.",
  },
  Studio: {
    price: 449,
    desc: "An expansive listening concept for your favourite space. A wider form with a deeper presence.",
  },
};
const colors = {
  sand: ["#b4aa95", "#d5cdbd", "#807762"],
  charcoal: ["#50534b", "#777b70", "#32362f"],
  clay: ["#ad6d52", "#cf967b", "#794333"],
};
const moods = {
  morning: [
    "THE MORNING RITUAL",
    "First light. Fresh coffee. Your favourite record. A softer start to whatever comes next.",
  ],
  focus: [
    "A LITTLE ROOM TO THINK",
    "Clear the desk. Find your flow. A thoughtful soundtrack for the things that deserve your attention.",
  ],
  evening: [
    "STAY A LITTLE LONGER",
    "Lights down. One more record. Turn an ordinary evening into your favourite part of the day.",
  ],
};
export default function Showroom() {
  const [finish, setFinish] = useState("sand"),
    [mood, setMood] = useState("morning"),
    [paused, setPaused] = useState(false),
    [scrolled, setScrolled] = useState(false),
    [rotation, setRotation] = useState(),
    [product, setProduct] = useState("One"),
    [dialog, setDialog] = useState(null),
    [selection, setSelection] = useState([]),
    [notice, setNotice] = useState("");
  const reduced = useReducedMotion();
  const effects = !reduced && !paused;
  const { scrollYProgress } = useScroll();
  const timer = useRef(null);
  const nextId = useRef(0);
  const finishLabel = finish[0].toUpperCase() + finish.slice(1);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 15);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (reduced) setPaused(true);
  }, [reduced]);
  function rotateSpeaker(e) {
    if (!effects || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    setRotation(
      `rotateX(${-12 - y * 12}deg) rotateY(${-24 + x * 25}deg) rotateZ(7deg)`,
    );
  }
  const selectedFinish =
    product === "One" ? finishLabel : product === "Go" ? "Charcoal" : "Clay";
  function add() {
    setSelection((s) => [
      ...s,
      { id: ++nextId.current, model: product, finish: selectedFinish },
    ]);
    setDialog(null);
    setNotice("Aura " + product + " added to your selection");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(""), 2600);
  }
  return (
    <MotionConfig reducedMotion={paused ? "always" : "user"}>
      <div
        className={paused ? "paused" : ""}
        style={{
          "--shell": colors[finish][0],
          "--shell-light": colors[finish][1],
          "--shell-dark": colors[finish][2],
        }}
      >
        <motion.div
          className="scroll-meter"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className={scrolled ? "scrolled" : ""}>
          <a className="logo" href="#" aria-label="Aura home">
            aura<span>®</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#collection">Collection</a>
            <a href="#philosophy">Our philosophy</a>
            <a href="#details">The details</a>
          </nav>
          <motion.button
            className="bag"
            id="bag"
            onClick={() => setDialog("selection")}
            whileHover={effects ? { scale: 1.04 } : undefined}
            whileTap={effects ? { scale: 0.97 } : undefined}
          >
            Your selection <span id="count">{selection.length}</span> ↗
          </motion.button>
        </header>
        <main id="main">
          <motion.section
            className="hero"
            initial={false}
            whileInView={
              effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="dot"></span> OBJECTS OF SOUND · COLLECTION 01
              </p>
              <h1>
                Less noise.
                <br />
                More <em>feeling.</em>
              </h1>
              <p className="intro">
                Extraordinary sound. Effortless presence.
                <br />
                Meet the speaker that feels as good as it sounds.
              </p>
              <motion.a
                className="button orange"
                href="#collection"
                whileHover={effects ? { scale: 1.04 } : undefined}
                whileTap={effects ? { scale: 0.97 } : undefined}
              >
                Discover Aura One <span>↗</span>
              </motion.a>
              <div className="hero-foot">
                <span className="small-orbit">◎</span>
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
                <div
                  className="speaker"
                  id="speaker"
                  style={{ transform: rotation }}
                >
                  <div className="speaker-top">
                    <span>−</span>
                    <span>○</span>
                    <span>+</span>
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
                  <motion.button
                    data-finish="sand"
                    aria-label="Sand finish"
                    className={
                      "swatch " + (finish === "sand" ? " selected" : "")
                    }
                    aria-pressed={finish === "sand"}
                    onClick={() => setFinish("sand")}
                    whileHover={effects ? { scale: 1.04 } : undefined}
                    whileTap={effects ? { scale: 0.97 } : undefined}
                  ></motion.button>
                  <motion.button
                    data-finish="charcoal"
                    aria-label="Charcoal finish"
                    className={
                      "swatch charcoal" +
                      (finish === "charcoal" ? " selected" : "")
                    }
                    aria-pressed={finish === "charcoal"}
                    onClick={() => setFinish("charcoal")}
                    whileHover={effects ? { scale: 1.04 } : undefined}
                    whileTap={effects ? { scale: 0.97 } : undefined}
                  ></motion.button>
                  <motion.button
                    data-finish="clay"
                    aria-label="Clay finish"
                    className={
                      "swatch clay" + (finish === "clay" ? " selected" : "")
                    }
                    aria-pressed={finish === "clay"}
                    onClick={() => setFinish("clay")}
                    whileHover={effects ? { scale: 1.04 } : undefined}
                    whileTap={effects ? { scale: 0.97 } : undefined}
                  ></motion.button>
                  <span id="finishLabel">{finishLabel}</span>
                </div>
                <motion.button
                  className="motion"
                  id="motion"
                  onClick={() => setPaused((v) => !v)}
                  aria-pressed={paused}
                  whileHover={effects ? { scale: 1.04 } : undefined}
                  whileTap={effects ? { scale: 0.97 } : undefined}
                >
                  {paused ? "▷ Resume motion" : "Ⅱ Pause motion"}
                </motion.button>
              </div>
            </div>
          </motion.section>
          <div className="ticker">
            <span>SCULPTURAL BY DESIGN</span>
            <i>✳</i>
            <span>IMMERSIVE BY NATURE</span>
            <i>✳</i>
            <span>EVERYDAY, ELEVATED</span>
            <i>✳</i>
            <span>SOUND WITH SOUL</span>
          </div>
          <motion.section
            className="collection section"
            id="collection"
            initial={false}
            whileInView={
              effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-head">
              <div>
                <p className="eyebrow">01 / THE COLLECTION</p>
                <h2>A place for every sound.</h2>
              </div>
              <p>
                From your quiet corner to the whole room.
                <br />
                Find your kind of listening.
              </p>
            </div>
            <div className="products">
              <motion.article
                className="product"
                initial={false}
                whileInView={
                  effects
                    ? { opacity: [0, 1], y: [32, 0] }
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.7 }}
              >
                <div className="product-art sand-art">
                  <span className="tag">THE EVERYDAY ICON</span>
                  <div className="mini-speaker">
                    <span>aura</span>
                  </div>
                  <motion.button
                    className="plus"
                    data-product="One"
                    aria-label="Explore Aura One"
                    onClick={() => {
                      setProduct("One");
                      setDialog("product");
                    }}
                    whileHover={effects ? { scale: 1.04 } : undefined}
                    whileTap={effects ? { scale: 0.97 } : undefined}
                  >
                    ↗
                  </motion.button>
                </div>
                <div className="product-info">
                  <div>
                    <h3>Aura One</h3>
                    <p>Your room. Reimagined.</p>
                  </div>
                  <span>$249</span>
                </div>
              </motion.article>
              <motion.article
                className="product"
                initial={false}
                whileInView={
                  effects
                    ? { opacity: [0, 1], y: [32, 0] }
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.7 }}
              >
                <div className="product-art dark-art">
                  <span className="tag">TAKE YOUR SOUND</span>
                  <div className="mini-speaker portable">
                    <span>aura</span>
                  </div>
                  <motion.button
                    className="plus"
                    data-product="Go"
                    aria-label="Explore Aura Go"
                    onClick={() => {
                      setProduct("Go");
                      setDialog("product");
                    }}
                    whileHover={effects ? { scale: 1.04 } : undefined}
                    whileTap={effects ? { scale: 0.97 } : undefined}
                  >
                    ↗
                  </motion.button>
                </div>
                <div className="product-info">
                  <div>
                    <h3>Aura Go</h3>
                    <p>Good company, anywhere.</p>
                  </div>
                  <span>$149</span>
                </div>
              </motion.article>
              <motion.article
                className="product"
                initial={false}
                whileInView={
                  effects
                    ? { opacity: [0, 1], y: [32, 0] }
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.7 }}
              >
                <div className="product-art clay-art">
                  <span className="tag">A FULLER FEELING</span>
                  <div className="mini-speaker wide">
                    <span>aura</span>
                  </div>
                  <motion.button
                    className="plus"
                    data-product="Studio"
                    aria-label="Explore Aura Studio"
                    onClick={() => {
                      setProduct("Studio");
                      setDialog("product");
                    }}
                    whileHover={effects ? { scale: 1.04 } : undefined}
                    whileTap={effects ? { scale: 0.97 } : undefined}
                  >
                    ↗
                  </motion.button>
                </div>
                <div className="product-info">
                  <div>
                    <h3>Aura Studio</h3>
                    <p>Let the whole room listen.</p>
                  </div>
                  <span>$449</span>
                </div>
              </motion.article>
            </div>
          </motion.section>
          <motion.section
            className="philosophy"
            id="philosophy"
            initial={false}
            whileInView={
              effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7 }}
          >
            <div className="sound-art" aria-hidden="true">
              <div className="sound-ring r1"></div>
              <div className="sound-ring r2"></div>
              <div className="sound-ring r3"></div>
              <div className="sound-ring r4"></div>
              <div className="sound-core">a.</div>
              <span>FORM FOLLOWS FEELING.</span>
            </div>
            <div className="philosophy-copy">
              <p className="eyebrow">02 / OUR PHILOSOPHY</p>
              <h2>
                Not just in your room.
                <br />
                <em>Part of it.</em>
              </h2>
              <p>
                We believe the things you live with should bring something to
                your everyday. A little warmth. A moment of connection. A song
                that makes you stay a little longer.
              </p>
              <p>
                Aura explores a quieter approach to audio: considered shapes,
                tactile finishes, and nothing that gets between you and the
                music.
              </p>
              <a className="text-link" href="#details">
                A closer look <span>↗</span>
              </a>
            </div>
          </motion.section>
          <motion.section
            className="section details"
            id="details"
            initial={false}
            whileInView={
              effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-head">
              <div>
                <p className="eyebrow">03 / CONSIDERED IN EVERY DETAIL</p>
                <h2>
                  Beautiful outside.
                  <br />
                  Wonderful within.
                </h2>
              </div>
              <p>
                A concept built around simple pleasures.
                <br />
                Explore the imagined product specifications.
              </p>
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
                <span className="feature-icon">◎</span>
                <h3>Room-filling sound</h3>
                <p>
                  A 360° acoustic concept that puts you in the sweet spot,
                  wherever you sit.
                </p>
              </article>
              <article>
                <span className="feature-icon">⌁</span>
                <h3>Connection, simplified</h3>
                <p>
                  Imagined with Bluetooth and Wi-Fi for a seamless move from
                  quiet mornings to late nights.
                </p>
              </article>
              <article>
                <span className="feature-icon">◒</span>
                <h3>Materials that matter</h3>
                <p>
                  A tactile woven shell and soft-touch top, envisioned in three
                  earth-inspired finishes.
                </p>
              </article>
            </motion.div>
            <details>
              <summary>
                Compare the collection <span>+</span>
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
          </motion.section>
          <motion.section
            className="listening section"
            id="listening"
            initial={false}
            whileInView={
              effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-head">
              <div>
                <p className="eyebrow">04 / FIND YOUR RHYTHM</p>
                <h2>
                  One space.
                  <br />A thousand moods.
                </h2>
              </div>
              <p>
                Set the scene. Let the day slow down.
                <br />
                Explore three ways to make room for music.
              </p>
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
                  <motion.button
                    data-mood="morning"
                    aria-pressed={mood === "morning"}
                    onClick={() => setMood("morning")}
                    whileHover={effects ? { scale: 1.04 } : undefined}
                    whileTap={effects ? { scale: 0.97 } : undefined}
                  >
                    01 / Slow mornings <span>↗</span>
                  </motion.button>
                  <motion.button
                    data-mood="focus"
                    aria-pressed={mood === "focus"}
                    onClick={() => setMood("focus")}
                    whileHover={effects ? { scale: 1.04 } : undefined}
                    whileTap={effects ? { scale: 0.97 } : undefined}
                  >
                    02 / Find your focus <span>↗</span>
                  </motion.button>
                  <motion.button
                    data-mood="evening"
                    aria-pressed={mood === "evening"}
                    onClick={() => setMood("evening")}
                    whileHover={effects ? { scale: 1.04 } : undefined}
                    whileTap={effects ? { scale: 0.97 } : undefined}
                  >
                    03 / After hours <span>↗</span>
                  </motion.button>
                </div>
                <p id="moodCopy" aria-live="polite">
                  {moods[mood][1]}
                </p>
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
          </motion.section>
          <motion.section
            className="craft section"
            initial={false}
            whileInView={
              effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow">05 / THE ART OF LESS</p>
            <div className="craft-heading">
              <h2>
                Good design is felt.
                <br />
                <em>In every little detail.</em>
              </h2>
              <span className="craft-mark" aria-hidden="true">
                ✳
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
              <article>
                <span>01</span>
                <h3>A softer silhouette.</h3>
                <p>
                  Rounded edges and balanced proportions give technology a more
                  human presence.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Texture with intention.</h3>
                <p>
                  A woven surface brings visual warmth to shelves, desks and
                  quiet corners.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>Only what you need.</h3>
                <p>
                  Simple controls. Considered details. More space for the music,
                  less for everything else.
                </p>
              </article>
            </motion.div>
          </motion.section>
          <motion.section
            className="section questions"
            initial={false}
            whileInView={
              effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <p className="eyebrow">06 / A LITTLE MORE CLARITY</p>
              <h2>Good questions.</h2>
            </div>
            <div>
              <details>
                <summary>
                  Can I buy an Aura speaker?<span>+</span>
                </summary>
                <p>
                  Aura is an independent portfolio concept by Junaid Ali. These
                  products are not for sale; the selection flow demonstrates a
                  possible shopping experience.
                </p>
              </details>
              <details>
                <summary>
                  Can this experience be made for my business?<span>+</span>
                </summary>
                <p>
                  Yes. The visual direction can be adapted to your real
                  products, branding and customer journey, with enquiries or a
                  full shopping experience depending on your needs.
                </p>
              </details>
              <details>
                <summary>
                  How do I explore the finishes?<span>+</span>
                </summary>
                <p>
                  Use the Sand, Charcoal and Clay controls in the hero. On a
                  desktop, move your pointer over the speaker to explore its
                  depth. Use Pause motion for a calmer experience.
                </p>
              </details>
            </div>
          </motion.section>
          <motion.section
            className="closing"
            initial={false}
            whileInView={
              effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow">MAKE ROOM FOR SOMETHING GOOD.</p>
            <h2>Find your frequency.</h2>
            <motion.button
              className="button"
              data-product="One"
              onClick={() => {
                setProduct("One");
                setDialog("product");
              }}
              whileHover={effects ? { scale: 1.04 } : undefined}
              whileTap={effects ? { scale: 0.97 } : undefined}
            >
              Explore your Aura <span>↗</span>
            </motion.button>
          </motion.section>
        </main>
        <footer>
          <a className="logo" href="#">
            aura<span>®</span>
          </a>
          <p>Sound, beautifully considered.</p>
          <div>
            <span>Independent concept · No products for sale</span>
            <a
              href="https://junaidaly.vercel.app"
              target="_blank"
              rel="noopener"
            >
              Designed & built by Junaid Ali ↗
            </a>
          </div>
        </footer>
        <ProductDialog
          kind={dialog}
          onClose={() => setDialog(null)}
          product={product}
          data={products[product]}
          finish={selectedFinish}
          selection={selection}
          products={products}
          onAdd={add}
          onRemove={(id) => setSelection((s) => s.filter((x) => x.id !== id))}
          effects={effects}
        />
        <div className={"toast" + (notice ? " show" : "")} role="status">
          {notice}
        </div>
        <Cursor enabled={effects} />
      </div>
    </MotionConfig>
  );
}
