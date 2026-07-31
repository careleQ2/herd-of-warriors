import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Trash2, X } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";

type Suggestion = {
  id: string;
  nombre: string;
  disciplina: string | null;
  organizacion: string | null;
  url_perfil: string | null;
  estado: string;
  created_at: string;
};

type FighterPending = {
  id: string;
  nombre: string;
  apodo: string | null;
  disciplinas: string[];
  organizacion: string | null;
  estado: string;
};

export const Route = createFileRoute("/admin/fighters")({
  head: () => ({ meta: [{ title: "Admin · Peleadores" }] }),
  component: () => (
    <AuthGate>
      <AdminFighters />
    </AuthGate>
  ),
});

function AdminFighters() {
  const { user } = useSession();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [pending, setPending] = useState<FighterPending[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;
    void load();
  }, [isAdmin]);

  const load = async () => {
    const [{ data: s }, { data: p }] = await Promise.all([
      supabase
        .from("fighter_suggestions")
        .select("*")
        .eq("estado", "pendiente")
        .order("created_at", { ascending: false }),
      supabase
        .from("fighters")
        .select("id,nombre,apodo,disciplinas,organizacion,estado")
        .eq("estado", "pendiente_verificacion")
        .order("created_at", { ascending: false }),
    ]);
    setSuggestions((s as Suggestion[] | null) ?? []);
    setPending((p as FighterPending[] | null) ?? []);
  };

  const approveSuggestion = async (s: Suggestion) => {
    await supabase.from("fighters").insert({
      nombre: s.nombre,
      disciplinas: s.disciplina ? [s.disciplina] : [],
      organizacion: s.organizacion,
      url_perfil_externo: s.url_perfil,
      estado: "pendiente_verificacion",
      fuente_datos: "manual",
    });
    await supabase.from("fighter_suggestions").update({ estado: "aprobada" }).eq("id", s.id);
    void load();
  };

  const rejectSuggestion = async (id: string) => {
    await supabase.from("fighter_suggestions").update({ estado: "rechazada" }).eq("id", id);
    void load();
  };

  const approveFighter = async (id: string) => {
    await supabase.from("fighters").update({ estado: "activo" }).eq("id", id);
    void load();
  };

  const deleteFighter = async (id: string) => {
    await supabase.from("fighters").delete().eq("id", id);
    void load();
  };

  if (isAdmin === null) {
    return <Wrap><p className="text-sm text-muted-foreground">Comprobando permisos…</p></Wrap>;
  }
  if (!isAdmin) {
    return (
      <Wrap>
        <p className="text-sm">Acceso restringido. Necesitas rol de admin.</p>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <section className="mb-8">
        <h2 className="text-display mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Sugerencias pendientes ({suggestions.length})
        </h2>
        {suggestions.length === 0 ? (
          <p className="text-xs text-muted-foreground">No hay sugerencias.</p>
        ) : (
          <ul className="space-y-2">
            {suggestions.map((s) => (
              <li key={s.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-display font-bold uppercase">{s.nombre}</p>
                <p className="text-xs text-muted-foreground">
                  {s.disciplina ?? "—"} · {s.organizacion ?? "—"}
                </p>
                {s.url_perfil && (
                  <a
                    href={s.url_perfil}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-1 inline-block text-xs underline"
                    style={{ color: "var(--color-blood)" }}
                  >
                    {s.url_perfil}
                  </a>
                )}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => approveSuggestion(s)}
                    className="flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold uppercase text-white"
                    style={{ background: "var(--color-blood)" }}
                  >
                    <Check className="h-3 w-3" /> Crear
                  </button>
                  <button
                    onClick={() => rejectSuggestion(s.id)}
                    className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase"
                  >
                    <X className="h-3 w-3" /> Rechazar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-display mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Peleadores pendientes verificación ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="text-xs text-muted-foreground">Nada pendiente.</p>
        ) : (
          <ul className="space-y-2">
            {pending.map((f) => (
              <li
                key={f.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-display truncate font-bold uppercase">{f.nombre}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {f.disciplinas.join("/")} · {f.organizacion ?? "—"}
                  </p>
                </div>
                <button
                  onClick={() => approveFighter(f.id)}
                  className="rounded-md px-3 py-1.5 text-xs font-semibold uppercase text-white"
                  style={{ background: "var(--color-blood)" }}
                >
                  Aprobar
                </button>
                <button
                  onClick={() => deleteFighter(f.id)}
                  className="rounded-md border border-border p-1.5 text-muted-foreground"
                  aria-label="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Wrap>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-24 text-foreground">
      <header
        className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
          <Link to="/peleadores" aria-label="Atrás">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-display text-lg font-bold uppercase">Admin · Peleadores</h1>
        </div>
      </header>
      <main className="mx-auto max-w-md px-4 py-4">{children}</main>
    </div>
  );
}
