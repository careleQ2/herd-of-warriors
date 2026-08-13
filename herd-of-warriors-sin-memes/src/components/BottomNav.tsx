import { Link, useRouterState } from "@tanstack/react-router";
import { useLanguage, type TranslationKey } from "@/lib/i18n";
import { useUpcomingEventsCount } from "@/lib/useUpcomingEvents";

// 1. Casco espartano (Fighters)
function SpartanHelmet(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M11 2h2v6.5h-2z" />
      <path d="M10 2.5l1 6h-2l1-6z" opacity="0.6" />
      <path d="M14 2.5l-1 6h2l-1-6z" opacity="0.6" />
      <path d="M12 8.5C7.5 8.5 6 10.5 6 13v6l3.5 2.5L12 18l2.5 3.5L18 19v-6c0-2.5-1.5-4.5-6-4.5z" />
      <path d="M7.5 11.5c2.5-1 6.5-1 9 0" stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path
        d="M8.5 13.5l3.5 2 3.5-2 1 2.5-4.5 3.5-4.5-3.5 1-2.5z"
        fill="var(--color-surface, #121212)"
      />
      <path
        d="M11 16.5v4h2v-4h-2z"
        fill="var(--color-surface, #121212)"
      />
    </svg>
  );
}

// 2. Shuriken asimétrico de 4 aspas (Favoritos)
function ShurikenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      {/* Aspas ninja curvas de 4 puntas */}
      <path d="M12 2C10.5 7 7 10.5 2 12C7 13.5 10.5 17 12 22C13.5 17 17 13.5 22 12C17 10.5 13.5 7 12 2Z" />
      
      {/* Agujero central hueco */}
      <circle cx="12" cy="12" r="2.2" fill="var(--color-surface, #121212)" />
    </svg>
  );
}

// 3. Espadas cruzadas (Eventos)
function CrossedSwords(props: any) {
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
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" y1="19" x2="19" y2="13" />
      <line x1="16" y1="16" x2="20" y2="20" />
      <line x1="19" y1="21" x2="21" y2="19" />
      <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
      <line x1="5" y1="13" x2="11" y2="19" />
      <line x1="8" y1="16" x2="4" y2="20" />
      <line x1="5" y1="21" x2="3" y2="19" />
    </svg>
  );
}

// 4. Pergamino antiguo (Noticias)
function ScrollIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4h11c1.5 0 3 .8 2.8 2-.2 1.2-1.5 2-3 2H5.5C4 8 3 7 3 5.5S4 4 5.5 4H6z" />
      <path d="M5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
      <path d="M3 5.5v12.5c0 1.5 1.5 2.5 3 2.5" />
      <path d="M19.8 8C20.5 11 20 16 19 19.5" />
      <path d="M5 18.5h14c1.2 0 2.2.8 2 1.8-.2 1-1.2 1.7-2.5 1.7H6c-1.8 0-3-.8-3-2v-1" />
      <path d="M5.5 20.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
    </svg>
  );
}

// 5. Coliseo / Arena clásica (Gimnasios)
function ColosseumIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M2 19h20v2H2z" />
      <path d="M3 16h18v2H3z" />
      <path d="M5 9h2v7H5z" />
      <path d="M9 9h2v7H9z" />
      <path d="M13 9h2v7H13z" />
      <path d="M17 9h2v7H17z" />
      <path d="M2 7l10-4 10 4v2H2V7z" />
    </svg>
  );
}

const items = [
  { to: "/peleadores", label: "FIGHTERS", icon: SpartanHelmet },
  { to: "/siguiendo", label: "SIGUIENDO", icon: ShurikenIcon },
  { to: "/eventos", label: "EVENTOS", icon: CrossedSwords },
  { to: "/noticias", label: "NOTICIAS", icon: ScrollIcon },
  { to: "/gimnasios", label: "GIMNASIOS", icon: ColosseumIcon },
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
      <ul className="grid grid-cols-5">
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
                  {it.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}