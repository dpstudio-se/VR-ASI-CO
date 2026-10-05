import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Github, Menu, X } from "lucide-react";
import { OrbitalMark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { transcribeDna } from "@/components/dna-engine";
import { DNA } from "@/lib/upi/hydrate";
import { useLive } from "@/lib/upi/live";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "OdinOS" },
  { to: "/personas", label: "Personas" },
  { to: "/dna", label: "DNA / RNA" },
  { to: "/catalog", label: "Knowledge" },
  { to: "/graph", label: "Graph" },
  { to: "/lab", label: "Tools" },
  { to: "/stop", label: "STOP" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const live = useLive();

  useEffect(() => {
    void transcribeDna().catch(() => {
      /* snapshot remains; error is on the live store */
    });
  }, []);

  return (
    <div className="flex min-h-dvh min-w-0 flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
            <OrbitalMark />
            <span className="min-w-0">
              <span className="block font-display text-lg leading-none tracking-tight">VR-ASI-CO</span>
              <span className="hidden text-xs tracking-wide text-muted sm:block">
                OdinOS command deck
              </span>
            </span>
          </Link>

          <nav className="ml-3 hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-md px-2 py-1.5 text-xs transition-colors duration-150",
                    active
                      ? "bg-surface-2 text-fg"
                      : item.to === "/stop"
                        ? "text-stop hover:bg-surface hover:text-fg"
                        : "text-muted hover:bg-surface hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden font-mono text-xs text-subtle sm:inline">
              {live.origin === "dna" ? `DNA ${live.sha?.slice(0, 7) ?? ""}` : `v${live.catalog.version}`}
            </span>
            <Button variant="ghost" size="icon" asChild>
              <a
                href={DNA.html}
                target="_blank"
                rel="noreferrer"
                aria-label="VR-ASI-CO source on GitHub"
              >
                <Github />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {open ? (
          <nav
            className="grid gap-1 border-t border-border px-4 py-3 lg:hidden"
            aria-label="Mobile"
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-fg hover:bg-surface-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      <main className="min-w-0 flex-1">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl">VR-ASI-CO · OdinOS</p>
            <p className="mt-2 max-w-md text-sm text-muted">
              Persona, runtime, tools, skills, DNA/RNA and knowledge surfaces in one adaptive command deck.
            </p>
          </div>
          <div className="text-sm">
            <p className="mb-2 font-medium">Explore</p>
            <div className="grid gap-1.5 text-muted">
              <Link to="/catalog" className="hover:text-fg">
                Node catalog
              </Link>
              <Link to="/stop" className="hover:text-fg">
                STOP desk
              </Link>
              <Link to="/graph" className="hover:text-fg">
                Bridge graph
              </Link>
              <Link to="/symmetry" search={{ layer: "algebra" }} className="hover:text-fg">
                Group / algebra
              </Link>
              <Link to="/dna" className="hover:text-fg">
                DNA / RNA
              </Link>
              <Link to="/lab" className="hover:text-fg">
                Frequency lab
              </Link>
              <Link to="/personas" className="hover:text-fg">
                Personas
              </Link>
              <Link to="/method" className="hover:text-fg">
                Method
              </Link>
            </div>
          </div>
          <div className="text-sm text-muted">
            <p className="mb-2 font-medium text-fg">Boundary</p>
            <p>
              8 Hz is a reference example, not a universal constant. Software tests prove software
              behavior. MIT license.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
