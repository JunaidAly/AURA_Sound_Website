"use client";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Icon } from "../ui/Icon";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
export default function Collection({
  product,
  setProduct,
  setDialog,
  effects,
}) {
  return (
    <Section className="collection section" id="collection" effects={effects}>
      <div className="section-head">
        <div>
          <Typography variant="eyebrow">01 / THE COLLECTION</Typography>
          <Typography as="h2" variant="heading">
            A place for every sound.
          </Typography>
        </div>
        <Typography>
          From your quiet corner to the whole room.
          <br />
          Find your kind of listening.
        </Typography>
      </div>
      <div className="products">
        <motion.article
          className="product"
          initial={false}
          whileInView={
            effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7 }}
        >
          <div className="product-art sand-art">
            <span className="tag">THE EVERYDAY ICON</span>
            <div className="mini-speaker">
              <span>aura</span>
            </div>
            <Button
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
              <Icon name="arrow" />
            </Button>
          </div>
          <div className="product-info">
            <div>
              <Typography as="h3" variant="title">
                Aura One
              </Typography>
              <Typography>Your room. Reimagined.</Typography>
            </div>
            <span>$249</span>
          </div>
        </motion.article>
        <motion.article
          className="product"
          initial={false}
          whileInView={
            effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7 }}
        >
          <div className="product-art dark-art">
            <span className="tag">TAKE YOUR SOUND</span>
            <div className="mini-speaker portable">
              <span>aura</span>
            </div>
            <Button
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
              <Icon name="arrow" />
            </Button>
          </div>
          <div className="product-info">
            <div>
              <Typography as="h3" variant="title">
                Aura Go
              </Typography>
              <Typography>Good company, anywhere.</Typography>
            </div>
            <span>$149</span>
          </div>
        </motion.article>
        <motion.article
          className="product"
          initial={false}
          whileInView={
            effects ? { opacity: [0, 1], y: [32, 0] } : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7 }}
        >
          <div className="product-art clay-art">
            <span className="tag">A FULLER FEELING</span>
            <div className="mini-speaker wide">
              <span>aura</span>
            </div>
            <Button
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
              <Icon name="arrow" />
            </Button>
          </div>
          <div className="product-info">
            <div>
              <Typography as="h3" variant="title">
                Aura Studio
              </Typography>
              <Typography>Let the whole room listen.</Typography>
            </div>
            <span>$449</span>
          </div>
        </motion.article>
      </div>
    </Section>
  );
}
