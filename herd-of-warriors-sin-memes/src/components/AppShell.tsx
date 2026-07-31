import type { ReactNode } from "react";
import { Settings } from "lucide-react";
import { WolfIcon } from "./WolfIcon";
import { BottomNav } from "./BottomNav";
import { Link, useRouterState } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  const { t } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header
        className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <WolfIcon
              className="h-6 w-6 shrink-0"
              style={{ color: "var(--color-blood)", filter: "drop-shadow(var(--shadow-blood))" }}
            />
            <span className="text-display text-sm font-bold tracking-widest truncate">HERD OF WARRIORS</span>
          </div>
          <Link
            to="/ajustes"
            aria-label={t("common.settings")}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </div>
        <div className="mx-auto max-w-md px-4 pb-3">
          <h1 className="text-display text-2xl font-bold">{title}</h1>
        </div>
      </header>
      <main
        key={pathname}
        className="mx-auto w-full max-w-md flex-1 px-4 pb-24 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
