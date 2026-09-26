import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  bitsOf,
  decodeGolay,
  encodeGolay,
  flipBit,
  GOLAY,
  injectRandomErrors,
  popcnt,
  randomCodeword,
} from "@/lib/upi/golay";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GolayBench() {
  const [sent, setSent] = useState(() => encodeGolay(0b101100101011));
  const [received, setReceived] = useState(sent);

  const decoded = useMemo(() => decodeGolay(received), [received]);
  const bits = bitsOf(received);
  const errorSet = useMemo(() => new Set(decoded.errors), [decoded.errors]);
  const flipped = popcnt(sent ^ received);
  const repaired = decoded.codeword === sent;
  const correctable = decoded.distance <= GOLAY.t;

  function loadCodeword(word: number) {
    setSent(word);
    setReceived(word);
  }

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">
        verification_type: software_test
      </p>
      <h2 className="mt-2 font-display text-3xl tracking-tight">Golay G24,12,8</h2>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Extended binary Golay [24, 12, 8]. Minimum distance 8, so any 3 bit flips are uniquely
        correctable. G23 is the perfect code; this is its parity extension. Flip bits, then repair.
        Classical decoding on a laptop — not a quantum memory.
      </p>

      <div className="mt-6 grid grid-cols-6 gap-1.5 sm:grid-cols-8 md:grid-cols-12">
        {bits.map((bit, i) => {
          const err = errorSet.has(i);
          return (
            <button
              key={i}
              type="button"
              aria-label={`Bit ${i + 1}, value ${bit}${err ? ", error" : ""}`}
              onClick={() => setReceived((w) => flipBit(w, i))}
              className={cn(
                "flex h-11 items-center justify-center rounded-md font-mono text-sm tabular-nums transition-colors duration-150",
                err
                  ? "bg-der text-bg"
                  : bit
                    ? "bg-hyp text-bg"
                    : "bg-bg text-muted hover:text-fg",
              )}
            >
              {bit}
            </button>
          );
        })}
      </div>

      <dl className="mt-6 grid gap-0 sm:grid-cols-3">
        {[
          ["Flips vs sent", String(flipped)],
          ["Hamming to codeword", String(decoded.distance)],
          ["Repair", correctable ? (repaired ? "restored" : "other codeword") : "beyond t = 3"],
        ].map(([k, v]) => (
          <div key={k} className="border-t border-border py-3 sm:px-3 sm:first:pl-0">
            <dt className="font-mono text-xs uppercase tracking-widest text-subtle">{k}</dt>
            <dd className="mt-1 font-mono text-sm">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={() => loadCodeword(randomCodeword())}>
          Random codeword
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setReceived((w) => injectRandomErrors(w, 1))}
        >
          Flip 1
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setReceived((w) => injectRandomErrors(w, 3))}
        >
          Flip 3
        </Button>
        <Button type="button" onClick={() => setReceived(decoded.codeword)}>
          Correct
        </Button>
      </div>

      <p className="mt-5 text-xs text-muted">
        Witt construction: from these 2¹² codewords one builds the Leech lattice Λ24. CSS quantum
        codes reuse the same parity checks as syndrome measurement.{" "}
        <Link
          to="/n/$slug"
          params={{ slug: "upi-coding-theory-1-binary-code-extended-golay" }}
          className="text-fg underline-offset-2 hover:underline"
        >
          Open the record
        </Link>
        .
      </p>
    </div>
  );
}
