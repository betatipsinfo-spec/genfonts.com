export interface GoogleFontOption {
  name: string;
  family: string;
  category: "Sans-Serif" | "Serif" | "Handwriting" | "Display" | "Monospace" | string;
}

export const DESIGNER_FONTS: GoogleFontOption[] = [
  { name: "Space Grotesk", family: "Space Grotesk", category: "Display" },
  { name: "Pacifico", family: "Pacifico", category: "Handwriting" },
  { name: "Playfair Display", family: "Playfair Display", category: "Serif" },
  { name: "Cinzel", family: "Cinzel", category: "Serif/Imperial" },
  { name: "Creepster", family: "Creepster", category: "Display/Horror" },
  { name: "Bebas Neue", family: "Bebas Neue", category: "Sans-Serif/Condensed" },
  { name: "Lobster", family: "Lobster", category: "Display/Slab" },
  { name: "Righteous", family: "Righteous", category: "Display/ArtDeco" },
  { name: "Great Vibes", family: "Great Vibes", category: "Handwriting/Elegant" },
  { name: "Syncopate", family: "Syncopate", category: "Display/Modern" },
  { name: "Bungee Shade", family: "Bungee Shade", category: "Display/Retro" },
  { name: "Shadows Into Light", family: "Shadows Into Light", category: "Handwriting/Cute" },
  { name: "Kelly Slab", family: "Kelly Slab", category: "Slab-Serif/Tech" },
  { name: "Permanent Marker", family: "Permanent Marker", category: "Handwriting/Urban" },
  { name: "Inter", family: "Inter", category: "Sans-Serif" }
];
