"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";

/** Procedural, closed 3D enclosure: every face exists, including the rear I/O panel. */
export default function Speaker3D({ progress, finish, enabled }) {
  const host = useRef(null);
  const settings = useRef({ finish, enabled });
  const manual = useRef(null);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    settings.current = { finish, enabled };
  }, [finish, enabled]);
  useEffect(() => {
    let disposed = false,
      cleanup = () => {};
    async function mount() {
      const THREE = await import("three");
      const { RoundedBoxGeometry } =
        await import("three/addons/geometries/RoundedBoxGeometry.js");
      if (disposed || !host.current) return;
      const node = host.current;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
      } catch {
        setStatus("fallback");
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      node.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
      camera.position.set(0, 0.25, 7.7);
      camera.lookAt(0, 0, 0);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x6c6558, 2.2));
      const key = new THREE.DirectionalLight(0xfff4df, 3.3);
      key.position.set(-3, 5, 5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 2);
      fill.position.set(4, 2, -4);
      scene.add(fill);
      const model = new THREE.Group();
      scene.add(model);
      const textures = [];
      function texture(draw, w = 512, h = 256) {
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        draw(canvas.getContext("2d"), w, h);
        const t = new THREE.CanvasTexture(canvas);
        t.colorSpace = THREE.SRGBColorSpace;
        textures.push(t);
        return t;
      }
      const weave = texture(
        (c, w, h) => {
          c.fillStyle = "#c9c6bc";
          c.fillRect(0, 0, w, h);
          for (let i = 0; i < w; i += 8) {
            c.fillStyle = "#8c897e";
            c.fillRect(i, 0, 2, h);
            c.fillStyle = "#e4e1d7";
            c.fillRect(i + 3, 0, 2, h);
          }
          for (let j = 0; j < h; j += 8) {
            c.fillStyle = "rgba(50,45,35,.3)";
            c.fillRect(0, j, w, 2);
            c.fillStyle = "rgba(255,255,255,.3)";
            c.fillRect(0, j + 3, w, 2);
          }
        },
        512,
        512,
      );
      weave.wrapS = weave.wrapT = THREE.RepeatWrapping;
      weave.repeat.set(2, 2);
      weave.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const cloth = new THREE.MeshStandardMaterial({
        color: 0xd6cbb2,
        map: weave,
        bumpMap: weave,
        bumpScale: 0.018,
        roughness: 0.94,
      });
      const shell = new THREE.MeshStandardMaterial({
        color: 0xb7ad96,
        roughness: 0.55,
        metalness: 0.12,
      });
      const dark = new THREE.MeshStandardMaterial({
        color: 0x262822,
        roughness: 0.7,
      });
      const metal = new THREE.MeshStandardMaterial({
        color: 0x96978c,
        roughness: 0.3,
        metalness: 0.75,
      });
      function box(w, h, d, r, mat, x = 0, y = 0, z = 0) {
        const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, r), mat);
        mesh.position.set(x, y, z);
        model.add(mesh);
        return mesh;
      }
      box(2.05, 2.85, 1.16, 0.23, cloth);
      box(1.88, 0.1, 1.01, 0.045, shell, 0, 1.4, 0);
      box(1.8, 0.09, 0.91, 0.04, dark, 0, -1.43, 0);
      box(1.62, 2.37, 0.09, 0.14, shell, 0, 0, -0.577);
      // Rear recessed service panel, USB-C socket, power input and pairing button.
      box(1.25, 0.46, 0.055, 0.07, dark, 0, -0.83, -0.64);
      box(0.29, 0.105, 0.035, 0.04, metal, -0.3, -0.83, -0.68);
      box(0.23, 0.058, 0.04, 0.02, dark, -0.3, -0.83, -0.7);
      const socket = new THREE.Mesh(
        new THREE.CylinderGeometry(0.075, 0.075, 0.04, 24),
        metal,
      );
      socket.rotation.x = Math.PI / 2;
      socket.position.set(0.15, -0.83, -0.69);
      model.add(socket);
      const hole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.043, 0.043, 0.045, 20),
        dark,
      );
      hole.rotation.x = Math.PI / 2;
      hole.position.set(0.15, -0.83, -0.715);
      model.add(hole);
      box(0.1, 0.1, 0.035, 0.04, metal, 0.43, -0.83, -0.69);
      function label(text, w, h, x, y, z, back = false) {
        const map = texture((c, cw, ch) => {
          c.fillStyle = "#f7f4eb";
          c.font = `500 ${Math.floor(ch * 0.56)}px Arial`;
          c.textAlign = "center";
          c.textBaseline = "middle";
          c.fillText(text, cw / 2, ch / 2);
        });
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({
            map,
            transparent: true,
            depthWrite: false,
          }),
        );
        m.position.set(x, y, z);
        if (back) m.rotation.y = Math.PI;
        model.add(m);
        return m;
      }
      label("aura", 0.5, 0.2, 0, -0.92, 0.588);
      label("A U R A   O N E", 0.77, 0.14, 0, 0.66, -0.63, true);
      label("DESIGNED TO BELONG", 0.92, 0.09, 0, 0.43, -0.63, true);
      label("USB-C     POWER    PAIR", 0.98, 0.08, 0, -1.18, -0.63, true);
      box(
        0.12,
        0.023,
        0.015,
        0.007,
        new THREE.MeshBasicMaterial({ color: 0xffe4ad }),
        0,
        -1.12,
        0.589,
      );
      [-0.48, 0, 0.48].forEach((x, i) => {
        const b = new THREE.Mesh(
          new THREE.CylinderGeometry(0.13, 0.13, 0.027, 32),
          shell,
        );
        b.position.set(x, 1.47, 0);
        model.add(b);
        const icon = label(["−", "○", "+"][i], 0.13, 0.13, x, 1.486, 0);
        icon.rotation.x = -Math.PI / 2;
      });
      // Rear ventilation slots are solid geometry rather than a flat back image.
      for (let i = 0; i < 7; i++)
        box(0.82, 0.025, 0.015, 0.01, dark, 0, -0.05 - i * 0.075, -0.633);
      const resize = () => {
        const { width, height } = node.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.position.z = camera.aspect < 0.8 ? 9 : 7.7;
        camera.updateProjectionMatrix();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(node);
      resize();
      let visible = true,
        frame = 0,
        last = 0,
        angle = -0.45,
        p = progress.get();
      const visibility = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
      });
      visibility.observe(node);
      const unsubscribe = progress.on("change", () => {
        manual.current = null;
      });
      let previousFinish;
      const draw = (time) => {
        frame = requestAnimationFrame(draw);
        if (!visible || document.hidden) {
          last = time;
          return;
        }
        const dt = Math.min((time - last) / 1000, 0.05);
        last = time;
        const config = settings.current;
        if (previousFinish !== config.finish) {
          // CSS owns the finish palette, including the physical material colors.
          const css = getComputedStyle(node);
          cloth.color.set(css.getPropertyValue("--model-cloth").trim());
          shell.color.set(css.getPropertyValue("--model-shell").trim());
          previousFinish = config.finish;
        }
        p +=
          ((config.enabled ? progress.get() : p) - p) * (1 - Math.exp(-9 * dt));
        const target = manual.current ?? (config.enabled ? -0.45 + p * Math.PI * 2 : angle);
        angle +=
          (target - angle) * (config.enabled ? 1 - Math.exp(-12 * dt) : 1);
        model.rotation.set(
          -0.12 - Math.sin(p * Math.PI) * 0.12,
          angle,
          0.035 * Math.cos(p * Math.PI),
        );
        model.position.y = 0.07 * Math.sin(p * Math.PI);
        const scale = 1 + Math.sin(p * Math.PI) * 0.035;
        model.scale.setScalar(scale);
        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(draw);
      setStatus("ready");
      const lost = (e) => {
        e.preventDefault();
        setStatus("fallback");
      };
      renderer.domElement.addEventListener("webglcontextlost", lost);
      cleanup = () => {
        cancelAnimationFrame(frame);
        unsubscribe();
        observer.disconnect();
        visibility.disconnect();
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        scene.traverse((o) => {
          if (o.isMesh) {
            o.geometry.dispose();
            (Array.isArray(o.material) ? o.material : [o.material]).forEach(
              (m) => m.dispose(),
            );
          }
        });
        textures.forEach((t) => t.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    }
    mount().catch(() => {
      if (!disposed) setStatus("fallback");
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [progress]);
  return (
    <>
      <div
        className="speaker-webgl"
        ref={host}
        data-status={status}
        role="img"
        aria-label={`Aura One in ${finish}: fully modeled fabric enclosure, top controls and rear connection panel`}
      />
      {status !== "ready" && (
        <div className="speaker-fallback" aria-live="polite">
          <div className="mini-speaker">
            <span>aura</span>
          </div>
          <small>
            {status === "loading"
              ? "Preparing your 3D view…"
              : "Product preview · 3D unavailable on this device"}
          </small>
        </div>
      )}
      <div className="model-views" aria-label="Product viewing angle">
        <Button
          disabled={status !== "ready"}
          onClick={() => {
            manual.current = -0.45;
          }}
        >
          Front
        </Button>
        <span>/</span>
        <Button
          disabled={status !== "ready"}
          onClick={() => {
            manual.current = Math.PI;
          }}
        >
          Back
        </Button>
      </div>
    </>
  );
}
