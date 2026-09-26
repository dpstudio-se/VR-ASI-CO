import { useEffect, useRef } from "react";
import portrait from "@/lib/upi/e8-portrait.json";
import { cn } from "@/lib/utils";

type Portrait = { points: number[][]; edges: number[][] };

const DATA = portrait as Portrait;

const LABELS = [
  { t: "E8 lattice", s: "240 roots", x: 0.28, y: 0.18 },
  { t: "Leech lattice Λ24", s: "even unimodular in 24d", x: 0.72, y: 0.2 },
  { t: "Golay G24,12,8", s: "self-healing grid", x: 0.24, y: 0.78 },
  { t: "Syndrome repair", s: "corrects 3 bit flips", x: 0.74, y: 0.74 },
] as const;

export function E8Portrait({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gold = "#c4a574";
    const cyan = "#8aa4b8";
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let start = performance.now();
    let live = true;

    const draw = (now: number) => {
      if (!live) return;
      const parent = canvas.parentElement;
      const cssW = parent?.clientWidth ?? 640;
      const cssH = Math.max(320, Math.round(cssW * 0.62));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        canvas.style.width = `${cssW}px`;
        canvas.style.height = `${cssH}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const theta = reduced ? 0 : ((now - start) / 48000) * Math.PI * 2;
      const c = Math.cos(theta);
      const s = Math.sin(theta);
      const cx = cssW / 2;
      const cy = cssH * 0.5;
      const scale = Math.min(cssW, cssH) * 0.42;

      const pts = DATA.points.map(([x, y]) => {
        const xr = x * c - y * s;
        const yr = x * s + y * c;
        return { x: cx + xr * scale, y: cy + yr * scale };
      });

      ctx.lineWidth = 0.85;
      ctx.strokeStyle = "rgba(196,165,116,0.32)";
      ctx.beginPath();
      for (const [a, b] of DATA.edges) {
        const p = pts[a];
        const q = pts[b];
        if (!p || !q) continue;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
      }
      ctx.stroke();

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]!;
        const r = 1.45 + (i % 7 === 0 ? 1.1 : 0);
        ctx.beginPath();
        ctx.fillStyle = i % 11 === 0 ? cyan : gold;
        ctx.globalAlpha = 0.9;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw(performance.now());
    const onResize = () => draw(performance.now());
    window.addEventListener("resize", onResize);
    return () => {
      live = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="block w-full"
        role="img"
        aria-label="Coxeter-plane projection of the 240 E8 roots, rotating slowly"
      />
      {LABELS.map((l) => (
        <p
          key={l.t}
          className="pointer-events-none absolute hidden max-w-40 text-right sm:block"
          style={{ left: `${l.x * 100}%`, top: `${l.y * 100}%`, transform: "translate(-50%, -50%)" }}
        >
          <span className="block font-mono text-xs uppercase tracking-widest text-hyp">{l.t}</span>
          <span className="block font-mono text-xs text-subtle">{l.s}</span>
        </p>
      ))}
    </div>
  );
}
