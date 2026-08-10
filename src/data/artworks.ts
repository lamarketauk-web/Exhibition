export type HoverEffect =
  | "door"
  | "coins"
  | "butterflies"
  | "heartbeat"
  | "smoke"
  | "warmth";

export interface Artwork {
  slug: string;
  title: string;
  year: number;
  story: string;
  meaning: string;
  curatorNote: string;
  personalText: string;
  symbolism: string;
  imageSrc: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  gradient: string;
  accentColor: string;
  hoverEffect: HoverEffect;
}

export const artworks: Artwork[] = [
  {
    slug: "door-to-nowhere",
    title: "Door to Nowhere",
    year: 2025,
    story:
      "A door suspended in void — neither entrance nor exit. Painted during the months when every path forward felt like a dead end, when closing one chapter meant standing before an opening that led nowhere familiar.",
    meaning:
      "The threshold between what was and what might be. We stand at doors we cannot yet walk through.",
    curatorNote:
      "Parejo's first work in the series establishes the exhibition's central tension: the liminal space of transition. The door, rendered without walls or floor, floats in ambiguity — a powerful metaphor for the year of closing cycles.",
    personalText:
      "I painted this when I didn't know where I was going. The door was the only thing I could see — an invitation without a destination. It became my way of sitting with uncertainty instead of running from it.",
    symbolism:
      "The door represents choice without guarantee. Its slight opening on hover invites the viewer to lean in, to wonder what lies beyond — even when beyond remains undefined.",
    imageSrc: "/DoortoNowhere.jpeg",
    imageAlt: "Door to Nowhere artwork showing a solitary door opening into light within a dark void.",
    gradient: "from-slate-900 via-slate-800 to-indigo-950",
    accentColor: "#4A5568",
    hoverEffect: "door",
  },
  {
    slug: "the-empty-bank",
    title: "The Empty Bank",
    year: 2025,
    story:
      "Coins scattered across an empty vault. The business closed. The accounts emptied. What remains is the architecture of loss — the hollow space where security once lived.",
    meaning:
      "Financial endings carry emotional weight. An empty bank is not just about money — it is about identity, stability, and the stories we tell ourselves about worth.",
    curatorNote:
      "This work transforms economic collapse into visual poetry. The rotating coins on interaction suggest the cyclical nature of fortune — what spins away may one day return, or may not.",
    personalText:
      "Bankruptcy stripped away more than my savings. It stripped away who I thought I was. These coins are what was left when everything else was taken — small, cold, and still spinning.",
    symbolism:
      "Coins represent value systems — both monetary and personal. Their rotation echoes how fortune can turn without warning.",
    imageSrc: "/TheEmptyBank.jpeg",
    imageAlt: "The Empty Bank artwork showing a vast empty vault interior with scattered coins on the floor.",
    gradient: "from-amber-950 via-stone-900 to-charcoal",
    accentColor: "#B8860B",
    hoverEffect: "coins",
  },
  {
    slug: "the-solitary-bed",
    title: "The Solitary Bed",
    year: 2025,
    story:
      "A bed made for two, occupied by one. The relationship ended. The sheets still hold the ghost of warmth. Morning light falls on the empty half.",
    meaning:
      "Loneliness after love is not the absence of people — it is the presence of absence. The bed becomes a landscape of solitude.",
    curatorNote:
      "Minimal and devastating. Parejo uses negative space as emotional space. The heartbeat animation on hover gives the solitary bed a pulse — life continues, wounded but beating.",
    personalText:
      "I woke up alone for months after everything ended. The bed was the first place I felt it — this hollow beside me where someone used to breathe. I painted it to make the loneliness visible.",
    symbolism:
      "The bed is the most intimate domestic object. Its emptiness speaks of intimacy withdrawn — a private grief made public through art.",
    imageSrc: "/Thesolitarybed.jpeg",
    imageAlt: "The Solitary Bed artwork showing an unmade bed lit from one side by soft morning light.",
    gradient: "from-slate-950 via-gray-900 to-slate-800",
    accentColor: "#6B7280",
    hoverEffect: "heartbeat",
  },
  {
    slug: "the-warmth-of-home",
    title: "The Bubble of Home",
    year: 2025,
    story:
      "After displacement — Barcelona to London to Mexico — the search for home became its own journey. This piece captures the moment warmth returns: not a place, but a feeling.",
    meaning:
      "Home is not geography. It is the warmth we carry and the warmth we find. After loss, finding it again feels like rebirth.",
    curatorNote:
      "A turning point in the exhibition's emotional arc. The palette shifts from cold voids to amber glow. Smoke drifts gently — suggesting hearth, cooking, the sensory memory of belonging.",
    personalText:
      "I searched for home in cities and countries. I found it in a meal shared, in a room that smelled right, in the exhale of finally feeling safe. This painting is that exhale.",
    symbolism:
      "Warmth as both temperature and emotion. The drifting smoke connects to ancestral memory — altars, kitchens, the places where love is made tangible.",
    imageSrc: "/TheWarmthofHome.jpeg",
    imageAlt: "The Bubble of Home artwork showing glowing bowls in amber light and drifting smoke.",
    gradient: "from-orange-950 via-amber-900 to-yellow-900",
    accentColor: "#D97706",
    hoverEffect: "warmth",
  },
  {
    slug: "altar-of-the-dead",
    title: "Altar of the Dead",
    year: 2025,
    story:
      "Inspired by Día de los Muertos traditions in Mexico — where death is not an ending but a visitation. Candles, marigolds, and the faces of those who remain in memory.",
    meaning:
      "To honour the dead is to keep them alive. The altar is a conversation across the veil — grief transformed into celebration.",
    curatorNote:
      "Parejo's Mexican period infuses the exhibition with cultural depth. The butterflies here are monarchs — traditional messengers between worlds. This work bridges personal loss with collective ritual.",
    personalText:
      "In Mexico I learned that grief doesn't have to be quiet. You can build an altar. You can invite the dead to dinner. You can paint them back into the world with marigolds and light.",
    symbolism:
      "Marigolds guide souls home. Candles illuminate the path. The altar is both memorial and invitation — death as continuity, not finality.",
    imageSrc: "/AltaroftheDead.jpeg",
    imageAlt: "Altar of the Dead artwork showing a Day of the Dead altar with candles, marigolds, and monarch butterflies.",
    gradient: "from-burgundy via-orange-950 to-amber-950",
    accentColor: "#C2410C",
    hoverEffect: "butterflies",
  },
  {
    slug: "reliquary",
    title: "Reliquary",
    year: 2025,
    story:
      "A vessel for what remains when someone is gone. Not ashes, not photographs — but the intangible relics of love: a voice remembered, a gesture preserved in muscle memory, a presence felt in empty rooms.",
    meaning:
      "Grief is not a problem to solve. It is a reliquary we carry — sacred, heavy, and strangely beautiful.",
    curatorNote:
      "Perhaps the emotional heart of the exhibition. Parejo's handling of loss avoids sentimentality while achieving profound tenderness. The butterflies that emerge on hover suggest transformation — the dead becoming something else, something winged.",
    personalText:
      "When my father passed, I didn't know what to keep. This painting is my answer: you keep the space they occupied. You keep the way the world changed shape around their absence.",
    symbolism:
      "The reliquary traditionally holds saintly remains. Here it holds memory — the most fragile and most enduring of all relics.",
    imageSrc: "/Reliquary.jpeg",
    imageAlt: "Reliquary artwork showing a heart-like memorial form plated and labeled with personal losses, surrounded by cream and strawberries.",
    imageFit: "contain",
    gradient: "from-slate-950 via-gray-900 to-slate-800",
    accentColor: "#EF4444",
    hoverEffect: "butterflies",
  },
];

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getAdjacentArtworks(slug: string): {
  prev: Artwork | null;
  next: Artwork | null;
} {
  const index = artworks.findIndex((a) => a.slug === slug);
  return {
    prev: index > 0 ? artworks[index - 1] : null,
    next: index < artworks.length - 1 ? artworks[index + 1] : null,
  };
}
