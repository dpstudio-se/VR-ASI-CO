import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DedupLab } from "@/components/dedup-lab";
import { FrequencyLab } from "@/components/frequency-lab";
import { GapLedger } from "@/components/gap-ledger";
import { MeasureLoop } from "@/components/measure-loop";
import { OdinMap } from "@/components/odin-map";
import { SourceMap } from "@/components/source-map";
import { XMap } from "@/components/x-map";
import { Sonifier } from "@/components/sonifier";

export const Route = createFileRoute("/lab")({ component: LabPage });

function LabPage() {
  const [frequency, setFrequency] = useState("8");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">Software utilities</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Lab</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Walk the Einstein map on the mass shell. Rest is the intercept. Lorentz is the slide.
        Shorten only maps that compose. Open the loop: 11d does not invert back to frequency.
      </p>
      <p className="mt-4 text-sm">
        <Link to="/stop" search={{ id: "abstract-payload", group: "indaleko" }} className="text-fg underline-offset-4 hover:underline">
          Open the STOP desk
        </Link>
        {" · "}
        <Link to="/symmetry" search={{ layer: "algebra", a: "so11" }} className="text-fg underline-offset-4 hover:underline">
          Open the Lie algebra lab
        </Link>
      </p>
      <div className="mt-10">
        <MeasureLoop frequencyHz={Number(frequency)} />
      </div>
      <div className="mt-6">
        <OdinMap />
      </div>
      <div className="mt-6">
        <SourceMap />
      </div>
      <div className="mt-6">
        <XMap />
      </div>
      <div className="mt-6">
        <DedupLab />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <FrequencyLab frequency={frequency} onFrequency={setFrequency} />
        <Sonifier />
      </div>
      <div className="mt-6">
        <GapLedger />
      </div>
    </div>
  );
}
