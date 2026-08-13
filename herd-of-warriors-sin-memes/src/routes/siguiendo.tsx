import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";
import { FightersPage } from "./peleadores.index";

export const Route = createFileRoute("/siguiendo")({
  head: () => ({ meta: [{ title: "Siguiendo — Herd of Warriors" }] }),
  component: () => (
    <AuthGate>
      <AppShell title="SIGUIENDO">
        <FightersPage favoritesOnly title="SIGUIENDO" />
      </AppShell>
    </AuthGate>
  ),
});
