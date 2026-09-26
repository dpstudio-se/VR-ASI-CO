import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/status-badge";
import {
  ADS,
  brownHenneauxC,
  cis,
  clampOpening,
  cftIntervalEntropy,
  geodesicOnCutoff,
  ryuTakayanagi,
  sampleGeodesic,
  wrapPi,
  type Pt,
} from "@/lib/upi/ads";

function token(el: Element, name: string, fallback: string) {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || fallback;
}

export function AdsPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mu, setMu] = useState(-0.35);
  const [phi, setPhi] = useState(1.35);
  const dragRef = useRef<null | "a" | "b" | "body">(null);
  const sliderId = useId();

  const a = mu - phi / 2;
  const b = mu + phi / 2;
  const geo = geodesicOnCutoff(a, b);
  const sRt = ryuTakayanagi(geo.length);
  const sCft = cftIntervalEntropy(phi);
  const c = brownHenneauxC();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let live = true;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      if (!live) return;
      const parent = canvas.parentElement;
      const cssW = parent?.clientWidth ?? 640;
      const cssH = Math.max(340, Math.round(Math.min(cssW, 720) * 0.78));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        canvas.style.width = `${cssW}px`;
        canvas.style.height = `${cssH}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const gold = token(canvas, "--color-hyp", "#c4a574");
      const cyan = token(canvas, "--color-der", "#8aa4b8");
      const fg = token(canvas, "--color-fg", "#eceae4");
      const muted = token(canvas, "--color-subtle", "#5e636c");

      const cx = cssW / 2;
      const cy = cssH / 2;
      const R = Math.min(cssW, cssH) * 0.42;

      const toPix = (p: Pt): Pt => ({ x: cx + p.x * R, y: cy - p.y * R });

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(17,19,24,0.9)";
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      ctx.strokeStyle = muted;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (i / 5) * R, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (let k = 0; k < 8; k++) {
        const t = (k * Math.PI) / 8;
        const p = toPix(cis(t, 0.999));
        const q = toPix(cis(t + Math.PI, 0.999));
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const aa = mu - phi / 2;
      const bb = mu + phi / 2;
      ctx.beginPath();
      ctx.strokeStyle = cyan;
      ctx.lineWidth = 6;
      ctx.lineCap = "butt";
      ctx.arc(cx, cy, R - 1.5, -bb, -aa, false);
      ctx.stroke();

      const g = geodesicOnCutoff(aa, bb);
      const samples = sampleGeodesic(g, reduced ? 32 : 80).map(toPix);
      ctx.beginPath();
      ctx.strokeStyle = gold;
      ctx.lineWidth = 2.4;
      ctx.lineJoin = "round";
      samples.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();

      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = fg;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1.25;
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.setLineDash([3, 4]);
      ctx.arc(cx, cy, ADS.rho * R, 0, Math.PI * 2);
      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      for (const ang of [aa, bb]) {
        const p = toPix(cis(ang, 1));
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = gold;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = fg;
        ctx.stroke();
      }

      ctx.font = "12px 'IBM Plex Mono', monospace";
      ctx.fillStyle = muted;
      ctx.fillText("CFT  (boundary)", cx + R * 0.62, cy - R * 0.82);
      ctx.fillStyle = gold;
      ctx.fillText("bulk geodesic γ_A", cx - R * 0.92, cy + 8);
      ctx.fillStyle = cyan;
      ctx.fillText("region A", toPix(cis((aa + bb) / 2, 1.12)).x - 28, toPix(cis((aa + bb) / 2, 1.12)).y);
    };

    draw();
    const ro = new ResizeObserver(() => draw());
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    return () => {
      live = false;
      ro.disconnect();
    };
  }, [mu, phi]);

  function hitHandle(clientX: number, clientY: number): "a" | "b" | "body" | null {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const cssW = rect.width;
    const cssH = rect.height;
    const cx = cssW / 2;
    const cy = cssH / 2;
    const R = Math.min(cssW, cssH) * 0.42;
    const toPix = (p: Pt): Pt => ({ x: cx + p.x * R, y: cy - p.y * R });
    const pa = toPix(cis(a, 1));
    const pb = toPix(cis(b, 1));
    const da = Math.hypot(x - pa.x, y - pa.y);
    const db = Math.hypot(x - pb.x, y - pb.y);
    if (da < 22) return "a";
    if (db < 22) return "b";
    const nx = (x - cx) / R;
    const ny = (cy - y) / R;
    if (Math.hypot(nx, ny) < 1.08) return "body";
    return null;
  }

  function angleOf(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const rect = canvas.getBoundingClientRect();
    const cssW = rect.width;
    const cssH = rect.height;
    const cx = cssW / 2;
    const cy = cssH / 2;
    const R = Math.min(cssW, cssH) * 0.42;
    const nx = (clientX - rect.left - cx) / R;
    const ny = (cy - (clientY - rect.top)) / R;
    return Math.atan2(ny, nx);
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const which = hitHandle(e.clientX, e.clientY);
    if (!which) return;
    dragRef.current = which;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const which = dragRef.current;
    if (!which) return;
    const t = angleOf(e.clientX, e.clientY);
    if (which === "a") {
      const delta = wrapPi(b - t);
      const opening = clampOpening(Math.abs(delta));
      const sign = delta >= 0 ? 1 : -1;
      setPhi(opening);
      setMu(wrapPi(b - sign * opening / 2));
    } else if (which === "b") {
      const delta = wrapPi(t - a);
      const opening = clampOpening(Math.abs(delta));
      const sign = delta >= 0 ? 1 : -1;
      setPhi(opening);
      setMu(wrapPi(a + sign * opening / 2));
    } else {
      setMu(t);
    }
  }

  function onPointerUp() {
    dragRef.current = null;
  }

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
        AdS3 / CFT2 · verification_type: software_test
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h2 className="font-display text-3xl tracking-tight">Ryu–Takayanagi geodesic</h2>
        <StatusBadge status="DER" />
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Drag the handles on the conformal boundary. The bulk geodesic γ_A is the unique curve
        homologous to region A. Its hyperbolic length is the entanglement entropy of A — that is
        the dictionary, in AdS3.
      </p>

      <div className="mt-5 overflow-hidden rounded-xl bg-bg">
        <canvas
          ref={canvasRef}
          className="block w-full touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="img"
          aria-label="Poincaré disk with a Ryu-Takayanagi geodesic"
        />
      </div>

      <label className="mt-5 grid gap-2 text-sm font-medium" htmlFor={sliderId}>
        Boundary interval
        <input
          id={sliderId}
          type="range"
          min={0.28}
          max={2.9}
          step={0.01}
          value={phi}
          onChange={(e) => setPhi(Number(e.target.value))}
          className="upi-range h-11 w-full"
        />
      </label>

      <dl className="mt-5 grid gap-0 sm:grid-cols-2">
        {[
          ["Opening φ", `${phi.toFixed(3)} rad`],
          ["Hyperbolic length of γ_A", geo.length.toFixed(4)],
          ["S_RT = Length / 4G_N", sRt.toFixed(4)],
          ["S_CFT ≈ (c/3) ln((2/ε) sin(φ/2))", sCft.toFixed(4)],
          ["Brown–Henneaux c = 3L/(2G_N)", c.toFixed(2)],
          ["Cutoff ρ", ADS.rho.toFixed(2)],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 border-t border-border py-3">
            <dt className="text-xs text-muted">{k}</dt>
            <dd className="font-mono text-sm tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs text-muted">
        Pedagogical units L = 1, 4G_N = 1. S_RT and S_CFT share the same divergence structure; they
        need not print as equal at a finite cutoff. This is AdS3, not our sky.{" "}
        <Link
          to="/n/$slug"
          params={{ slug: "upi-theories-1-holography-ryu-takayanagi" }}
          className="text-fg underline-offset-2 hover:underline"
        >
          Open the RT record
        </Link>
        .
      </p>
    </div>
  );
}
