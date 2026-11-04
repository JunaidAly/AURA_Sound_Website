"use client";
import { motion, MotionConfig } from "framer-motion";
import { useShowroom } from "../hooks/useShowroom";
import { products } from "../data/catalog";
import ProductDialog from "./ProductDialog";
import Cursor from "./Cursor";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./sections/Hero";
import Collection from "./sections/Collection";
import Philosophy from "./sections/Philosophy";
import Details from "./sections/Details";
import Listening from "./sections/Listening";
import Craft from "./sections/Craft";
import Questions from "./sections/Questions";
import Closing from "./sections/Closing";
export default function Showroom() {
  const {
    finish,
    setFinish,
    mood,
    setMood,
    paused,
    setPaused,
    scrolled,
    rotation,
    setRotation,
    product,
    setProduct,
    dialog,
    setDialog,
    selection,
    setSelection,
    notice,
    effects,
    scrollYProgress,
    finishLabel,
    selectedFinish,
    rotateSpeaker,
    add,
  } = useShowroom();
  return (
    <MotionConfig reducedMotion={paused ? "always" : "user"}>
      <div className={paused ? "paused" : ""} data-finish={finish}>
        <motion.div
          className="scroll-meter"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header
          scrolled={scrolled}
          setDialog={setDialog}
          selection={selection}
          effects={effects}
        />
        <main id="main">
          <Hero
            finish={finish}
            setFinish={setFinish}
            paused={paused}
            setPaused={setPaused}
            rotation={rotation}
            setRotation={setRotation}
            effects={effects}
            finishLabel={finishLabel}
            rotateSpeaker={rotateSpeaker}
          />
          <div className="ticker">
            <span>SCULPTURAL BY DESIGN</span>
            <i>✳</i>
            <span>IMMERSIVE BY NATURE</span>
            <i>✳</i>
            <span>EVERYDAY, ELEVATED</span>
            <i>✳</i>
            <span>SOUND WITH SOUL</span>
          </div>
          <Collection
            product={product}
            setProduct={setProduct}
            setDialog={setDialog}
            effects={effects}
          />
          <Philosophy effects={effects} />
          <Details product={product} effects={effects} />
          <Listening mood={mood} setMood={setMood} effects={effects} />
          <Craft effects={effects} />
          <Questions selection={selection} effects={effects} />
          <Closing
            product={product}
            setProduct={setProduct}
            setDialog={setDialog}
            effects={effects}
          />
        </main>
        <Footer />
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
