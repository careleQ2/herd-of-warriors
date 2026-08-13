import { Link, useRouterState } from "@tanstack/react-router";
import { Calendar, Newspaper, MapPin } from "lucide-react";
import { useLanguage, type TranslationKey } from "@/lib/i18n";
import { useUpcomingEventsCount } from "@/lib/useUpcomingEvents";

// 1. Aquí definimos tu nuevo icono de guante de boxeo
function BoxingGlove(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 17V8a4 4 0 0 1 4-4h3a5 5 0 0 1 5 5v5.5a4.5 4.5 0 0 1-4.5 4.5H10a4 4 0 0 1-4-4Z" />
      <path d="M6 11c-1.5 0-3 1-3 3v2a2 2 0 0 0 2 2h1" />
      <path d="M8 21v-2" />
      <path d="M12 21v-2" />
      <path d="M16 21v-2" />
    </svg>
  );
}

// 2. Modificamos la lista para que el primer botón sea FIGHTERS con el guante
const items = [
  { to: "/peleadores", label: "FIGHTERS", icon: BoxingGlove },
  { to: "/eventos", key: "nav.events", icon: Calendar },
  { to: "/noticias", key: "nav.news", icon: Newspaper },
  { to: "/gimnasios", key: "nav.gyms", icon: MapPin },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useLanguage();
  const eventsBadge = useUpcomingEventsCount();
  
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-surface/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4">
        {items.map((it) => {
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          const Icon = it.icon;
          const badge = it.to === "/eventos" ? eventsBadge : 0;
          return (
            <li key={it.to}>
              <Link
                to={it.to}
                className="flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold uppercase tracking-wide transition-transform active:scale-95"
              >
                <span className="relative">
                  <Icon
                    className="h-5 w-5"
                    style={{ color: active ? "var(--color-blood)" : "var(--color-muted-foreground)" }}
                  />
                  {badge > 0 && (
                    <span
                      className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold leading-none animate-in zoom-in duration-300"
                      style={{ background: "var(--color-blood)", color: "var(--color-blood-foreground)" }}
                      aria-label={`${badge} próximos`}
                    >
                      {badge > 9 ? "9+" : badge}
                    </span>
                  )}
                </span>
                <span style={{ color: active ? "var(--color-foreground)" : "var(--color-muted-foreground)" }}>
                  {/* Si tiene label fijo usa el label, si no usa la traducción del key */}
                  {it.label ? it.label : t(it.key as TranslationKey)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}