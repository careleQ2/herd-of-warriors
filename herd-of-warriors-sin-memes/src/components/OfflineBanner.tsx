import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setOnline(navigator.onLine);
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  if (online) return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest animate-in slide-in-from-top duration-300"
      style={{
        background: "var(--color-blood)",
        color: "var(--color-blood-foreground)",
        paddingTop: "calc(env(safe-area-inset-top) + 0.5rem)",
      }}
      role="alert"
    >
      <WifiOff className="h-3.5 w-3.5" />
      <span>Sin conexión a internet</span>
    </div>
  );
}

export function OfflineScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border"
        style={{
          borderColor: "var(--color-blood)",
          background: "color-mix(in oklab, var(--color-blood) 10%, transparent)",
        }}
      >
        <WifiOff className="h-7 w-7" style={{ color: "var(--color-blood)" }} />
      </div>
      <h2 className="text-display text-xl font-bold">Sin conexión</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        Comprueba tu conexión a internet y vuelve a intentarlo.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="text-display mt-5 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-widest"
        style={{ background: "var(--color-blood)", color: "var(--color-blood-foreground)" }}
      >
        Reintentar
      </button>
    </div>
  );
}
