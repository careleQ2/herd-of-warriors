import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calendar, Newspaper, MapPin } from "lucide-react";
import { useLanguage, type TranslationKey } from "@/lib/i18n";
import { useUpcomingEventsCount } from "@/lib/useUpcomingEvents";

const items = [
  { to: "/feed", key: "nav.feed", icon: Home },
  { to: "/eventos", key: "nav.events", icon: Calendar },
  { to: "/noticias", key: "nav.news", icon: Newspaper },
  { to: "/gimnasios", key: "nav.gyms", icon: MapPin },
] as const;

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
                  {t(it.key as TranslationKey)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
