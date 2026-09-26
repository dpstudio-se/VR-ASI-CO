import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LocateFixed, Maximize2, Pause, Play, RotateCcw, Search, ZoomIn, ZoomOut } from "lucide-react";
import {
  domainLabel,
  getNodeByAddress,
  STATUSES,
  type Status,
  useLive,
} from "@/lib/upi";
import {
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
  RELATIONS,
  RELATION_COLOR,
  RELATION_COPY,
  STATUS_COLOR,
  edgeTips,
  incidentBridges,
  isRelation,
  layoutGraph,
  neighborAddresses,
  nodeRadius,
  shortTitle,
  wrapTitle,
  type GraphPoint,
  type Relation,
} from "@/lib/upi/graph";
import {
  DEFAULT_FORCE_PARAMS,
  FORCE_ALGOS,
  FORCE_COPY,
  createSim,
  kineticEnergy,
  livePoint,
  pinNode,
  reheat,
  settle,
  stepForce,
  unpinNode,
  type ForceAlgo,
  type ForceParams,
  type SimState,
} from "@/lib/upi/force";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type View = { x: number; y: number; k: number };

const IDENTITY: View = { x: 0, y: 0, k: 1 };
const EMPTY = new Set<string>();

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function fitPoints(pts: { x: number; y: number }[], pad = 64): View {
  if (!pts.length) return IDENTITY;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of pts) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  minX -= pad;
  minY -= pad;
  maxX += pad;
  maxY += pad;
  const bw = Math.max(maxX - minX, 80);
  const bh = Math.max(maxY - minY, 80);
  const k = clamp(Math.min(GRAPH_WIDTH / bw, GRAPH_HEIGHT / bh), 0.45, 2.6);
  return {
    k,
    x: (GRAPH_WIDTH - (minX + maxX) * k) / 2,
    y: (GRAPH_HEIGHT - (minY + maxY) * k) / 2,
  };
}

function clientToViewBox(svg: SVGSVGElement, clientX: number, clientY: number) {
  const rect = svg.getBoundingClientRect();
  const s = Math.min(rect.width / GRAPH_WIDTH, rect.height / GRAPH_HEIGHT);
  const ox = (rect.width - GRAPH_WIDTH * s) / 2;
  const oy = (rect.height - GRAPH_HEIGHT * s) / 2;
  return {
    s,
    vx: (clientX - rect.left - ox) / s,
    vy: (clientY - rect.top - oy) / s,
  };
}

function zoomAt(view: View, vx: number, vy: number, factor: number): View {
  const wx = (vx - view.x) / view.k;
  const wy = (vy - view.y) / view.k;
  const k = clamp(view.k * factor, 0.45, 3.4);
  return { k, x: vx - wx * k, y: vy - wy * k };
}

export function Constellation({
  className,
  focusSlug,
  onFocusSlug,
}: {
  className?: string;
  focusSlug?: string;
  onFocusSlug?: (slug: string | null) => void;
}) {
  const navigate = useNavigate();
  const CATALOG = useLive((s) => s.catalog);
  const layout = useMemo(
    () => layoutGraph(CATALOG.nodes, CATALOG.bridges),
    [CATALOG],
  );
  const [algo, setAlgo] = useState<ForceAlgo>("fruchterman");
  const [paused, setPaused] = useState(false);
  const [params, setParams] = useState<ForceParams>(DEFAULT_FORCE_PARAMS);
  const [frame, setFrame] = useState(0);
  const [view, setView] = useState<View>(IDENTITY);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "ALL">("ALL");
  const [relation, setRelation] = useState<Relation | "ALL">("ALL");
  const [showIsolated, setShowIsolated] = useState(true);
  const [box, setBox] = useState({ w: GRAPH_WIDTH, h: GRAPH_HEIGHT });

  const lastFittedSlug = useRef<string | undefined>(undefined);
  const svgRef = useRef<SVGSVGElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const simRef = useRef<SimState | null>(null);
  const paramsRef = useRef(params);
  const viewRef = useRef(view);
  const prevAlgo = useRef<ForceAlgo>("editorial");
  const nodeDragRef = useRef<{ id: string; moved: boolean } | null>(null);
  const dragRef = useRef<{
    pointers: Map<number, { x: number; y: number }>;
    last?: { x: number; y: number };
    pinch?: number;
    moved: boolean;
  }>({ pointers: new Map(), moved: false });

  paramsRef.current = params;
  viewRef.current = view;

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setBox({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setBox({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { vx, vy } = clientToViewBox(svg, e.clientX, e.clientY);
      const factor = Math.exp(-e.deltaY * 0.0016);
      setView((v) => zoomAt(v, vx, vy, factor));
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSelected(null);
      setHovered(null);
      lastFittedSlug.current = undefined;
      onFocusSlug?.(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onFocusSlug]);

  useEffect(() => {
    if (!simRef.current) {
      simRef.current = createSim(layout.points, CATALOG.bridges);
    }
    if (algo !== "editorial" && prevAlgo.current === "editorial") {
      simRef.current = createSim(layout.points, CATALOG.bridges);
      reheat(simRef.current, 1);
      setView(IDENTITY);
    } else if (algo !== "editorial" && prevAlgo.current !== algo) {
      reheat(simRef.current, 1);
    } else if (algo === "editorial") {
      setView(
        fitPoints(
          layout.points.filter((p) => p.degree > 0),
          92,
        ),
      );
    }
    prevAlgo.current = algo;
  }, [algo, layout.points]);

  useEffect(() => {
    if (algo === "editorial") return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduced ? 40 : 1200;
    const t = window.setTimeout(() => {
      const sim = simRef.current;
      if (!sim) return;
      setView(fitPoints(sim.nodes, 64));
    }, delay);
    return () => window.clearTimeout(t);
  }, [algo]);

  useEffect(() => {
    if (algo === "editorial" || paused) return;
    if (!simRef.current) simRef.current = createSim(layout.points, CATALOG.bridges);
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      settle(simRef.current, algo, paramsRef.current);
      setFrame((f) => f + 1);
      return;
    }
    let raf = 0;
    let live = true;
    const loop = () => {
      if (!live || !simRef.current) return;
      stepForce(simRef.current, algo, paramsRef.current);
      setFrame((f) => f + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      live = false;
      cancelAnimationFrame(raf);
    };
  }, [algo, paused, layout.points]);

  const q = query.trim().toLowerCase();

  const visible = useMemo(() => {
    return layout.points.filter((p) => {
      if (!showIsolated && p.degree === 0) return false;
      if (status !== "ALL" && p.node.status !== status) return false;
      if (q) {
        const hay = `${p.node.title} ${p.node.address} ${p.node.domain} ${p.node.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (relation !== "ALL") {
        const hit = CATALOG.bridges.some(
          (b) =>
            b.relation === relation && (b.source === p.node.address || b.target === p.node.address),
        );
        if (!hit && p.degree > 0) return false;
        if (p.degree === 0) return false;
      }
      return true;
    });
  }, [layout.points, showIsolated, status, q, relation]);

  const visibleSet = useMemo(
    () => new Set(visible.map((p) => p.node.address)),
    [visible],
  );

  const liveByAddress = useMemo(() => {
    void frame;
    const map = new Map<string, GraphPoint>();
    for (const p of layout.points) {
      map.set(p.node.address, livePoint(p, simRef.current, algo));
    }
    return map;
  }, [layout.points, algo, frame]);

  const visibleLive = useMemo(
    () => visible.map((p) => liveByAddress.get(p.node.address) ?? p),
    [visible, liveByAddress],
  );

  useEffect(() => {
    if (!focusSlug) return;
    const node = CATALOG.nodes.find((n) => n.slug === focusSlug);
    if (!node) return;
    setSelected(node.address);
    if (lastFittedSlug.current === focusSlug) return;
    lastFittedSlug.current = focusSlug;
    const nb = neighborAddresses(node.address);
    const pts = layout.points.filter(
      (p) => p.node.address === node.address || nb.has(p.node.address),
    );
    const self = layout.byAddress.get(node.address);
    setView(fitPoints(pts.length ? pts : self ? [self] : layout.points, 90));
  }, [focusSlug, layout]);

  function selectAddress(address: string | null) {
    setSelected(address);
    const slug = address ? (getNodeByAddress(address)?.slug ?? null) : null;
    lastFittedSlug.current = slug ?? undefined;
    onFocusSlug?.(slug);
    if (address && box.w < 560) {
      requestAnimationFrame(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        asideRef.current?.scrollIntoView({
          block: "nearest",
          behavior: reduced ? "auto" : "smooth",
        });
      });
    }
  }

  const focus = hovered ?? selected;
  const neighborhood = useMemo(
    () => (focus ? neighborAddresses(focus) : EMPTY),
    [focus],
  );

  const inspectAddr = selected ?? hovered;
  const inspect = inspectAddr ? layout.byAddress.get(inspectAddr)?.node : undefined;
  const inspectBridges = inspect ? incidentBridges(inspect.address) : [];

  function litNode(addr: string) {
    if (!focus) return true;
    return addr === focus || neighborhood.has(addr);
  }

  function worldToPixel(x: number, y: number) {
    const s = Math.min(box.w / GRAPH_WIDTH, box.h / GRAPH_HEIGHT);
    const ox = (box.w - GRAPH_WIDTH * s) / 2;
    const oy = (box.h - GRAPH_HEIGHT * s) / 2;
    return {
      left: ox + (view.x + x * view.k) * s,
      top: oy + (view.y + y * view.k) * s,
    };
  }

  function worldFromClient(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return null;
    const { vx, vy } = clientToViewBox(svg, clientX, clientY);
    const v = viewRef.current;
    return { x: (vx - v.x) / v.k, y: (vy - v.y) / v.k };
  }

  function onNodePointerDown(address: string, ev: React.PointerEvent<SVGCircleElement>) {
    ev.stopPropagation();
    ev.currentTarget.setPointerCapture(ev.pointerId);
    nodeDragRef.current = { id: address, moved: false };
    if (algo !== "editorial" && simRef.current) {
      const w = worldFromClient(ev.clientX, ev.clientY);
      if (w) pinNode(simRef.current, address, w.x, w.y);
    }
  }

  function onNodePointerMove(address: string, ev: React.PointerEvent<SVGCircleElement>) {
    const drag = nodeDragRef.current;
    if (!drag || drag.id !== address) return;
    const w = worldFromClient(ev.clientX, ev.clientY);
    if (!w || !simRef.current || algo === "editorial") return;
    pinNode(simRef.current, address, w.x, w.y);
    reheat(simRef.current, 0.55);
    drag.moved = true;
    setFrame((f) => f + 1);
  }

  function onNodePointerUp(address: string, ev: React.PointerEvent<SVGCircleElement>) {
    ev.stopPropagation();
    const drag = nodeDragRef.current;
    if (simRef.current) unpinNode(simRef.current, address);
    const moved = Boolean(drag?.moved);
    nodeDragRef.current = null;
    if (!moved) selectAddress(address);
  }

  function onPointerDown(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    svg.setPointerCapture(e.pointerId);
    dragRef.current.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragRef.current.last = { x: e.clientX, y: e.clientY };
    dragRef.current.moved = false;
    if (dragRef.current.pointers.size === 2) {
      const pts = [...dragRef.current.pointers.values()];
      dragRef.current.pinch = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    }
  }

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const store = dragRef.current;
    if (!store.pointers.has(e.pointerId)) return;
    store.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (store.pointers.size === 2) {
      const pts = [...store.pointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const prev = store.pinch ?? dist;
      store.pinch = dist;
      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;
      const { vx, vy } = clientToViewBox(svg, midX, midY);
      const factor = dist / (prev || dist);
      setView((v) => zoomAt(v, vx, vy, factor));
      store.moved = true;
      return;
    }

    const last = store.last;
    if (!last) return;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    if (Math.hypot(dx, dy) > 3) store.moved = true;
    store.last = { x: e.clientX, y: e.clientY };
    const { s } = clientToViewBox(svg, e.clientX, e.clientY);
    setView((v) => ({ ...v, x: v.x + dx / s, y: v.y + dy / s }));
  }

  function onPointerUp(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (svg) {
      try {
        svg.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
    dragRef.current.pointers.delete(e.pointerId);
    dragRef.current.pinch = undefined;
    if (dragRef.current.pointers.size === 0) {
      dragRef.current.last = undefined;
    }
  }

  function openRecord(node: { slug: string }) {
    void navigate({ to: "/n/$slug", params: { slug: node.slug } });
  }

  const wide = box.w >= 560;
  const labelTargets: GraphPoint[] = [];
  if (inspectAddr) {
    const p = liveByAddress.get(inspectAddr);
    if (p) labelTargets.push(p);
    for (const n of neighborhood) {
      const qn = liveByAddress.get(n);
      if (qn && qn.node.address !== inspectAddr) labelTargets.push(qn);
    }
  }

  const isolatesOnScreen = visibleLive.some((p) => {
    if (p.degree > 0) return false;
    const x = view.x + p.x * view.k;
    const y = view.y + p.y * view.k;
    return x > 24 && x < GRAPH_WIDTH - 24 && y > 24 && y < GRAPH_HEIGHT - 24;
  });
  const showDomainLabels =
    wide && showIsolated && !inspectAddr && isolatesOnScreen && algo === "editorial";

  const energy = simRef.current && algo !== "editorial" ? kineticEnergy(simRef.current) : 0;
  const cooling = simRef.current && algo !== "editorial" ? simRef.current.alpha : 0;

  return (
    <div className={cn("grid min-w-0 gap-5", className)}>
      <div className="flex min-w-0 flex-col gap-3">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter nodes by title, tag, address…"
            className="pl-10"
            aria-label="Filter graph nodes"
          />
        </div>
        <div className="chip-row">
          {FORCE_ALGOS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => {
                setAlgo(a);
                if (a !== "editorial") setPaused(false);
              }}
              className={cn(
                "h-11 shrink-0 whitespace-nowrap rounded-md px-3 font-mono text-xs uppercase tracking-wide transition-colors duration-150",
                algo === a ? "bg-accent text-accent-fg" : "bg-surface text-muted hover:text-fg",
              )}
              title={FORCE_COPY[a].meaning}
            >
              {FORCE_COPY[a].label}
              {a !== "editorial" ? (
                <span className="ml-1.5 opacity-60">{FORCE_COPY[a].year}</span>
              ) : null}
            </button>
          ))}
        </div>
        {algo !== "editorial" ? (
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                ["repulsion", "Repulsion"],
                ["link", "Link"],
                ["gravity", "Gravity"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="grid min-w-0 gap-1">
                <span className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-subtle">
                  {label}
                  <span className="tabular-nums text-muted">{params[key].toFixed(1)}</span>
                </span>
                <div className="flex h-11 items-center">
                  <input
                    type="range"
                    min={0.4}
                    max={2}
                    step={0.05}
                    value={params[key]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setParams((p) => ({ ...p, [key]: value }));
                      if (simRef.current) reheat(simRef.current, 0.45);
                    }}
                    className="force-range"
                    aria-label={label}
                  />
                </div>
              </label>
            ))}
          </div>
        ) : null}
        <div className="chip-row">
          {(["ALL", ...STATUSES] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={cn(
                "h-11 shrink-0 whitespace-nowrap rounded-md px-3 font-mono text-xs uppercase tracking-wide transition-colors duration-150",
                status === s ? "bg-accent text-accent-fg" : "bg-surface text-muted hover:text-fg",
              )}
            >
              {s}
            </button>
          ))}
          <span className="mx-1 h-6 w-px shrink-0 self-center bg-border" />
          {RELATIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRelation(relation === r ? "ALL" : r)}
              className={cn(
                "flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3 font-mono text-xs uppercase tracking-wide transition-colors duration-150",
                relation === r ? "bg-surface-2 text-fg" : "bg-surface text-muted hover:text-fg",
              )}
              title={RELATION_COPY[r].meaning}
            >
              <span
                className="size-2 rounded-full"
                style={{ background: RELATION_COLOR[r] }}
                aria-hidden
              />
              {RELATION_COPY[r].label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setShowIsolated((v) => {
                const next = !v;
                if (!next) {
                  setView(fitPoints(visibleLive.filter((p) => p.degree > 0), 88));
                }
                return next;
              });
            }}
            className={cn(
              "h-11 shrink-0 whitespace-nowrap rounded-md px-3 text-xs transition-colors duration-150",
              showIsolated ? "bg-surface text-muted hover:text-fg" : "bg-surface-2 text-fg",
            )}
          >
            {showIsolated ? "Hide unlinked" : "Show unlinked"}
          </button>
        </div>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div
          ref={frameRef}
          className="relative h-96 min-w-0 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)] md:h-auto"
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
            className="size-full max-w-full touch-none cursor-grab active:cursor-grabbing md:h-auto md:w-full"
            role="img"
            aria-label="Interactive graph of UPI nodes and typed bridges"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onClick={() => {
              if (!dragRef.current.moved) selectAddress(null);
            }}
          >
            <defs>
              {RELATIONS.map((r) => (
                <marker
                  key={r}
                  id={`upi-arrow-${r}`}
                  markerWidth="8"
                  markerHeight="8"
                  refX="6.5"
                  refY="3"
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <path d="M0,0 L7,3 L0,6 Z" fill={RELATION_COLOR[r]} />
                </marker>
              ))}
            </defs>
            <rect width={GRAPH_WIDTH} height={GRAPH_HEIGHT} fill="var(--color-surface)" />
            <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
              {algo === "editorial" ? (
                <ellipse
                  cx={layout.cx}
                  cy={layout.cy}
                  rx={GRAPH_WIDTH * 0.42}
                  ry={GRAPH_HEIGHT * 0.4}
                  fill="none"
                  stroke="var(--color-border)"
                />
              ) : null}

              {showDomainLabels
                ? layout.domainAnchors.map((d) => (
                    <text
                      key={d.domain}
                      x={d.x}
                      y={d.y}
                      textAnchor="middle"
                      className="pointer-events-none fill-subtle font-mono uppercase"
                      style={{ fontSize: 11, letterSpacing: "0.14em" }}
                    >
                      {domainLabel(d.domain)}
                    </text>
                  ))
                : null}

              {CATALOG.bridges.map((b) => {
                const a = liveByAddress.get(b.source);
                const c = liveByAddress.get(b.target);
                if (!a || !c) return null;
                if (!visibleSet.has(a.node.address) || !visibleSet.has(c.node.address)) return null;
                const rel = isRelation(b.relation) ? b.relation : "DERIVED_FROM";
                if (relation !== "ALL" && rel !== relation) return null;
                const onPath =
                  !focus ||
                  focus === b.source ||
                  focus === b.target;
                const tips = edgeTips(a, c);
                return (
                  <g key={b.slug} className="graph-fade" opacity={onPath ? 1 : 0.16}>
                    <line
                      x1={tips.x1}
                      y1={tips.y1}
                      x2={tips.x2}
                      y2={tips.y2}
                      stroke={RELATION_COLOR[rel]}
                      strokeWidth={onPath ? 1.7 : 1}
                      strokeDasharray={RELATION_COPY[rel].dash === "0" ? undefined : RELATION_COPY[rel].dash}
                      markerEnd={`url(#upi-arrow-${rel})`}
                    />
                    <line
                      x1={tips.x1}
                      y1={tips.y1}
                      x2={tips.x2}
                      y2={tips.y2}
                      stroke="transparent"
                      strokeWidth={14}
                      className="cursor-pointer"
                      onMouseEnter={() => setHovered(b.source)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={(ev) => {
                        ev.stopPropagation();
                        selectAddress(b.source);
                      }}
                    />
                  </g>
                );
              })}

              {visibleLive.map((p) => {
                const lit = litNode(p.node.address);
                const isSel = selected === p.node.address;
                const isHov = hovered === p.node.address;
                const r = nodeRadius(p.degree) + (isSel || isHov ? 1.8 : 0);
                return (
                  <g key={p.node.slug} className="graph-fade" opacity={lit ? 1 : 0.22}>
                    {isSel ? (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={r + 6}
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth={1.2}
                      />
                    ) : null}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={Math.max(r + 16, 22)}
                      fill="transparent"
                      className={algo === "editorial" ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"}
                      role="button"
                      aria-label={p.node.title}
                      tabIndex={0}
                      onPointerDown={(ev) => onNodePointerDown(p.node.address, ev)}
                      onPointerMove={(ev) => onNodePointerMove(p.node.address, ev)}
                      onPointerUp={(ev) => onNodePointerUp(p.node.address, ev)}
                      onPointerCancel={(ev) => onNodePointerUp(p.node.address, ev)}
                      onClick={(ev) => ev.stopPropagation()}
                      onMouseEnter={() => setHovered(p.node.address)}
                      onMouseLeave={() => setHovered(null)}
                      onDoubleClick={(ev) => {
                        ev.stopPropagation();
                        openRecord(p.node);
                      }}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter" || ev.key === " ") {
                          ev.preventDefault();
                          ev.stopPropagation();
                          selectAddress(p.node.address);
                        }
                      }}
                    >
                      <title>{p.node.title}</title>
                    </circle>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={r}
                      fill={STATUS_COLOR[p.node.status]}
                      stroke="var(--color-surface)"
                      strokeWidth={1.4}
                      className="pointer-events-none"
                    />
                  </g>
                );
              })}
            </g>
          </svg>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {labelTargets.map((p) => {
              if (!visibleSet.has(p.node.address)) return null;
              const { left, top } = worldToPixel(p.x, p.y);
              const lines = wrapTitle(p.node.title, 17);
              const active = p.node.address === inspectAddr;
              const s = Math.min(box.w / GRAPH_WIDTH, box.h / GRAPH_HEIGHT);
              const screenR = nodeRadius(p.degree) * view.k * s;
              const dx = p.x - layout.cx;
              const dy = p.y - layout.cy;
              const len = Math.hypot(dx, dy) || 1;
              const ux = len < 50 ? 1 : dx / len;
              const uy = len < 50 ? 0 : dy / len;
              const dist = screenR + 12;
              const lx = left + ux * dist;
              const ly = top + uy * dist;
              const tx = ux < -0.4 ? "-100%" : ux > 0.4 ? "0%" : "-50%";
              const ty = uy < -0.35 ? "-100%" : uy > 0.45 ? "0%" : "-50%";
              return (
                <div
                  key={`lbl-${p.node.slug}`}
                  className="absolute max-w-40"
                  style={{ left: lx, top: ly, transform: `translate(${tx}, ${ty})` }}
                >
                  <span
                    className={cn(
                      "inline-block rounded-sm px-1.5 py-0.5 text-xs leading-tight",
                      active ? "bg-bg/90 text-fg" : "bg-bg/80 text-muted",
                    )}
                  >
                    {lines.map((ln) => (
                      <span key={ln} className="block">
                        {ln}
                      </span>
                    ))}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-3 left-3 flex gap-1">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              aria-label="Zoom in"
              onClick={() =>
                setView((v) => zoomAt(v, GRAPH_WIDTH / 2, GRAPH_HEIGHT / 2, 1.22))
              }
            >
              <ZoomIn />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              aria-label="Zoom out"
              onClick={() =>
                setView((v) => zoomAt(v, GRAPH_WIDTH / 2, GRAPH_HEIGHT / 2, 0.82))
              }
            >
              <ZoomOut />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              aria-label="Fit all nodes"
              onClick={() => setView(fitPoints(visibleLive.length ? visibleLive : layout.points, 48))}
            >
              <Maximize2 />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              aria-label="Focus bridged cluster"
              onClick={() => {
                setShowIsolated(false);
                setRelation("ALL");
                const pts = visibleLive.filter((p) => p.degree > 0);
                setView(fitPoints(pts.length ? pts : layout.points.filter((p) => p.degree > 0), 80));
              }}
            >
              <LocateFixed />
            </Button>
            {algo !== "editorial" ? (
              <>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  aria-label={paused ? "Resume layout" : "Pause layout"}
                  onClick={() => setPaused((v) => !v)}
                >
                  {paused ? <Play /> : <Pause />}
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  aria-label="Reheat layout"
                  onClick={() => {
                    if (simRef.current) reheat(simRef.current, 1);
                    setPaused(false);
                  }}
                >
                  <RotateCcw />
                </Button>
              </>
            ) : null}
          </div>

          <p className="pointer-events-none absolute right-3 top-3 text-right font-mono text-xs uppercase tracking-widest text-subtle">
            <span className="block">
              {visible.length}/{layout.points.length} nodes
            </span>
            {algo !== "editorial" ? (
              <span className="mt-1 block tabular-nums">
                {paused ? "paused" : cooling > 0.05 ? "cooling" : "settled"} · E {energy.toFixed(1)}
              </span>
            ) : null}
          </p>
        </div>

        <aside
          ref={asideRef}
          className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
        >
          {inspect ? (
            <div className="grid gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={inspect.status} />
                {selected ? (
                  <span className="font-mono text-xs uppercase tracking-widest text-subtle">Pinned</span>
                ) : (
                  <span className="font-mono text-xs uppercase tracking-widest text-subtle">Hover</span>
                )}
              </div>
              <p className="font-display text-2xl leading-snug">{inspect.title}</p>
              <p className="text-sm text-muted">{inspect.description}</p>
              <p className="font-mono text-xs text-subtle">{domainLabel(inspect.domain)}</p>
              {inspectBridges.length ? (
                <ul className="grid gap-2">
                  {inspectBridges.map((b) => {
                    const other = b.source === inspect.address ? b.target : b.source;
                    const otherNode = getNodeByAddress(other);
                    const outbound = b.source === inspect.address;
                    const rel = isRelation(b.relation) ? b.relation : "DERIVED_FROM";
                    return (
                      <li key={b.slug}>
                        <button
                          type="button"
                          className="flex w-full items-start justify-between gap-3 rounded-lg bg-surface-2 p-3 text-left text-sm transition-colors duration-150 hover:bg-bg"
                          onClick={() => otherNode && selectAddress(otherNode.address)}
                        >
                          <span>
                            <span className="flex items-center gap-2 font-mono text-xs text-subtle">
                              <span
                                className="size-1.5 rounded-full"
                                style={{ background: RELATION_COLOR[rel] }}
                              />
                              {outbound ? "out" : "in"} · {RELATION_COPY[rel].label}
                            </span>
                            <span className="mt-1 block text-fg">
                              {otherNode ? shortTitle(otherNode.title, 42) : other}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-muted">
                  No typed bridges in this snapshot — an unlinked record, not a missing law.
                </p>
              )}
              <Button type="button" className="mt-1" onClick={() => openRecord(inspect)}>
                Open record
              </Button>
            </div>
          ) : (
            <div className="grid gap-3 text-sm text-muted">
              <p className="font-display text-2xl text-fg">{FORCE_COPY[algo].title}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-subtle">
                {FORCE_COPY[algo].year}
              </p>
              <p>{FORCE_COPY[algo].meaning}</p>
              {algo === "editorial" ? (
                <p>
                  {layout.bridgedCount} bridged records, {layout.isolatedCount} unlinked. Hover to
                  inspect, click to pin, double-click to open.
                </p>
              ) : (
                <p>
                  Drag a node to pin it against the field; release to let it go. Pause, reheat, or
                  switch models to compare how the same bridges settle.
                </p>
              )}
              <ul className="grid gap-1.5 font-mono text-xs uppercase tracking-wide">
                {RELATIONS.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-subtle">
                    <span
                      className="inline-block h-px w-6"
                      style={{ background: RELATION_COLOR[r] }}
                    />
                    {RELATION_COPY[r].label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export function HeroOrbit() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-3 rounded-full border border-border" />
      <div className="orbit-spin absolute inset-8 rounded-full border border-border-strong">
        <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-est" />
      </div>
      <div className="orbit-spin-rev absolute inset-14 rounded-full border border-der/40">
        <span className="absolute left-0 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-der" />
      </div>
      <div className="absolute inset-20 rounded-full border border-hyp/35">
        <span className="absolute right-6 top-3 size-1.5 rounded-full bg-hyp" />
      </div>
      <div className="absolute inset-24 grid place-items-center rounded-full bg-fg text-bg">
        <span className="font-display text-4xl italic leading-none">Φ</span>
      </div>
      <span className="absolute left-6 top-10 font-mono text-xs uppercase tracking-widest text-subtle">
        provenance
      </span>
      <span className="absolute bottom-12 right-5 font-mono text-xs uppercase tracking-widest text-subtle">
        status
      </span>
    </div>
  );
}
