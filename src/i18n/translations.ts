export type Lang = "it" | "en";

export const translations = {
  // Navbar
  navStories: { it: "Storie", en: "Stories" },
  navArchive: { it: "Archivio", en: "Archive" },
  navProcess: { it: "Processo", en: "Process" },
  navContact: { it: "Contatto", en: "Contact" },
  navInquire: { it: "Contattami", en: "Inquire" },

  // Archive categories
  catAll: { it: "Tutto", en: "All" },
  catShooting: { it: "Shooting", en: "Shooting" },
  catTravel: { it: "Viaggi", en: "Travel" },
  catWeddings: { it: "Matrimoni", en: "Weddings" },
  catEvents: { it: "Eventi", en: "Events" },

  // Continents
  contEurope: { it: "Europa", en: "Europe" },
  contAsia: { it: "Asia", en: "Asia" },
  contAfrica: { it: "Africa", en: "Africa" },
  contNorthAmerica: { it: "Nord America", en: "North America" },
  contSouthAmerica: { it: "Sud America", en: "South America" },
  contOceania: { it: "Oceania", en: "Oceania" },

  // Archive page
  archivePageLabel: { it: "La Collezione Completa", en: "The Full Collection" },
  archivePageTitle: { it: "Archivio", en: "Archive" },
  archiveViewAll: { it: "Vedi Archivio Completo", en: "View Full Archive" },
  archiveBack: { it: "Torna alla Home", en: "Back to Home" },

  // Loader
  loaderSubtitle: { it: "Narratrice Visiva", en: "Visual Storyteller" },

  // Hero
  heroSubtitle: { it: "Narratrice Visiva", en: "Visual Storyteller" },
  heroTagline: { it: "Catturare la poesia tra luce e silenzio.", en: "Capturing the poetry between light and silence." },
  heroScroll: { it: "Scorri", en: "Scroll" },

  // Featured Stories
  featuredLabel: { it: "Lavori in Evidenza", en: "Featured Work" },
  featuredTitle: { it: "Storie", en: "Stories" },
  story1Title: { it: "Sussurri dell'Alba", en: "Whispers of Dawn" },
  story1Location: { it: "Alpi, Svizzera", en: "Alps, Switzerland" },
  story2Title: { it: "Solitudine al Neon", en: "Neon Solitude" },
  story2Location: { it: "Tokyo, Giappone", en: "Tokyo, Japan" },
  story3Title: { it: "Ai Confini del Mondo", en: "Edge of the World" },
  story3Location: { it: "Azzorre, Portogallo", en: "Azores, Portugal" },
  story4Title: { it: "Sabbie Infinite", en: "Infinite Sands" },
  story4Location: { it: "Sahara, Marocco", en: "Sahara, Morocco" },

  // Archive (home)
  archiveLabel: { it: "La Collezione", en: "The Collection" },
  archiveTitle: { it: "Archivio", en: "Archive" },
  archImg1: { it: "Sussurri dell'Alba", en: "Whispers of Dawn" },
  archImg2: { it: "Geometria della Luce", en: "Geometry of Light" },
  archImg3: { it: "Solitudine al Neon", en: "Neon Solitude" },
  archImg4: { it: "Memento Mori", en: "Memento Mori" },
  archImg5: { it: "Ora d'Oro", en: "Golden Hour" },
  archImg6: { it: "Ai Confini del Mondo", en: "Edge of the World" },
  archImg7: { it: "Le Mani dell'Artigiano", en: "Craftsman's Hands" },
  archImg8: { it: "Sabbie Infinite", en: "Infinite Sands" },

  // Process
  processLabel: { it: "Filosofia", en: "Philosophy" },
  processTitle1: { it: "Processo &", en: "Process &" },
  processTitle2: { it: "Visione", en: "Vision" },
  processQuote: {
    it: "\"La fotografia non riguarda la cosa fotografata. Riguarda come quella cosa appare quando viene fotografata.\"",
    en: "\"Photography is not about the thing photographed. It is about how that thing looks photographed.\""
  },
  processP1: {
    it: "Ogni scatto è una conversazione intenzionale tra luce, ombra e il fugace momento umano. Cerco gli spazi intermedi — il respiro prima della tempesta, l'ultimo raggio dorato prima che il crepuscolo conquisti l'orizzonte.",
    en: "Every frame is an intentional conversation between light, shadow, and the fleeting human moment. I seek the spaces between—the exhale before the storm, the last golden ray before dusk claims the horizon."
  },
  processP2: {
    it: "Il mio lavoro è guidato dalla pazienza e dall'istinto in egual misura. Settimane di ricerca si distillano in un singolo momento decisivo — un gesto, un'ombra, una convergenza di elementi che non si allineeranno mai più.",
    en: "My work is guided by patience and instinct in equal measure. Weeks of scouting distill into a single decisive moment—a gesture, a shadow, a convergence of elements that will never align again."
  },

  // Contact
  contactLabel: { it: "Creiamo Insieme", en: "Let's Create Together" },
  contactTitle1: { it: "Restiamo in", en: "Get In" },
  contactTitle2: { it: "Contatto", en: "Touch" },
  contactDesc: {
    it: "Disponibile per commissioni editoriali, commerciali e di fine art in tutto il mondo.",
    en: "Available for editorial, commercial, and fine art commissions worldwide."
  },
  contactRights: { it: "© 2024 Tutti i Diritti Riservati", en: "© 2024 All Rights Reserved" },
} as const;

export type TranslationKey = keyof typeof translations;

export type ArchiveCategory = "all" | "shooting" | "travel" | "weddings" | "events";
export type Continent = "europe" | "asia" | "africa" | "north-america" | "south-america" | "oceania";
