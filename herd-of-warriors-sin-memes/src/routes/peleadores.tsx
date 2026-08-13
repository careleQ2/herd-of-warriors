import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";

export const Route = createFileRoute("/peleadores")({
  head: () => ({ meta: [{ title: "Fighters — Herd of Warriors" }] }),
  component: () => (
    <AuthGate>
      <AppShell title="FIGHTERS">
        <Outlet />
      </AppShell>
    </AuthGate>
  ),
});
