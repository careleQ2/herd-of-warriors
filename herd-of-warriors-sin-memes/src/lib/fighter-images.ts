/**
 * Fighter image resolver for Vite assets
 * Handles dynamic asset imports correctly in both SSR and client contexts
 */

// Try to import all fighter images using Vite's glob
let fighterImages: Record<string, any> | null = null;

try {
  // This will work in client context; in SSR it may fail gracefully
  const modules = import.meta.glob<{ default: string }>(
    '/src/assets/peleadores/*.jpg',
    { eager: true }
  );
  fighterImages = modules;
} catch (e) {
  // Glob import might fail in SSR contexts, fallback to simple path resolution
  fighterImages = null;
}

/**
 * Get the image URL for a fighter by name
 * Converts name to filename format and resolves to asset URL
 * @param nombre - Fighter's full name (e.g., "Jon Jones")
 * @returns The resolved image URL
 */
export function getFighterImageUrl(nombre: string): string {
  // Convert name to filename format: lowercase, spaces to hyphens
  const filename = nombre.toLowerCase().replace(/\s+/g, '-');

  // Try using preloaded glob first (works in client)
  if (fighterImages) {
    const key = `/src/assets/peleadores/${filename}.jpg`;
    if (fighterImages[key]) {
      return fighterImages[key]?.default || `/assets/peleadores/${filename}.jpg`;
    }
  }

  // Fallback: return path that Vite will resolve
  // In dev: Vite serves from src/assets folder
  // In build: assets are bundled with correct paths
  return `/assets/peleadores/${filename}.jpg`;
}
