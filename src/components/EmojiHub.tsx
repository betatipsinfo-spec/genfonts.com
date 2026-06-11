import React, { useState, useMemo } from "react";
import { 
  Smile, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Heart, 
  Activity, 
  Compass, 
  Coffee, 
  HelpCircle, 
  TrendingUp, 
  Shuffle, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Trash2,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { EmojiItem, CuratedEmojis } from "./emojiData";

// @ts-ignore
const OldCuratedEmojis: Record<string, any> = {
  smileys_people: [
    { emoji: "😀", name: "Grinning face", keywords: ["happy", "smile", "joy"] },
    { emoji: "🥰", name: "In love face", keywords: ["love", "heart", "smile", "adorable"] },
    { emoji: "😂", name: "Laugh laughing cry", keywords: ["lol", "haha", "joy", "tear"] },
    { emoji: "🥺", name: "Pleading cute eyes", keywords: ["please", "puppy", "sad", "cute"] },
    { emoji: "😎", name: "Cool sunglasses", keywords: ["cool", "swag", "sun", "glasses"] },
    { emoji: "🥳", name: "Party celebrating", keywords: ["birthday", "cheers", "celebration", "woo"] },
    { emoji: "🤔", name: "Thinking face", keywords: ["hm", "wonder", "reflect", "brain"] },
    { emoji: "🤫", name: "Whispering quiet", keywords: ["shh", "silence", "secret"] },
    { emoji: "🤯", name: "Mind blown", keywords: ["crazy", "shock", "brain", "exploding"] },
    { emoji: "😴", name: "Sleeping zzz", keywords: ["night", "tired", "bed", "sleep"] },
    { emoji: "🤤", name: "Drooling yummy", keywords: ["delicious", "mouth", "sleepy"] },
    { emoji: "🤡", name: "Clown circus", keywords: ["funny", "fool", "joke"] },
    { emoji: "😈", name: "Smiling devil horn", keywords: ["mischief", "purple", "bad"] },
    { emoji: "💀", name: "Skull dead", keywords: ["spooky", "goth", "death", "skeleton"] },
    { emoji: "👽", name: "Alien ufo", keywords: ["space", "cosmic", "sci-fi"] },
    { emoji: "🤖", name: "Robot head", keywords: ["tech", "ai", "machine"] },
    { emoji: "🧚‍♀️", name: "Fairy wing", keywords: ["fantasy", "magic", "aesthetic", "wings"] },
    { emoji: "🧙‍♂️", name: "Wizard mage", keywords: ["spell", "magic", "sorcerer"] },
    { emoji: "🧑‍🚀", name: "Astronaut space", keywords: ["rocket", "nasa", "star"] },
    { emoji: "🐱", name: "Cat face", keywords: ["cute", "meow", "pets", "kitten"] },
    { emoji: "🙋‍♂️", name: "Man raising hand", keywords: ["question", "answer", "me", "volunteer"] }
  ],
  animals_nature: [
    { emoji: "🐶", name: "Cute puppy dog", keywords: ["pets", "bark", "friend"] },
    { emoji: "🐱", name: "Cute kitty cat", keywords: ["pets", "meow", "aesthetic"] },
    { emoji: "🦊", name: "Red sly fox", keywords: ["forest", "animal", "nature"] },
    { emoji: "🦁", name: "Proud lion king", keywords: ["safari", "wild", "cat"] },
    { emoji: "🦄", name: "Magic unicorn", keywords: ["fantasy", "rainbow", "sparkles"] },
    { emoji: "🐼", name: "Fluffy panda bear", keywords: ["bamboo", "china", "cute"] },
    { emoji: "🐨", name: "Cute koala bear", keywords: ["australia", "eucalyptus", "lazy"] },
    { emoji: "🐰", name: "White rabbit", keywords: ["bunny", "spring", "easter"] },
    { emoji: "🐵", name: "Monkey face", keywords: ["jungle", "wild", "banana"] },
    { emoji: "🐧", name: "Chubby penguin", keywords: ["cold", "antarctic", "ice"] },
    { emoji: "🐥", name: "Baby hatchling chick", keywords: ["bird", "egg", "yellow"] },
    { emoji: "🦋", name: "Blue butterfly", keywords: ["wings", "gothic", "aesthetic", "nature"] },
    { emoji: "🐝", name: "Honeybee buzz", keywords: ["insect", "honey", "flower"] },
    { emoji: "🐙", name: "Purple octopus", keywords: ["sea", "ocean", "tentacles"] },
    { emoji: "🐬", name: "Friendly dolphin", keywords: ["swim", "sea", "ocean", "water"] },
    { emoji: "🌸", name: "Cherry blossom pink", keywords: ["flower", "spring", "cherry"] },
    { emoji: "🌹", name: "Red love rose", keywords: ["romance", "valentines", "floral"] },
    { emoji: "🌻", name: "Golden sunflower", keywords: ["summer", "yellow", "sun"] },
    { emoji: "🍄", name: "Red mushroom cottagecore", keywords: ["fungus", "fairycore", "woods"] },
    { emoji: "🌿", name: "Green leaf herb", keywords: ["garden", "nature", "organic"] },
    { emoji: "🌲", name: "Evergreen pine tree", keywords: ["forest", "woods", "mountain"] },
    { emoji: "🍁", name: "Maple red leaf", keywords: ["autumn", "fall", "canada"] },
    { emoji: "🍀", name: "Four leaf clover luck", keywords: ["st-patricks", "green", "lucky"] }
  ],
  food_drink: [
    { emoji: "🍕", name: "Cheesy pizza slice", keywords: ["cheese", "pepperoni", "dinner", "fastfood"] },
    { emoji: "🍔", name: "Double cheeseburger", keywords: ["patty", "fastfood", "bun", "restaurant"] },
    { emoji: "🍟", name: "Golden french fries", keywords: ["potato", "salt", "snack", "mcdonalds"] },
    { emoji: "🌮", name: "Mexican spicy taco", keywords: ["shell", "meat", "tuesday"] },
    { emoji: "🍣", name: "Fresh sushi roll", keywords: ["japan", "fish", "rice", "seafood"] },
    { emoji: "🍜", name: "Steaming ramen bowl", keywords: ["noodles", "japan", "soup"] },
    { emoji: "🍛", name: "Curry rice platter", keywords: ["curry", "dinner", "spicy"] },
    { emoji: "🍦", name: "Soft serve ice cream", keywords: ["summer", "dessert", "sweet", "cold"] },
    { emoji: "🍩", name: "Glazed pink donut", keywords: ["doughnut", "sweet", "bakery"] },
    { emoji: "🍪", name: "Chocolate chip cookie", keywords: ["baking", "sweet", "milk"] },
    { emoji: "🧁", name: "Tasty baked cupcake", keywords: ["sprinkles", "frosting", "dessert"] },
    { emoji: "🍓", name: "Juicy strawberry", keywords: ["fruit", "red", "sweet", "berry"] },
    { emoji: "🍒", name: "Double cherry bunch", keywords: ["sweet", "aesthetic", "fruit"] },
    { emoji: "🍇", name: "Sweet purple grapes", keywords: ["fruit", "wine", "vines"] },
    { emoji: "🍉", name: "Summer watermelon slice", keywords: ["fruit", "green", "pink", "refreshing"] },
    { emoji: "🥑", name: "Green avocado half", keywords: ["toast", "healthy", "vegan"] },
    { emoji: "☕", name: "Hot brewed coffee", keywords: ["morning", "mug", "cafe", "tea"] },
    { emoji: "🍵", name: "Japanese green tea matcha", keywords: ["cup", "healthy", "warm"] },
    { emoji: "🥤", name: "Sweet boba cup", keywords: ["bubble-tea", "shake", "straw"] },
    { emoji: "🍺", name: "Foamy beer mug", keywords: ["bar", "brew", "cheers", "party"] },
    { emoji: "🍷", name: "Red wine glass", keywords: ["fancy", "grape", "dinner"] }
  ],
  travel_places: [
    { emoji: "🚀", name: "Space travel rocket", keywords: ["space", "nasa", "launch", "moon"] },
    { emoji: "🛸", name: "Alien flying UFO saucer", keywords: ["space", "cosmic", "sci-fi"] },
    { emoji: "✈️", name: "Flying passenger airplane", keywords: ["travel", "vacation", "flight"] },
    { emoji: "🚗", name: "Red passenger car", keywords: ["drive", "road-trip", "traffic"] },
    { emoji: "🚲", name: "Sports bicycle rider", keywords: ["cycle", "fitness", "wheels"] },
    { emoji: "⛲", name: "Water plaza fountain", keywords: ["gardens", "park", "spray"] },
    { emoji: "🗼", name: "Tokyo tower landmark", keywords: ["japan", "effel", "travel"] },
    { emoji: "🗽", name: "Statue of Liberty New York", keywords: ["america", "usa", "monument"] },
    { emoji: "🏰", name: "Medieval stone castle", keywords: ["disney", "palace", "fairy", "vintage"] },
    { emoji: "🏔️", name: "Snowy peak mountain", keywords: ["nature", "climb", "alps", "hiking"] },
    { emoji: "🌋", name: "Erupting hot volcano", keywords: ["lava", "crater", "hawaii"] },
    { emoji: "🏕️", name: "Wilderness camping tent", keywords: ["forest", "outdoor", "nature"] },
    { emoji: "🏖️", name: "Sunny beach umbrella", keywords: ["summer", "sand", "ocean"] },
    { emoji: "🏜️", name: "Arid desert sands", keywords: ["warm", "cactus", "sahara"] },
    { emoji: "🌊", name: "Crashing ocean wave", keywords: ["sea", "surf", "tsunami"] },
    { emoji: "🌌", name: "Cosmic milky way galaxy", keywords: ["stars", "nebula", "universe"] },
    { emoji: "🪐", name: "Ringed Saturn planet", keywords: ["space", "astro", "solar-system"] },
    { emoji: "🌙", name: "Crescent golden moon", keywords: ["night", "sky", "sleep", "dreamy"] },
    { emoji: "☀️", name: "Bright shining sun", keywords: ["sunny", "summer", "warm", "weather"] },
    { emoji: "🌧️", name: "Thundercloud with rain", keywords: ["storm", "weather", "sky"] }
  ],
  activity: [
    { emoji: "⚽", name: "Classic soccer ball", keywords: ["sports", "football", "goal", "pitch"] },
    { emoji: "🏀", name: "Orange basketball", keywords: ["sports", "hoop", "slam", "nba"] },
    { emoji: "🏈", name: "Brown american football", keywords: ["sports", "superbowl", "stadium"] },
    { emoji: "🎾", name: "Green tennis ball", keywords: ["sports", "racket", "match"] },
    { emoji: "🎮", name: "Gaming gamepad controller", keywords: ["play", "gamer", "steam", "playstation"] },
    { emoji: "🕹️", name: "Retro arcade joystick", keywords: ["play", "classic", "atari", "cabinet"] },
    { emoji: " skateboard", name: "Street skateboard deck", keywords: ["skate", "wheels", "ollie", "grunge"] },
    { emoji: "🎨", name: "Artists painter palette", keywords: ["art", "canvas", "brush", "creative"] },
    { emoji: "🎭", name: "Drama performing theater masks", keywords: ["acting", "show", "tragedy", "broadway"] },
    { emoji: "🎤", name: "Vocal singing microphone", keywords: ["karaoke", "audio", "voice", "music"] },
    { emoji: "🎸", name: "Electric guitar instrument", keywords: ["rock", "band", "sound", "music"] },
    { emoji: "🎹", name: "Musical piano keyboard", keywords: ["synth", "keys", "melody", "chords"] },
    { emoji: "🏆", name: "Golden winner trophy", keywords: ["award", "champion", "first"] },
    { emoji: "🎟️", name: "Admission ticket stub", keywords: ["show", "movie", "event"] },
    { emoji: "🎪", name: "Circus tent big top", keywords: ["clown", "show", "fairground"] },
    { emoji: "🎳", name: "Bowling pins and ball", keywords: ["strike", "alley", "game"] }
  ],
  objects: [
    { emoji: "🧸", name: "Soft plush teddy bear", keywords: ["toy", "cute", "fluffy", "gift"] },
    { emoji: "🔮", name: "Mystic crystal ball witch", keywords: ["wizard", "magic", "psychic"] },
    { emoji: "💿", name: "Holographic optical CD compact disc", keywords: ["music", "album", "retro"] },
    { emoji: " cassette", name: "Retro analog cassette tape", keywords: ["music", "lofi", "retro", "90s"] },
    { emoji: "📷", name: "Aperture photo camera", keywords: ["picture", "lens", "shoot"] },
    { emoji: " television", name: "Retro box television set", keywords: ["show", "screen", "crt", "vintage"] },
    { emoji: "💻", name: "Portable laptop software computer", keywords: ["tech", "coding", "web"] },
    { emoji: "📱", name: "Handheld smartphone cell", keywords: ["phone", "screen", "call"] },
    { emoji: "🔋", name: "Green battery charge full", keywords: ["energy", "power", "tech"] },
    { emoji: "🕯️", name: "Wax burning candle flame", keywords: ["goth", "cozy", "dark", "witchy"] },
    { emoji: "🗝️", name: "Ancient golden locking key", keywords: ["historic", "unlock", "secret"] },
    { emoji: "📦", name: "Cardboard package box", keywords: ["mail", "shipping", "amazon", "cargo"] },
    { emoji: "🎁", name: "Ribbon wrapped gift box", keywords: ["present", "holiday", "birthday"] },
    { emoji: "🎈", name: "Floating helium red balloon", keywords: ["party", "celebration", "clown"] },
    { emoji: "🩹", name: "Sticky band-aid medical plaster", keywords: ["heal", "wound", "doctor"] },
    { emoji: "📚", name: "Stacked hardcover reading books", keywords: ["study", "school", "library"] },
    { emoji: "🖊️", name: "Blue ink signature pen", keywords: ["write", "documents", "ink"] },
    { emoji: "💎", name: "Sparkling blue crystal diamond gem", keywords: ["jewelry", "expensive", "luxury"] }
  ],
  symbols: [
    { emoji: "❤️", name: "Solid red heart", keywords: ["love", "valentines", "heart"] },
    { emoji: "💖", name: "Sparkling pink heart", keywords: ["love", "cute", "aesthetic"] },
    { emoji: "🖤", name: "Black heart gothic", keywords: ["emo", "dark", "heart"] },
    { emoji: "🤍", name: "Clean white heart", keywords: ["hope", "pure", "heart"] },
    { emoji: "💔", name: "Broken cracked heart", keywords: ["sad", "pain", "apart", "hurt"] },
    { emoji: "✨", name: "Glimmer golden sparkles", keywords: ["magic", "shiny", "clean", "star"] },
    { emoji: "⭐", name: "Bright yellow star", keywords: ["shiny", "gold", "astro"] },
    { emoji: "💤", name: "Sleeping snoring zzz drift", keywords: ["sleep", "tired", "bed"] },
    { emoji: "💢", name: "Anime anger pop popping vein", keywords: ["mad", "comic", "rage"] },
    { emoji: "💬", name: "Speech talk text balloon bubble", keywords: ["chat", "speak", "sms"] },
    { emoji: "🔄", name: "Circular sync arrows reload", keywords: ["refresh", "cycles", "retry"] },
    { emoji: "♾️", name: "Infinity endless loop limit", keywords: ["math", "forever", "timeless"] },
    { emoji: "⚠️", name: "Yellow warning sign alert", keywords: ["danger", "caution", "hazard"] },
    { emoji: "🌀", name: "Swirl purple cyclone vortex", keywords: ["weather", "magic", "spiral"] },
    { emoji: "🔱", name: "Golden trident scepter symbol", keywords: ["greek", "poseidon", "sea"] },
    { emoji: "🔔", name: "Gold alert ring bell ringer", keywords: ["notify", "sound", "bell"] },
    { emoji: "🎯", name: "Bullseye darts precision board", keywords: ["aim", "goal", "hit"] }
  ],
  flags: [
    { emoji: "🏁", name: "Black-white checkered race flag", keywords: ["finish", "formula-1", "grand-prix"] },
    { emoji: "🚩", name: "Triangular red flag alarm alert", keywords: ["warning", "toxic", "alert"] },
    { emoji: "🏳️‍🌈", name: "Rainbow Pride flag beauty", keywords: ["lgbtq", "love", "gay", "rights"] },
    { emoji: "🏳️‍⚧️", name: "Transgender Flag pastel colors", keywords: ["lgbtq", "trans", "pride"] },
    { emoji: "🇺🇸", name: "United States Flag stars stripes", keywords: ["usa", "america", "us", "patriots"] },
    { emoji: "🇬🇧", name: "United Kingdom Union Jack Flag", keywords: ["uk", "britain", "england", "london"] },
    { emoji: "🇯🇵", name: "Japan Rising Sun Flag disk", keywords: ["tokyo", "asia", "anime"] },
    { emoji: "🇰🇷", name: "South Korea Flag yin-yang bars", keywords: ["seoul", "kpop", "asia"] },
    { emoji: "🇨🇦", name: "Canada Maple Leaf Flag", keywords: ["toronto", "cold", "north"] },
    { emoji: "🇫🇷", name: "France Blue White Red Tricolor Flag", keywords: ["paris", "europe", "french"] },
    { emoji: "🇩🇪", name: "Germany Black Red Gold Flag", keywords: ["berlin", "europe", "german"] },
    { emoji: "🇮🇹", name: "Italy Green White Red Tricolor Flag", keywords: ["rome", "europe", "italian", "pasta"] },
    { emoji: "🇪🇸", name: "Spain Red Yellow Flag coat-arms", keywords: ["madrid", "europe", "spanish"] },
    { emoji: "🇦🇺", name: "Australia Flag Southern Cross", keywords: ["sydney", "down-under", "outback"] },
    { emoji: "🇧🇷", name: "Brazil Green Yellow Flag diamond", keywords: ["rio", "soccer", "carnival"] },
    { emoji: "🇨🇳", name: "China Red Flag yellow stars", keywords: ["beijing", "asia", "chinese"] },
    { emoji: "🇮🇳", name: "India Tricolour Flag ashoka wheel", keywords: ["dehli", "asia", "indian"] },
    { emoji: "🇲🇽", name: "Mexico Flag eagle cactus tricolor", keywords: ["cancun", "latin-america", "mexican"] },
    { emoji: "🇻🇳", name: "Vietnam Red Flag yellow star center", keywords: ["hanoi", "asia", "vietnamese"] }
  ]
};

// Aesthetic Combination Groups
interface AestheticCombo {
  title: string;
  niche: string;
  combination: string;
}

const AestheticCombos: AestheticCombo[] = [
  { title: "Calm Serene Clouds", niche: "Soft Dreamy", combination: "☁️🌸✨🧸🍰" },
  { title: "Golden Hour Warmth", niche: "Vintage Warm", combination: "🌅🌻☕🍂🍯" },
  { title: "Cosmic Nebula", niche: "Galaxy Cyber", combination: "🪐✨🌙🛸🌌" },
  { title: "Cottagecore Woods", niche: "Fairy Nature", combination: "🧚‍♀️🍄🌿🌷🦋" },
  { title: "Midnight Whispers", niche: "Gothic Darkness", combination: "🖤🕸️🥀💀🍷" },
  { title: "Summer Tide Pool", niche: "Ocean Sailor", combination: "🌊🐳🎐🍧🐚" },
  { title: "Vaporwave Retro", niche: "80s Cyber", combination: "👾🎮🕹️📼🎵" },
  { title: "Indie Rock Sunset", niche: "Alternative Grunge", combination: "🎸🌻🛹🔥⛓️" },
  { title: "Kawaii Tea Lounge", niche: "Cute Pastel", combination: "🍡🍧🍵🐇🌸" },
  { title: "Stardust Alchemist", niche: "Mystic Witchy", combination: "🔮🕯️🗝️🦉✨" },
  { title: "Romantic Poet", niche: "Dark Academia", combination: "✉️📜🕯️🥀✒️" },
  { title: "Tropical Surf", niche: "Summertime Glow", combination: "🍹🌴☀️🏄‍♂️🍍" }
];

// Curated Japanese Kaomojis (Emoticons)
interface KaomojiItem {
  symbols: string;
  mood: string;
  meaning: string;
}

const CuratedKaomojis: KaomojiItem[] = [
  // Joy / Cute
  { symbols: "(❁´◡`❁)", mood: "happy", meaning: "Dainty flower smile" },
  { symbols: "(๑•̀ㅂ•́)و✧", mood: "happy", meaning: "Victory fist pump" },
  { symbols: "(˵ •̀ ᴗ - ˵) ✧", mood: "happy", meaning: "Adorable wink eye wink" },
  { symbols: "(*＾▽＾*)", mood: "happy", meaning: "Big joyful cheek smile" },
  { symbols: "(◕‿◕✿)", mood: "happy", meaning: "Bright cute blossom flower" },
  { symbols: "٩(◕‿◕)۶", mood: "happy", meaning: "Double arm wave of joy" },
  
  // Romance / Hearts
  { symbols: "(✿ ♡ ‿ ♡)", mood: "love", meaning: "Intense heart eyes" },
  { symbols: "(♥ω♥*)", mood: "love", meaning: "Blushing head over heels" },
  { symbols: "(。・ω・。)ノ♡", mood: "love", meaning: "Sending sweet envelope heart" },
  { symbols: "(づ￣ ³￣)づ", mood: "love", meaning: "Pouty lips flying kiss" },
  { symbols: "(っ.❛ ᴗ ❛.)っ", mood: "love", meaning: "Warm cuddly secure hug" },

  // Confusion / Shrugs
  { symbols: "┐(‘～`;)┌", mood: "confused", meaning: "Doubtful clueless shrug" },
  { symbols: "¯\\_(ツ)_/¯", mood: "confused", meaning: "Classic carefree shrug" },
  { symbols: "(⊙_☉)", mood: "confused", meaning: "Big sweat bead cross-eyed" },
  { symbols: "(o_O)", mood: "confused", meaning: "One raised eyebrow gaze" },
  { symbols: "⊙.☉", mood: "confused", meaning: "Stunned high shock value" },

  // Sadness / Sorrows
  { symbols: "(ಥ﹏ಥ)", mood: "sad", meaning: "Gushing waterfall of tears" },
  { symbols: "(╥_╥)", mood: "sad", meaning: "Parallel crying streams" },
  { symbols: "(｡╯3╰｡)", mood: "sad", meaning: "Pity party cute sad face" },
  { symbols: "(/_\\)", mood: "sad", meaning: "Ashamed eyes covered" },
  { symbols: "ヘ（。□°）ヘ", mood: "sad", meaning: "Full dramatic breakdown" },

  // Angry / Mocking
  { symbols: "(╬ ಠ益ಠ)", mood: "angry", meaning: "Gritted teeth veins popping" },
  { symbols: "(＃｀д´)", mood: "angry", meaning: "Furious pointing hand" },
  { symbols: "(ノಠ益ಠ)ノ彡┻━┻", mood: "angry", meaning: "Ultimate furious table flip" },
  { symbols: "(・`ω´・)", mood: "angry", meaning: "Cute animal growl" },
  { symbols: "눈_눈", mood: "angry", meaning: "Side-eye glare of disapproval" }
];

export default function EmojiHub({ triggerToast }: { triggerToast: (msg: string) => void }) {
  // Navigation tabs inside Emoji Sandbox
  // "directory" | "combinations" | "kaomoji" | "decorator"
  const [activeSubTab, setActiveSubTab] = useState<"directory" | "combinations" | "kaomoji" | "decorator">("directory");
  
  // States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [directoryCat, setDirectoryCat] = useState<string>("all");
  const [kaomojiMoodFilter, setKaomojiMoodFilter] = useState<string>("all");
  const [recentCopies, setRecentCopies] = useState<string[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Favorites state synced with localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("emoji_favs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (emoji: string) => {
    setFavorites(prev => {
      const next = prev.includes(emoji) ? prev.filter(e => e !== emoji) : [...prev, emoji];
      localStorage.setItem("emoji_favs", JSON.stringify(next));
      return next;
    });
  };

  // Selected Inspect Emoji & Scratchpad Builder
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiItem | null>(() => {
    return CuratedEmojis["smileys_people"]?.[0] || null;
  });

  const [scratchpad, setScratchpad] = useState<string>("");

  const appendToScratchpad = (emoji: string) => {
    setScratchpad(prev => prev + emoji);
    triggerToast(`Added ${emoji} to custom scratchpad!`);
  };

  // Dynamic count calculators
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    let total = 0;
    Object.keys(CuratedEmojis).forEach(cat => {
      const len = CuratedEmojis[cat]?.length || 0;
      counts[cat] = len;
      total += len;
    });
    counts["all"] = total;
    counts["favorites"] = favorites.length;
    return counts;
  }, [favorites]);
  
  // Interactive Decorator parameters
  const [decoratorInput, setDecoratorInput] = useState<string>("Retro Wave");
  const [decoratorStyle, setDecoratorStyle] = useState<string>("sandwich-star");
  const [customDecoratorSymbol, setCustomDecoratorSymbol] = useState<string>("✨");
  
  // Copy state triggers
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Dynamic decorator result preview calculation
  const decoratedResult = useMemo(() => {
    if (!decoratorInput.trim()) return "(Type some words in the input slot below)";

    const cleanInput = decoratorInput.trim();
    const sym = customDecoratorSymbol || "✨";

    switch (decoratorStyle) {
      case "sandwich":
        return `${sym} ${cleanInput} ${sym}`;
      case "sandwich-double":
        return `${sym}${sym} ${cleanInput} ${sym}${sym}`;
      case "sandwich-star":
        return `✨*･゜ﾟ･*:.｡..｡.:* ${cleanInput} *:.｡. .｡.:*･゜ﾟ･*✨`;
      case "spaced":
        // A•e•s•t•h•e•t•i•c
        return cleanInput.split("").join("·");
      case "star-spaced":
        // A✧e✧s✧t✧h✧e✧t✧i✧c
        return cleanInput.split("").filter(c => c !== " ").join(` ${sym} `);
      case "clap":
        // Word 👏 Clap 👏 Pattern
        return cleanInput.split(" ").join(` 👏 `);
      case "brackets":
        // 【 Aesthetic 】
        return `【 ${cleanInput} 】`;
      case "cyber-box":
        return `┌───✨───┐\n  ${cleanInput}\n└───✨───┘`;
      case "wave":
        return `﹏﹋﹏ ${cleanInput} ﹏﹋﹏`;
      default:
        return `${sym} ${cleanInput} ${sym}`;
    }
  }, [decoratorInput, decoratorStyle, customDecoratorSymbol]);

  // Handle immediate clip board integration
  const performCopy = (str: string) => {
    try {
      navigator.clipboard.writeText(str);
      setCopiedText(str);
      triggerToast(`Copied "${str}" to clipboard!`);
      
      // Update recent history
      setRecentCopies(prev => {
        const filtered = prev.filter(item => item !== str);
        const next = [str, ...filtered];
        return next.slice(0, 16); // cap at 16
      });

      setTimeout(() => setCopiedText(null), 2000);
    } catch(err) {
      console.error(err);
    }
  };

  // Filter Emojis globally
  const filteredEmojis = useMemo(() => {
    const list: EmojiItem[] = [];
    const query = searchQuery.trim().toLowerCase();

    if (directoryCat === "favorites") {
      Object.keys(CuratedEmojis).forEach(cat => {
        CuratedEmojis[cat].forEach(item => {
          if (favorites.includes(item.emoji)) {
            // avoid duplicate instances
            if (!list.some(x => x.emoji === item.emoji)) {
              list.push(item);
            }
          }
        });
      });
    } else {
      // Collapse categories together
      Object.keys(CuratedEmojis).forEach(cat => {
        if (directoryCat === "all" || directoryCat === cat) {
          list.push(...CuratedEmojis[cat]);
        }
      });
    }

    if (!query) return list;

    // Filter by name or keywords
    return list.filter(item => {
      return (
        item.emoji === query ||
        item.name.toLowerCase().includes(query) ||
        item.keywords.some(k => k.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, directoryCat, favorites]);

  // Filter Kaomojis
  const filteredKaomojis = useMemo(() => {
    if (kaomojiMoodFilter === "all") return CuratedKaomojis;
    return CuratedKaomojis.filter(k => k.mood === kaomojiMoodFilter);
  }, [kaomojiMoodFilter]);

  // Clear search field
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div id="emoji-combinator-hub-element" className="space-y-6">
      
      {/* SECTION DESCRIPTION LOGO */}
      <div className="bg-gradient-to-r from-pink-900 to-indigo-950 text-white rounded-2xl p-5 md:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black bg-pink-500 text-white px-2.5 py-0.5 rounded-full select-none">
              Visual Spark
            </span>
            <h2 className="text-base md:text-lg font-black tracking-tight font-sans">
              Emojis, Kaomojis, & Aesthetic Combos
            </h2>
          </div>
          <p className="text-xs text-pink-200 font-medium">
            Browse and search handpicked bio combos, emoticons, cute Japanese faces, and type beautiful emoji scatter strings.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            id="subtab-directory-trigger"
            onClick={() => setActiveSubTab("directory")}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "directory" ? "bg-white text-indigo-950 shadow-xs" : "text-white bg-white/10 hover:bg-white/20"
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>Search Emojis</span>
          </button>
          <button
            id="subtab-combinations-trigger"
            onClick={() => setActiveSubTab("combinations")}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "combinations" ? "bg-white text-indigo-950 shadow-xs" : "text-white bg-white/10 hover:bg-white/20"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cute Combos</span>
          </button>
        </div>
      </div>

      {/* QUICK SECONDARY NAV BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200/60 max-w-lg">
          <button
            onClick={() => setActiveSubTab("directory")}
            className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition flex items-center gap-1.5 ${
              activeSubTab === "directory" ? "bg-white text-gray-900 shadow-3xs" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Smile className="w-3.5 h-3.5 text-pink-600" />
            Directory
          </button>
          <button
            onClick={() => setActiveSubTab("combinations")}
            className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition flex items-center gap-1.5 ${
              activeSubTab === "combinations" ? "bg-white text-gray-900 shadow-3xs" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-pink-600" />
            Aesthetic Combos
          </button>
          <button
            onClick={() => setActiveSubTab("kaomoji")}
            className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition flex items-center gap-1.5 ${
              activeSubTab === "kaomoji" ? "bg-white text-gray-900 shadow-3xs" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-pink-600" />
            Kaomoji (顔文字)
          </button>
          <button
            onClick={() => setActiveSubTab("decorator")}
            className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition flex items-center gap-1.5 ${
              activeSubTab === "decorator" ? "bg-white text-gray-900 shadow-3xs" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-pink-600" />
            Text Decorator
          </button>
        </div>

        {/* RECENT CLIPBOARD TAPS */}
        {recentCopies.length > 0 && (
          <div className="flex items-center gap-2 max-w-sm overflow-hidden text-ellipsis">
            <span className="text-[10px] font-bold text-gray-400 uppercase select-none font-mono shrink-0">Recent:</span>
            <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
              {recentCopies.slice(0, 7).map((str, idx) => (
                <button
                  key={idx}
                  onClick={() => performCopy(str)}
                  className="bg-gray-100 hover:bg-indigo-50 border border-gray-200 text-xs px-2 py-1 rounded-md transition duration-150 font-mono text-gray-700 font-bold shrink-0 cursor-pointer"
                  title="Click to copy again"
                >
                  {str.length > 8 ? `${str.substring(0, 6)}..` : str}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RENDER VIEWFLOW CORES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* VIEW CORE 1: EMOJI DIRECTORY */}
        {activeSubTab === "directory" && (
          <div className="lg:col-span-12 space-y-6">
            
            {/* SEARCH AND SCOPE FILTER PANEL */}
            <div className="bg-white border border-gray-250 p-5 rounded-2xl shadow-sm space-y-4">
              
              {/* Category switches with Icons and Dynamic Counts */}
              <div className="flex gap-1.5 flex-wrap w-full">
                {[
                  { id: "all", label: "All Sparkles", icon: "✨" },
                  { id: "smileys_people", label: "Smileys & People", icon: "😊" },
                  { id: "animals_nature", label: "Animals & Nature", icon: "🦊" },
                  { id: "food_drink", label: "Food & Drink", icon: "🍹" },
                  { id: "travel_places", label: "Travel & Places", icon: "🛸" },
                  { id: "activity", label: "Activity", icon: "🎮" },
                  { id: "objects", label: "Objects", icon: "💎" },
                  { id: "symbols", label: "Symbols", icon: "💖" },
                  { id: "flags", label: "Flags", icon: "🚩" },
                  { id: "favorites", label: "Favorites", icon: "⭐" }
                ].map(cat => {
                  const isActive = directoryCat === cat.id;
                  const count = categoryCounts[cat.id] || 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setDirectoryCat(cat.id)}
                      className={`text-[11px] px-3.5 py-2 font-bold rounded-xl transition duration-150 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-sm scale-98"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <span className="text-sm select-none">{cat.icon}</span>
                      <span>{cat.label}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive ? "bg-white/20 text-white font-extrabold" : "bg-gray-200 text-gray-500"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Input text query & Hot suggestion pills */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-gray-100 pt-4">
                
                {/* Hot Query suggestion pills */}
                <div className="flex flex-wrap gap-1.5 items-center w-full md:flex-1">
                  <span className="text-[10px] font-mono uppercase font-black text-gray-400 select-none mr-1">Hot Tags:</span>
                  {[
                    { label: "🌸 soft", query: "pink" },
                    { label: "🪐 cosmic", query: "space" },
                    { label: "🌿 nature", query: "forest" },
                    { label: "🧁 sweet", query: "sweet" },
                    { label: "🎮 retro", query: "retro" },
                    { label: "🔥 alternative", query: "goth" },
                    { label: "🔮 witchy", query: "magic" },
                    { label: "🍒 aesthetic", query: "cute" }
                  ].map((vibe, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(vibe.query)}
                      className={`text-[10px] px-2.5 py-1 rounded-md transition font-semibold cursor-pointer border ${
                        searchQuery === vibe.query
                          ? "bg-indigo-50 border-indigo-300 text-indigo-750"
                          : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600"
                      }`}
                    >
                      {vibe.label}
                    </button>
                  ))}
                </div>

                {/* Input text field search */}
                <div className="relative w-full md:w-80 shrink-0">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search: smile, blue, cat, star..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs pl-10 pr-9 bg-gray-50 border border-gray-250 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-pink-500 font-medium placeholder:text-gray-400 text-gray-800"
                  />
                  
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>

            </div>

            {/* SPLIT SCREEN GRID INTERFACES */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* PRIMARY GRID CONTAINER & SCRATCHPAD (8 of 12 columns) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* RESULTS GRIDS BAR */}
                <div className="bg-white border border-gray-250 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3 select-none">
                    <div>
                      <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider select-none">
                        Interactive Copy Grid ({filteredEmojis.length} Matches Found)
                      </h3>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                        Selected items will automatically lock focus in the Inspector panel on your right.
                      </p>
                    </div>
                    <span className="text-[10px] text-indigo-600 bg-indigo-50 font-bold px-2.5 py-1 rounded-md max-w-max self-start sm:self-auto uppercase select-none">
                      {directoryCat === "favorites" ? "⭐ STARRED RECON" : `${directoryCat.toUpperCase().replace("_", " & ")} COLLECTION`}
                    </span>
                  </div>

                  {filteredEmojis.length > 0 ? (
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 max-h-[520px] overflow-y-auto pr-1">
                      {filteredEmojis.map((item, idx) => {
                        const isCopied = copiedText === item.emoji;
                        const isSelected = selectedEmoji?.emoji === item.emoji;
                        return (
                          <button
                            key={`${item.emoji}-${idx}`}
                            id={`emoji-btn-${item.emoji}`}
                            onClick={() => {
                              setSelectedEmoji(item);
                              performCopy(item.emoji);
                            }}
                            className={`aspect-square p-2 border rounded-xl flex flex-col items-center justify-center transition duration-150 relative group cursor-pointer ${
                              isSelected
                                ? "bg-indigo-50/60 border-indigo-600 ring-2 ring-indigo-600/25 scale-102"
                                : isCopied 
                                  ? "bg-pink-50 border-pink-500 shadow-2xs" 
                                  : "bg-gray-50/50 border-gray-200 hover:border-pink-300 hover:bg-white"
                            }`}
                            title={`${item.name} (${item.keywords.join(", ")})`}
                          >
                            <span className="text-2xl select-all">{item.emoji}</span>
                            <span className="text-[8px] font-mono mt-1 text-gray-400 line-clamp-1 select-none">
                              {item.name.split(" ")[0]}
                            </span>

                            {isCopied && (
                              <div className="absolute top-1 right-1 bg-pink-600 text-white rounded-full p-0.5 shadow-2xs" style={{ fontSize: "6px" }}>
                                <Check className="w-2 h-2" />
                              </div>
                            )}

                            {favorites.includes(item.emoji) && !isCopied && (
                              <div className="absolute top-1 right-1 text-yellow-500" style={{ fontSize: "7px" }}>
                                ⭐
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-xl space-y-2 border border-gray-150-grid">
                      <div className="text-3xl">🧩</div>
                      <p className="text-xs text-gray-500 font-extrabold">No emojis found matching "{searchQuery}"</p>
                      <p className="text-[10px] text-gray-400 font-medium font-sans">Try resizing keywords or clear filters on top.</p>
                    </div>
                  )}
                </div>

                {/* TEXT / COMBO SCRATCHPAD BAR (INTERACTIVE SCRATCHPAD) */}
                <div className="bg-gradient-to-r from-indigo-50 to-pink-50 border border-gray-250 rounded-2xl p-5 shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between select-none">
                    <div>
                      <h4 className="text-xs font-black text-gray-800 flex items-center gap-1.5 select-none">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        Bio Combo Scratchpad Builder
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium">
                        Click on emojis above to focus them, attach combinations, add custom spacing, and copy to clipboard instantly.
                      </p>
                    </div>

                    {scratchpad.length > 0 && (
                      <button
                        onClick={() => setScratchpad("")}
                        className="text-[10px] text-red-500 hover:text-red-700 font-bold bg-white/60 border border-red-200 px-2.5 py-1 rounded-md transition cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="flex-1 bg-white border border-gray-250 rounded-xl p-3 text-sm font-bold tracking-widest placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-800"
                      value={scratchpad}
                      onChange={(e) => setScratchpad(e.target.value)}
                      placeholder="Click emojis to assemble your custom biome chain here..."
                    />

                    <button
                      onClick={() => {
                        if (!scratchpad) {
                          triggerToast("Input is currently empty. Insert some beautiful emojis first!");
                          return;
                        }
                        performCopy(scratchpad);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Combo</span>
                    </button>
                  </div>

                  {/* PRESET ACTION SPACERS */}
                  <div className="flex flex-wrap gap-1.5 items-center select-none">
                    <span className="text-[9px] font-mono uppercase font-black text-gray-400 mr-1">Quick Spacers:</span>
                    {[
                      { label: "✦ Space ✦", insert: " ✦ " },
                      { label: "✿ Flower ✿", insert: " ✿ " },
                      { label: "✨ Glitter ✨", insert: " ✨ " },
                      { label: "· Dot ·", insert: " · " },
                      { label: "☄️ Meteor", insert: " ☄️ " },
                      { label: "🪐 Rings", insert: " 🪐 " }
                    ].map((spacer, idx) => (
                      <button
                        key={idx}
                        onClick={() => setScratchpad(prev => prev + spacer.insert)}
                        className="text-[10px] bg-white border border-gray-200 hover:border-indigo-300 text-gray-600 px-2.5 py-1 rounded-md transition cursor-pointer font-medium"
                      >
                        {spacer.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* INTERACTIVE DETAIL INSPECTOR (4 of 12 columns) */}
              <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-6">
                
                {selectedEmoji ? (
                  <div className="bg-white border border-gray-250 rounded-2xl p-5 shadow-xs space-y-5">
                    
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 select-none">
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase font-mono">
                        Emoji Inspector
                      </span>
                      <span className="text-[9px] text-gray-400 font-medium">Focused View</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50/40 via-white to-pink-50/40 border border-gray-200/60 rounded-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                      
                      <span className="text-7xl mb-4 select-all transform hover:scale-110 transition duration-300 relative z-10 filter drop-shadow-xs active:scale-95 cursor-grab">
                        {selectedEmoji.emoji}
                      </span>
                      <span className="text-xs font-black text-gray-800 text-center font-sans tracking-tight relative z-10">
                        {selectedEmoji.name}
                      </span>
                      <span className="text-[9px] text-gray-400 lowercase font-mono mt-1 font-semibold select-all">
                        {selectedEmoji.emoji.split("").map(c => `U+${c.charCodeAt(0).toString(16).toUpperCase()}`).join(" ")}
                      </span>
                    </div>

                    {/* ACTION TRIGGERS TRAY */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <button
                        onClick={() => performCopy(selectedEmoji.emoji)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Unicode</span>
                      </button>
                      
                      <button
                        onClick={() => toggleFavorite(selectedEmoji.emoji)}
                        className={`text-xs font-bold p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                          favorites.includes(selectedEmoji.emoji)
                            ? "bg-amber-500 hover:bg-amber-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                        }`}
                      >
                        <span>★</span>
                        <span>{favorites.includes(selectedEmoji.emoji) ? "Starred" : "Favorite"}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => appendToScratchpad(selectedEmoji.emoji)}
                      className="w-full bg-pink-50 hover:bg-pink-100 border border-pink-200/60 text-pink-700 font-bold text-xs p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Attach to Scratchpad</span>
                    </button>

                    {/* METADATA TAGS SECTION */}
                    <div className="space-y-2 border-t border-gray-100 pt-4">
                      <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-wider select-none">
                        Smart Query Keywords
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedEmoji.keywords.map((kw, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSearchQuery(kw)}
                            className="text-[10px] bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 text-gray-500 border border-gray-250 px-2.5 py-1 rounded-md transition cursor-pointer font-medium"
                            title={`Search for "${kw}"`}
                          >
                            #{kw}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* MATCHING COMBOS ENGINE */}
                    <div className="space-y-2 border-t border-gray-100 pt-4">
                      <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-wider select-none">
                        Combos with this emoji
                      </h5>
                      
                      {(() => {
                        const matching = AestheticCombos.filter(c => c.combination.includes(selectedEmoji.emoji));
                        if (matching.length > 0) {
                          return (
                            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                              {matching.map((combo, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => performCopy(combo.combination)}
                                  className="p-2 border border-gray-100 bg-gray-50 hover:border-pink-300 hover:bg-white rounded-lg transition text-left cursor-pointer flex items-center justify-between gap-2"
                                  title="Click to copy combo"
                                >
                                  <div className="truncate flex-1">
                                    <span className="text-[9px] font-black text-pink-600 block leading-none">{combo.niche}</span>
                                    <span className="text-[10.5px] font-bold text-gray-750 block truncate mt-0.5">{combo.title}</span>
                                  </div>
                                  <span className="text-xs font-mono font-bold text-gray-800 shrink-0">{combo.combination}</span>
                                </div>
                              ))}
                            </div>
                          );
                        }
                        return (
                          <p className="text-[10px] text-gray-400 font-medium leading-normal italic">
                            No curated biomes feature this emoji yet. Type or click above to build a custom array!
                          </p>
                        );
                      })()}
                    </div>

                  </div>
                ) : (
                  <div className="bg-white border border-gray-250 rounded-2xl p-8 shadow-xs text-center space-y-2 select-none">
                    <span className="text-4xl text-gray-300 block">👀</span>
                    <h4 className="text-xs font-black text-gray-700">No Emoji Selected</h4>
                    <p className="text-[10px] text-gray-400 leading-relaxed font-medium font-sans">To unlock detailed statistics and direct attachments, select any emoji card in the viewport grid on your left.</p>
                  </div>
                )}
                
              </div>

            </div>

          </div>
        )}

        {/* VIEW CORE 2: CUTE AESTHETIC COMBINATIONS */}
        {activeSubTab === "combinations" && (
          <div className="lg:col-span-12 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {AestheticCombos.map((combo, idx) => {
                const isCopied = copiedText === combo.combination;
                return (
                  <div 
                    key={idx} 
                    id={`combo-card-${idx}`}
                    className="bg-white border border-gray-200 p-5 rounded-2xl shadow-2xs flex flex-col justify-between hover:border-pink-300 transition duration-150 gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full uppercase select-none">
                          {combo.niche}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">#{idx + 1}</span>
                      </div>
                      <h4 className="text-xs font-black text-gray-900 leading-tight">
                        {combo.title}
                      </h4>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between gap-3">
                      <span className="text-xl font-bold tracking-widest select-all block py-1 font-sans">
                        {combo.combination}
                      </span>

                      <button
                        id={`combo-copy-btn-${idx}`}
                        onClick={() => performCopy(combo.combination)}
                        className={`p-2 rounded-lg transition shrink-0 cursor-pointer ${
                          isCopied 
                            ? "bg-emerald-500 text-white" 
                            : "bg-gray-200 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600"
                        }`}
                        title="Copy combo string"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-pink-50/50 border border-pink-100 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-xs font-black text-pink-905 flex items-center gap-1.5 select-none">
                  <Compass className="w-4 h-4 text-pink-600" />
                  Where do these combos go?
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
                  Copy and drop these elegant biomes directly into your **Instagram bio, TikTok account captions, Tumblr layout briefs, or Discord nicknames** to immediately elevate your aesthetic standing.
                </p>
              </div>

              <button
                onClick={() => {
                  const combos = AestheticCombos.map(c => c.combination);
                  const random = combos[Math.floor(Math.random() * combos.length)];
                  performCopy(random);
                }}
                className="text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 select-none self-start md:self-auto shadow-sm"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Random Combo</span>
              </button>
            </div>

          </div>
        )}

        {/* VIEW CORE 3: JAPANESE KAOMOJI FACE BUILDER */}
        {activeSubTab === "kaomoji" && (
          <div className="lg:col-span-12 space-y-6">
            
            {/* MOOD FILTERING ROW */}
            <div className="bg-white border border-gray-250 p-4 rounded-xl shadow-xs flex items-center justify-between gap-4 flex-wrap">
              <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-250/50">
                {[
                  { id: "all", label: "Show All" },
                  { id: "happy", label: "Happy / Cute ๑" },
                  { id: "love", label: "Love / Hearts ♡" },
                  { id: "confused", label: "Shrugs / Confused" },
                  { id: "sad", mood: "sad", label: "Sorrows / Cry T__T" },
                  { id: "angry", label: "Angry / Rage" }
                ].map((moodFilter) => (
                  <button
                    key={moodFilter.id}
                    onClick={() => setKaomojiMoodFilter(moodFilter.id)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-lg cursor-pointer transition ${
                      kaomojiMoodFilter === moodFilter.id
                        ? "bg-white text-gray-950 shadow-3xs"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {moodFilter.label}
                  </button>
                ))}
              </div>

              <span className="text-[10px] font-mono text-gray-400 uppercase font-black">
                Japan Standard (顔文字) Emoticons
              </span>
            </div>

            {/* THE DIRECTORY LIST */}
            <div className="bg-white border border-gray-250 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredKaomojis.map((kq, idx) => {
                  const isCopied = copiedText === kq.symbols;
                  return (
                    <div
                      key={idx}
                      id={`kaomoji-card-${idx}`}
                      onClick={() => performCopy(kq.symbols)}
                      className={`p-4 border rounded-2xl flex flex-col justify-between min-h-[6rem] transition cursor-pointer text-left select-all group relative ${
                        isCopied
                          ? "bg-pink-50/50 border-pink-400 shadow-2xs"
                          : "bg-gray-50/50 border-gray-200 hover:border-pink-200 hover:bg-white"
                      }`}
                    >
                      <span className="text-sm font-semibold text-gray-900 font-mono tracking-wide mb-3 select-all truncate block">
                        {kq.symbols}
                      </span>

                      <div className="flex items-center justify-between w-full mt-1">
                        <span className="text-[9px] text-gray-400 capitalize">{kq.meaning}</span>
                        {isCopied ? (
                          <span className="text-[8px] font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded-md">Copied!</span>
                        ) : (
                          <span className="text-[8px] font-bold text-gray-400 uppercase group-hover:text-pink-600 transition">Tap to Copy</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* VIEW CORE 4: EMOJI AUTO DECORATOR */}
        {activeSubTab === "decorator" && (
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Input Config parameters on Left (Takes 4 columns) */}
            <div className="lg:col-span-5 bg-white border border-gray-250 p-5 rounded-2xl shadow-sm space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-750 block select-none">
                  Step 1: Enter Custom Phrase:
                </label>
                <input
                  id="decorator-input-field"
                  type="text"
                  maxLength={50}
                  className="w-full text-xs font-semibold bg-gray-50 border border-gray-250 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-pink-500 text-gray-800"
                  value={decoratorInput}
                  onChange={(e) => setDecoratorInput(e.target.value)}
                  placeholder="e.g., Angel Baby, Cyber Grunge..."
                />
              </div>

              {/* STYLES SELECTOR */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <label className="text-xs font-black text-gray-750 block select-none">
                  Step 2: Choose Flair Silhouette:
                </label>

                <div className="space-y-1.5">
                  {[
                    { id: "sandwich", label: "Sandwich Wrap", desc: "✨ Aesthetic ✨" },
                    { id: "sandwich-double", label: "Double Sandwich Wrap", desc: "✨✨ Aesthetic ✨✨" },
                    { id: "sandwich-star", label: "Fairy Sparkle Wave", desc: "✨*･゜ﾟ･*:.｡..｡.:* Aesthetic *:.｡. .｡.:*･゜ﾟ･*✨" },
                    { id: "spaced", label: "Monospace Dots", desc: "A·e·s·t·h·e·t·i·c" },
                    { id: "star-spaced", label: "Sparkle-character Scatter", desc: "A ✨ e ✨ s ✨ t ✨ h" },
                    { id: "clap", label: "Clap Emphasis", desc: "Aesthetic 👏 Font" },
                    { id: "brackets", label: "Traditional Bracket", desc: "【 Aesthetic 】" },
                    { id: "cyber-box", label: "Terminal Box Case", desc: "┌───✨───┐" },
                    { id: "wave", label: "Wave Ripple Border", desc: "﹏﹋﹏ Aesthetic ﹏﹋﹏" }
                  ].map(decor => {
                    const isSelected = decoratorStyle === decor.id;
                    return (
                      <button
                        key={decor.id}
                        id={`decor-style-btn-${decor.id}`}
                        onClick={() => setDecoratorStyle(decor.id)}
                        className={`w-full text-left p-3 rounded-xl border transition duration-150 flex flex-col cursor-pointer ${
                          isSelected 
                            ? "bg-pink-50/60 border-pink-400" 
                            : "bg-white border-gray-150 hover:border-pink-200"
                        }`}
                      >
                        <span className="text-xs font-black text-gray-800 leading-tight">{decor.label}</span>
                        <span className="text-[10px] text-gray-400 mt-1 font-mono tracking-tight">{decor.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* OPTIONAL CUSTOM GLYPH REPLACEMENT */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <label className="text-xs font-black text-gray-750 block select-none">
                  Step 3: Custom Glyph Anchor:
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {["✨", "🌸", "🌷", "🧸", "🌌", "🌙", "🦋", "🍄", "🥀", "🤍"].map((sym) => (
                    <button
                      key={sym}
                      onClick={() => setCustomDecoratorSymbol(sym)}
                      className={`p-2 border rounded-lg transition text-centers ${
                        customDecoratorSymbol === sym
                          ? "bg-pink-600 text-white border-pink-605 shadow-3xs"
                          : "bg-gray-50 border-gray-150 hover:bg-white hover:border-pink-200"
                      }`}
                    >
                      <span className="text-sm">{sym}</span>
                    </button>
                  ))}
                </div>
                
                <input
                  type="text"
                  maxLength={4}
                  placeholder="Or type custom symbol (e.g. ✿, ★)..."
                  className="w-full text-xs text-center border border-gray-200 p-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-pink-500 font-mono mt-2"
                  value={customDecoratorSymbol}
                  onChange={(e) => setCustomDecoratorSymbol(e.target.value)}
                />
              </div>

            </div>

            {/* Pre view box on Right (Takes 7 columns) */}
            <div className="lg:col-span-7 bg-gray-950 border border-gray-900 rounded-2xl shadow-xl flex flex-col overflow-hidden">
              
              {/* Header */}
              <div className="bg-gray-900/90 py-3.5 px-4 border-b border-gray-850 flex items-center justify-between">
                <div className="flex items-center gap-1.5 select-none">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full inline-block"></span>
                  <span className="w-2.5 h-2.5 bg-amber-400 rounded-full inline-block"></span>
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block"></span>
                  <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider pl-1.5">
                    Decorator Live Render Board
                  </span>
                </div>
                
                <span className="text-[9px] font-black uppercase text-indigo-400 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-900">
                  {decoratorStyle}
                </span>
              </div>

              {/* Pre Display Panel */}
              <div className="p-8 bg-gray-950 min-h-[16rem] flex flex-col justify-center items-center text-center">
                <div className="bg-black/40 border border-pink-950/40 p-6 rounded-2xl overflow-x-auto select-all max-w-full">
                  <pre className="font-mono text-sm leading-relaxed text-pink-400 select-all font-black whitespace-pre-wrap break-all px-4">
                    {decoratedResult}
                  </pre>
                </div>

                <span className="text-[10px] text-gray-500 font-mono mt-5 uppercase">
                  String Length: {decoratedResult.length} characters
                </span>
              </div>

              {/* Copy footer action */}
              <div className="bg-gray-900/50 p-4 border-t border-gray-850 flex items-center justify-between gap-3">
                <span className="text-[10px] text-gray-500 italic">
                  Take decorated flairs and drop them into headers or status notes!
                </span>

                <button
                  id="decorator-copy-trigger-btn"
                  onClick={() => performCopy(decoratedResult)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1 px-4 py-2 rounded-xl transition cursor-pointer shadow-sm ${
                    copiedText === decoratedResult
                      ? "bg-emerald-500 text-white"
                      : "bg-white hover:bg-gray-100 text-gray-950"
                  }`}
                >
                  {copiedText === decoratedResult ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied Decorated Text!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Decorated String
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* NEW DETAILED ACCORDION FAQ SECTION */}
      <div className="mt-8 bg-gradient-to-br from-white to-pink-50/20 border border-pink-100 rounded-2xl p-5 md:p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3.5 border-b border-pink-100">
          <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
            <HelpCircle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest font-mono">
              Emoji & Kaomoji FAQ Guide
            </h3>
            <p className="text-[10px] text-gray-400 font-bold mt-0.5">
              Learn how to copy, customize and design gorgeous bios with symbols and text graphics.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 0,
              q: "What is the difference between a standard Emoji and a Kaomoji?",
              a: "Standard Emojis are graphic illustrations built directly into your OS font files, which is why they look slightly different on iOS, Android, or Windows. Kaomojis (顔文字 - literally 'face characters') are Japanese text-based emoticons built entirely from punctuation, math, and foreign text symbols. They are 100% characters, meaning they render identically across all older and newer devices without dynamic image swapping!"
            },
            {
              q: "Will these cute bio combinations keep their format when pasted on social media?",
              a: "Yes, fully! Every single aesthetic combo has been manually designed using standardized Unicode whitespace characters and native text glyphs. Spacing, dividers, and alignments will remain exactly as shown when you paste them into Instagram bios, WhatsApp statuses, TikTok descriptions, or Discord channel names."
            },
            {
              q: "How does the Interactive Custom Scratchpad work?",
              a: "Think of the scratchpad as your custom mixing board! Clicking 'Add to Scratchpad' on any Emoji, Kaomoji, or symbol appends it directly to your custom input area. You can type freely inside this block to add custom message labels, mix and match decorations, and combine different motifs in one go. When satisfied, click 'Copy Complete Combination' to save it all!"
            },
            {
              q: "Why do some characters in Kaomojis look like blank squares on my device?",
              a: "This is known as 'tofu' in typography. Tofu happens when your device's active system fonts do not have the complete Unicode character tables loaded for older, classical, or specialized Asian script symbols. Modern iOS, Android, and desktop devices support almost all characters, but if one fails to load, it will render as a blank rectangular box."
            },
            {
              q: "Does copying copy-paste items fill up my system memory?",
              a: "Not at all! Since we are only copying small text strings representing raw Unicode, it takes zero space. For extreme ease-of-use, we also display your last 7 clipboard copies in the 'Recent' quick-taps bar so you can re-copy your favorites on the fly without searching them again!"
            }
          ].map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-xl transition duration-150 overflow-hidden ${
                  isOpen ? "bg-white border-pink-300 shadow-3xs" : "bg-white/80 border-gray-150 hover:bg-white hover:border-pink-200"
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left py-3.5 px-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <span className="text-xs font-extrabold text-gray-800 flex items-center gap-2">
                    <span className="text-pink-500 font-mono">0{idx + 1}.</span>
                    <span>{item.q}</span>
                  </span>
                  <span className="text-gray-400">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-pink-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-1 border-t border-gray-100 text-xs text-gray-500 leading-relaxed pl-10 pr-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
