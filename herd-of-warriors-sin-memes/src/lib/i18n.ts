import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";

export type Lang = "es" | "en";

const LS_KEY = "how:lang";

const dict = {
  es: {
    "settings.title": "Ajustes",
    "settings.disciplines": "Disciplinas favoritas",
    "settings.disciplines.hint": "Tus artes marciales de interés.",
    "settings.orgs": "Organizaciones favoritas",
    "settings.orgs.hint": "Solo las de las disciplinas que sigues.",
    "settings.orgs.empty": "Elige alguna disciplina para ver organizaciones.",
    "settings.language": "Idioma",
    "settings.save": "Guardar cambios",
    "settings.saving": "Guardando…",
    "settings.saved": "Cambios guardados",
    "settings.logout": "Cerrar sesión",
    "settings.profile": "Mi perfil",
    "settings.profile.hint": "Peleadores y organizaciones que sigues.",
    "settings.suggestions": "Sugerencias",
    "settings.suggestions.hint": "¿Ideas para mejorar la app? Envíanos un correo.",
    "settings.suggestions.placeholder": "Cuéntanos qué te gustaría ver…",
    "settings.suggestions.send": "Enviar sugerencia",
    "profile.title": "Mi perfil",
    "profile.fighters": "Peleadores seguidos",
    "profile.orgs": "Organizaciones seguidas",
    "profile.disciplines": "Disciplinas favoritas",
    "profile.empty.fighters": "Aún no sigues a ningún peleador.",
    "profile.empty.orgs": "Aún no sigues ninguna organización.",
    "profile.empty.disciplines": "No has elegido disciplinas.",
    "profile.edit": "Editar",
    "onboarding.step": "Paso",
    "onboarding.of": "de",
    "onboarding.disciplines.title": "Elige tu",
    "onboarding.disciplines.title.accent": "estilo",
    "onboarding.disciplines.sub": "Selecciona al menos una disciplina.",
    "onboarding.orgs.title": "Elige tus",
    "onboarding.orgs.title.accent": "organizaciones",
    "onboarding.orgs.sub": "Filtradas por las disciplinas que elegiste.",
    "onboarding.continue": "Continuar",
    "onboarding.enter": "Entrar al feed",
    "onboarding.skip": "Omitir",
    "nav.feed": "Feed",
    "nav.events": "Eventos",
    "nav.news": "Noticias",
    "nav.gyms": "Gimnasios",
    "lang.es": "Español",
    "lang.en": "English",
    // Common
    "common.loading": "Cargando…",
    "common.noResults": "Sin resultados.",
    "common.soon": "Próximamente.",
    "common.close": "Cerrar",
    "common.back": "Volver",
    "common.settings": "Ajustes",
    // Feed
    "feed.title": "Feed",
    "feed.empty": "Sigue peleadores para ver su contenido aquí.",
    "feed.explore": "Explorar peleadores",
    "feed.search": "Buscar entre tus peleadores",
    "feed.following": "siguiendo",
    "feed.add": "Añadir",
    "feed.last": "Última: ",
    "feed.followingBtn": "Siguiendo",
    "feed.bio": "Bio",
    "feed.trajectoryShort": "Trayec.",
    // Fighters
    "fighters.title": "Peleadores",
    "fighters.search": "Buscar por nombre o apodo",
    "fighters.all": "Todos",
    "fighters.favorites": "★ Favoritos",
    "fighters.follow": "Seguir",
    "fighters.following": "Siguiendo",
    "fighters.bio": "Bio",
    "fighters.trajectory": "Trayectoria",
    "fighters.loadMore": "Cargar más",
    "fighters.showing": "Mostrando",
    "fighters.of": "de",
    "fighters.biography": "Biografía",
    "fighters.noBio": "Sin biografía disponible para este peleador.",
    "fighters.noTrajectory": "Sin trayectoria registrada.",
    // Events
    "events.title": "Eventos",
    "events.loading": "Cargando eventos…",
    "events.orgs": "Organizaciones",
    "events.viewAll": "Ver todas",
    "events.notFound": "Evento no encontrado.",
    "events.back": "Eventos",
    "events.addToCalendar": "Añadir a mi calendario",
    "events.fullCard": "Cartelera completa",
    "events.cardTBD": "Cartelera por confirmar.",
    "events.fight": "Combate",
    // News
    "news.title": "Noticias",
    "news.tab.all": "Todo",
    "news.tab.fighters": "Mis peleadores",
    "news.tab.orgs": "Mis organizaciones",
    "news.tab.saved": "Guardadas",
    "news.empty": "No hay noticias.",
    "news.empty.fighters": "Sigue peleadores para ver noticias sobre ellos.",
    "news.empty.orgs": "Sigue organizaciones para ver sus noticias.",
    "news.empty.saved": "No has guardado ninguna noticia.",
    "news.save": "Guardar",
    "news.saved": "Guardada",
    "news.read": "Leer",
    "news.loading": "Cargando noticias…",
    "news.error": "No se pudieron cargar las noticias.",
    // Gyms
    "gyms.title": "Gimnasios",
    "gyms.loading": "Cargando gimnasios…",
    "gyms.all": "Todas",
    "gyms.filter": "Filtrar por disciplina",
    "gyms.locate": "Usar mi ubicación",
    "gyms.price": "Precio",
    "gyms.perMonth": "/mes",
    "gyms.schedule": "Horarios",
    "gyms.disciplines": "Disciplinas",
    "gyms.contact": "Contactar",
    "gyms.website": "Web",
    "gyms.empty": "No hay gimnasios para esta disciplina.",
  },
  en: {
    "settings.title": "Settings",
    "settings.disciplines": "Favorite disciplines",
    "settings.disciplines.hint": "Your martial arts of interest.",
    "settings.orgs": "Favorite organizations",
    "settings.orgs.hint": "Only from disciplines you follow.",
    "settings.orgs.empty": "Pick a discipline to see organizations.",
    "settings.language": "Language",
    "settings.save": "Save changes",
    "settings.saving": "Saving…",
    "settings.saved": "Changes saved",
    "settings.logout": "Sign out",
    "settings.profile": "My profile",
    "settings.profile.hint": "Fighters and organizations you follow.",
    "settings.suggestions": "Suggestions",
    "settings.suggestions.hint": "Ideas to improve the app? Send us an email.",
    "settings.suggestions.placeholder": "Tell us what you'd like to see…",
    "settings.suggestions.send": "Send suggestion",
    "profile.title": "My profile",
    "profile.fighters": "Followed fighters",
    "profile.orgs": "Followed organizations",
    "profile.disciplines": "Favorite disciplines",
    "profile.empty.fighters": "You don't follow any fighter yet.",
    "profile.empty.orgs": "You don't follow any organization yet.",
    "profile.empty.disciplines": "No disciplines chosen.",
    "profile.edit": "Edit",
    "onboarding.step": "Step",
    "onboarding.of": "of",
    "onboarding.disciplines.title": "Pick your",
    "onboarding.disciplines.title.accent": "style",
    "onboarding.disciplines.sub": "Select at least one discipline.",
    "onboarding.orgs.title": "Pick your",
    "onboarding.orgs.title.accent": "organizations",
    "onboarding.orgs.sub": "Filtered by the disciplines you chose.",
    "onboarding.continue": "Continue",
    "onboarding.enter": "Enter feed",
    "onboarding.skip": "Skip",
    "nav.feed": "Feed",
    "nav.events": "Events",
    "nav.news": "News",
    "nav.gyms": "Gyms",
    "lang.es": "Español",
    "lang.en": "English",
    // Common
    "common.loading": "Loading…",
    "common.noResults": "No results.",
    "common.soon": "Coming soon.",
    "common.close": "Close",
    "common.back": "Back",
    "common.settings": "Settings",
    // Feed
    "feed.title": "Feed",
    "feed.empty": "Follow fighters to see their content here.",
    "feed.explore": "Explore fighters",
    "feed.search": "Search among your fighters",
    "feed.following": "following",
    "feed.add": "Add",
    "feed.last": "Last: ",
    "feed.followingBtn": "Following",
    "feed.bio": "Bio",
    "feed.trajectoryShort": "Traject.",
    // Fighters
    "fighters.title": "Fighters",
    "fighters.search": "Search by name or nickname",
    "fighters.all": "All",
    "fighters.favorites": "★ Favorites",
    "fighters.follow": "Follow",
    "fighters.following": "Following",
    "fighters.bio": "Bio",
    "fighters.trajectory": "Trajectory",
    "fighters.loadMore": "Load more",
    "fighters.showing": "Showing",
    "fighters.of": "of",
    "fighters.biography": "Biography",
    "fighters.noBio": "No biography available for this fighter.",
    "fighters.noTrajectory": "No trajectory recorded.",
    // Events
    "events.title": "Events",
    "events.loading": "Loading events…",
    "events.orgs": "Organizations",
    "events.viewAll": "View all",
    "events.notFound": "Event not found.",
    "events.back": "Events",
    "events.addToCalendar": "Add to my calendar",
    "events.fullCard": "Full fight card",
    "events.cardTBD": "Fight card to be confirmed.",
    "events.fight": "Fight",
    // News
    "news.title": "News",
    "news.tab.all": "All",
    "news.tab.fighters": "My fighters",
    "news.tab.orgs": "My organizations",
    "news.tab.saved": "Saved",
    "news.empty": "No news.",
    "news.empty.fighters": "Follow fighters to see news about them.",
    "news.empty.orgs": "Follow organizations to see their news.",
    "news.empty.saved": "You haven't saved any news.",
    "news.save": "Save",
    "news.saved": "Saved",
    "news.read": "Read",
    "news.loading": "Loading news…",
    "news.error": "Could not load news.",
    // Gyms
    "gyms.title": "Gyms",
    "gyms.loading": "Loading gyms…",
    "gyms.all": "All",
    "gyms.filter": "Filter by discipline",
    "gyms.locate": "Use my location",
    "gyms.price": "Price",
    "gyms.perMonth": "/mo",
    "gyms.schedule": "Schedule",
    "gyms.disciplines": "Disciplines",
    "gyms.contact": "Contact",
    "gyms.website": "Website",
    "gyms.empty": "No gyms for this discipline.",
  },
} as const;

export type TranslationKey = keyof (typeof dict)["es"];

let currentLang: Lang = "es";
const listeners = new Set<(l: Lang) => void>();

function readInitial(): Lang {
  if (typeof window === "undefined") return "es";
  const raw = window.localStorage.getItem(LS_KEY);
  return raw === "en" || raw === "es" ? raw : "es";
}

if (typeof window !== "undefined") {
  currentLang = readInitial();
}

export function setLanguage(lang: Lang) {
  currentLang = lang;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LS_KEY, lang);
  }
  listeners.forEach((cb) => cb(lang));
}

export function useLanguage() {
  const { user } = useSession();
  const [lang, setLangState] = useState<Lang>(currentLang);

  useEffect(() => {
    const cb = (l: Lang) => setLangState(l);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("language")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        const l = (data?.language as Lang | undefined) ?? null;
        if (l && (l === "es" || l === "en") && l !== currentLang) {
          setLanguage(l);
        }
      });
  }, [user]);

  const change = async (l: Lang) => {
    setLanguage(l);
    if (user) {
      await supabase.from("profiles").update({ language: l }).eq("id", user.id);
    }
  };

  const t = (key: TranslationKey) => dict[lang][key] ?? dict.es[key] ?? key;

  return { lang, setLang: change, t };
}

export function t(key: TranslationKey, lang: Lang = currentLang) {
  return dict[lang][key] ?? dict.es[key] ?? key;
}
