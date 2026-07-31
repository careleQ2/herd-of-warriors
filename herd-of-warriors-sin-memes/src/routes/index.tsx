import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { WolfIcon } from "@/components/WolfIcon";
import { SwordIcon } from "@/components/SwordIcon";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Herd of Warriors" },
      { name: "description", content: "Tu casa para MMA, boxeo, BJJ, muay thai y todas las artes marciales." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading || !session || !splashDone) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("disciplines")
        .eq("id", session.user.id)
        .maybeSingle();
      const hasPrefs = Array.isArray(data?.disciplines) && data!.disciplines.length > 0;
      navigate({ to: hasPrefs ? "/feed" : "/onboarding", replace: true });
    })();
  }, [session, loading, navigate, splashDone]);

  if (!splashDone || loading) return <Splash />;


  return (
    <div
      className="min-h-screen flex flex-col bg-background text-foreground"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto w-full max-w-md flex-1 px-6 py-10 flex flex-col">
        <div className="flex items-center gap-2">
          <WolfIcon className="h-5 w-5" style={{ color: "var(--color-blood)" }} />
          <span className="text-display text-xs font-bold tracking-[0.25em]">HERD OF WARRIORS</span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div
            className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{ background: "var(--gradient-blood)", boxShadow: "var(--shadow-blood)" }}
          >
            <WolfIcon className="h-12 w-12" style={{ color: "var(--color-blood-foreground)" }} />
          </div>
          <h1 className="text-display text-5xl font-bold leading-[0.95] uppercase">
            Herd<br />of <span style={{ color: "var(--color-blood)" }}>warriors</span>.
          </h1>
          <p className="mt-5 text-base text-muted-foreground">
            MMA, boxeo, BJJ, muay thai y todas las artes marciales. En un solo lugar.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="w-full rounded-lg py-4 text-display text-base font-bold uppercase tracking-wider text-center"
            style={{
              background: "var(--gradient-blood)",
              color: "var(--color-blood-foreground)",
              boxShadow: "var(--shadow-blood)",
            }}
          >
            Crear cuenta
          </Link>
          <Link
            to="/auth"
            search={{ mode: "login" }}
            className="w-full rounded-lg border py-4 text-display text-base font-bold uppercase tracking-wider text-center"
            style={{ borderColor: "var(--color-border)", color: "var(--color-foreground)" }}
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

function Splash() {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        className="relative flex h-40 w-40 items-center justify-center rounded-3xl"
        style={{ background: "var(--gradient-blood)", boxShadow: "var(--shadow-blood)" }}
      >
        <SwordIcon className="h-24 w-24 animate-[sword-in_900ms_ease-out_both] text-white drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]" />
      </div>
      <div className="mt-8 flex items-center gap-2">
        <WolfIcon className="h-4 w-4" style={{ color: "var(--color-blood)" }} />
        <span className="text-display text-[11px] font-bold tracking-[0.28em] text-foreground">
          HERD OF WARRIORS
        </span>
      </div>
      <style>{`
        @keyframes sword-in {
          0% { transform: translateY(-30px) rotate(-25deg) scale(0.6); opacity: 0; }
          60% { transform: translateY(6px) rotate(3deg) scale(1.05); opacity: 1; }
          100% { transform: translateY(0) rotate(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

