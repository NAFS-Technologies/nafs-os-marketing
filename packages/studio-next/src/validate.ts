
import { STUDIO_SECTION_TYPES, type StudioDocument, type StudioThemeId } from "./types";

const sectionSet = new Set<string>(STUDIO_SECTION_TYPES);
const stableThemes = new Set<StudioThemeId>(["lavishta", "essential", "electronics"]);

export function resolveTheme(theme: string | null | undefined): StudioThemeId {
  return stableThemes.has(theme as StudioThemeId) ? (theme as StudioThemeId) : "electronics";
}

export function assertStudioDocument(document: StudioDocument): StudioDocument {
  if (!document.siteId || !document.surfaceKey) throw new Error("Studio document is missing its trusted site or surface key");
  if (document.sections.length > 25) throw new Error("A Studio surface cannot contain more than 25 sections");
  for (const section of document.sections) {
    if (!sectionSet.has(section.type)) throw new Error(`Unsupported Studio section: ${section.type}`);
    if (section.blocks.length > 50) throw new Error(`Section ${section.id} exceeds the 50 block limit`);
    if (section.type.includes("slide") || section.type.includes("slider")) {
      if (section.blocks.length > 20) throw new Error("A slider cannot contain more than 20 slides");
      const autoplay = Number(section.settings.autoplaySeconds ?? 5);
      if (autoplay < 3 || autoplay > 10) throw new Error("Slider autoplay must be between 3 and 10 seconds");
    }
  }
  return { ...document, theme: resolveTheme(document.theme) };
}
