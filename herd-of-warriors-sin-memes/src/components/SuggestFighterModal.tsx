import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { DISCIPLINES } from "@/lib/preferences";

export function SuggestFighterModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user } = useSession();
  const [nombre, setNombre] = useState("");
  const [disciplina, setDisciplina] = useState<string>(DISCIPLINES[0].label);
  const [organizacion, setOrganizacion] = useState("");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || busy) return;
    if (nombre.trim().length < 2) {
      setError("Nombre demasiado corto.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error } = await supabase.from("fighter_suggestions").insert({
      user_id: user.id,
      nombre: nombre.trim().slice(0, 120),
      disciplina,
      organizacion: organizacion.trim().slice(0, 120) || null,
      url_perfil: url.trim().slice(0, 500) || null,
    });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
    setNombre("");
    setOrganizacion("");
    setUrl("");
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl border border-border bg-surface p-5 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-display text-lg font-bold uppercase tracking-wider">
            Sugerir peleador
          </h2>
          <button onClick={onClose} aria-label="Cerrar">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {done ? (
          <div className="py-6 text-center">
            <p className="text-sm">¡Gracias! Tu sugerencia está pendiente de revisión.</p>
            <button
              onClick={() => {
                setDone(false);
                onClose();
              }}
              className="text-display mt-4 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest text-white"
              style={{ background: "var(--color-blood)" }}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <Field
              label="Nombre del peleador"
              value={nombre}
              onChange={setNombre}
              required
              maxLength={120}
            />
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Disciplina
              </label>
              <select
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                {DISCIPLINES.map((d) => (
                  <option key={d.id} value={d.label}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="Organización (opcional)"
              value={organizacion}
              onChange={setOrganizacion}
              maxLength={120}
            />
            <Field
              label="Enlace a su perfil (Tapology, Sherdog, UFC.com…)"
              value={url}
              onChange={setUrl}
              type="url"
              maxLength={500}
            />
            {error && <p className="text-xs text-[var(--color-blood)]">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="text-display w-full rounded-lg py-3 text-sm font-bold uppercase tracking-widest text-white disabled:opacity-50"
              style={{ background: "var(--color-blood)" }}
            >
              {busy ? "Enviando…" : "Enviar sugerencia"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        type={type}
        maxLength={maxLength}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--color-blood)]"
      />
    </div>
  );
}
