"use client";
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
        <button className="close" onClick={onClose} aria-label="Close dialog">
          ×
        </button>
        {kind === "product" ? (
          <>
            <p className="eyebrow">YOUR EVERYDAY, ELEVATED</p>
            <h2 id="dialogTitle">Aura {product}</h2>
            <p>{data.desc}</p>
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
            <motion.button
              className="button orange"
              onClick={onAdd}
              whileTap={effects ? { scale: 0.97 } : undefined}
            >
              Add to selection <span>+</span>
            </motion.button>
            <p className="demo-note">
              Portfolio concept. This saves a selection in this browser session;
              no payment or order is placed.
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow">YOUR CURATED COLLECTION</p>
            <h2 id="dialogTitle">Your selection.</h2>
            {selection.length ? (
              selection.map((item) => (
                <div className="selection-item" key={item.id}>
                  <span>
                    Aura {item.model} · {item.finish} finish · $
                    {products[item.model].price}
                  </span>
                  <button
                    onClick={() => onRemove(item.id)}
                    aria-label={"Remove Aura " + item.model}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>
                Your collection is waiting. Explore the speakers to add a
                favourite.
              </p>
            )}
            <p className="demo-note">
              Demonstration only. Products, prices and specifications are
              fictional.
            </p>
            <button
              className="button orange"
              id="continue"
              onClick={() => {
                onClose();
                document
                  .querySelector("#collection")
                  .scrollIntoView({ behavior: effects ? "smooth" : "instant" });
              }}
            >
              Continue exploring ↗
            </button>
          </>
        )}
      </motion.div>
    </dialog>
  );
}
