import { createFileRoute } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { FightersPage } from "./peleadores";

export const Route = createFileRoute("/favoritos")({
  head: () => ({ meta: [{ title: "Siguiendo — Herd of Warriors" }] }),
  component: () => (
    <AuthGate>
      <FightersPage favoritesOnly />
    </AuthGate>
  ),
});
