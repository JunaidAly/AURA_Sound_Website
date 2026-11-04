"use client";
import { Button } from "./ui/Button";
import { Typography } from "./ui/Typography";
import { Icon } from "./ui/Icon";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
export default function ProductDialog({
  kind,
  onClose,
  product,
  data,
  finish,
  selection,
  products,
  onAdd,
  onRemove,
  effects,
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (kind) {
      el.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        el.close();
        document.body.style.overflow = previous;
      };
    }
  }, [kind]);
  return (
    <dialog
      ref={ref}
      id={kind === "product" ? "productDialog" : "selectionDialog"}
      aria-labelledby="dialogTitle"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <motion.div
        key={kind + product}
        initial={effects ? { opacity: 0, y: 15 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Button className="close" onClick={onClose} aria-label="Close dialog">
          <Icon name="close" />
        </Button>
        {kind === "product" ? (
          <>
            <Typography variant="eyebrow">YOUR EVERYDAY, ELEVATED</Typography>
            <Typography as="h2" variant="heading" id="dialogTitle">
              Aura {product}
            </Typography>
            <Typography>{data.desc}</Typography>
            <div className="dialog-visual">
              <div
                className={
                  "mini-speaker " +
                  (product === "Go"
                    ? "portable"
                    : product === "Studio"
                      ? "wide"
                      : "")
                }
              >
                <span>aura</span>
              </div>
            </div>
            <div className="dialog-row">
              <span>{finish} finish</span>
              <strong>${data.price}</strong>
            </div>
            <Button
              className="button orange"
              onClick={onAdd}
              whileTap={effects ? { scale: 0.97 } : undefined}
            >
              Add to selection{" "}
              <span>
                <Icon name="plus" />
              </span>
            </Button>
            <Typography className="demo-note">
              Portfolio concept. This saves a selection in this browser session;
              no payment or order is placed.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="eyebrow">YOUR CURATED COLLECTION</Typography>
            <Typography as="h2" variant="heading" id="dialogTitle">
              Your selection.
            </Typography>
            {selection.length ? (
              selection.map((item) => (
                <div className="selection-item" key={item.id}>
                  <span>
                    Aura {item.model} · {item.finish} finish · $
                    {products[item.model].price}
                  </span>
                  <Button
                    onClick={() => onRemove(item.id)}
                    aria-label={"Remove Aura " + item.model}
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <Typography>
                Your collection is waiting. Explore the speakers to add a
                favourite.
              </Typography>
            )}
            <Typography className="demo-note">
              Demonstration only. Products, prices and specifications are
              fictional.
            </Typography>
            <Button
              className="button orange"
              id="continue"
              onClick={() => {
                onClose();
                document
                  .querySelector("#collection")
                  .scrollIntoView({ behavior: effects ? "smooth" : "instant" });
              }}
            >
              Continue exploring <Icon name="arrow" />
            </Button>
          </>
        )}
      </motion.div>
    </dialog>
  );
}
