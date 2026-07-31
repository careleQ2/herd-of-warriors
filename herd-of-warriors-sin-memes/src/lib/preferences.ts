export const DISCIPLINES = [
  { id: "mma", label: "MMA" },
  { id: "boxeo", label: "Boxeo" },
  { id: "kickboxing", label: "Kickboxing" },
  { id: "bjj", label: "BJJ" },
  { id: "muay-thai", label: "Muay Thai" },
  { id: "wrestling", label: "Wrestling" },
  { id: "judo", label: "Judo" },
  { id: "karate", label: "Karate" },
  { id: "sambo", label: "Sambo" },
  { id: "capoeira", label: "Capoeira" },
  { id: "taekwondo", label: "Taekwondo" },
] as const;

export type DisciplineId = (typeof DISCIPLINES)[number]["id"];

const KEY = "how:disciplines";

export function getSavedDisciplines(): DisciplineId[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? (parsed as DisciplineId[]) : null;
  } catch {
    return null;
  }
}

export function saveDisciplines(ids: DisciplineId[]) {
  window.localStorage.setItem(KEY, JSON.stringify(ids));
}
