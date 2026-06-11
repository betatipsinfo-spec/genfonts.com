import React, { useState, useMemo, useEffect } from "react";
import { ALL_EXPANDED_STYLES, DECORATORS, ExpandedStyle } from "../unicodeMap";
import { Check, Copy, Heart, Search, Sparkles, RefreshCw, Type, Smile, Plus, ArrowUp, Share2, HelpCircle, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface UnicodeListProps {
  inputText: string;
  setInputText: (text: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const CATEGORY_FAQS: Record<string, { q: string; a: string }[]> = {
  all: [
    {
      q: "What makes these 1,020+ Unicode styles special?",
      a: "They utilize mathematical alphanumeric symbols and hidden glyph offset points. Since they are standard characters rather than font files, you can copy-paste them anywhere on the internet!"
    },
    {
      q: "Will they render on all devices?",
      a: "Most modern devices and browsers render 100% of these styles. If a device is running very old firmware, it might display a box or question mark instead."
    }
  ],
  favorites: [
    {
      q: "How do favorites get saved?",
      a: "Your favorite styles are saved instantly to your local browser storage. They remain intact even if you refresh or close this tab, completely offline."
    },
    {
      q: "How do I add or remove a favorite?",
      a: "Simply tap the ❤️ heart button on any style card to toggle its presence in your curated favorites collection."
    }
  ],
  instagram: [
    {
      q: "Can I use cursive & decorated fonts in my Instagram bio?",
      a: "Yes! Instagram fully supports cursive, bold, italic, and decorated styles in Bios, Captions, comments, and Stories to stand out."
    },
    {
      q: "Do search systems still find my profile with these fonts?",
      a: "Custom characters are seen as unique symbols by search engines, so keep your primary username simple but use these stylings for bio details and captions!"
    }
  ],
  glitch: [
    {
      q: "How does the Glitch / Zalgo style operate?",
      a: "Glitch fonts use stacked Unicode combining diacritical marks that render vertically over normal alphabetic characters, causing the glitchy aesthetic."
    },
    {
      q: "Will these disrupt layout spacing in messaging apps?",
      a: "They can slightly overflow depending on the app's line-height settings, which is key to their chaotic, beautiful cyber-punk design."
    }
  ],
  fancy: [
    {
      q: "Where should I use Fancy & Royal wing styles?",
      a: "These styles include beautiful star-burst, wing-tip, and floral ornaments. They are perfect for discord server announcements and gaming nicknames."
    },
    {
      q: "Can I edit the text inside decorative brackets?",
      a: "Absolutely! Just change your text in the typing area at the top, and all decorative containers will rebuild around it instantly."
    }
  ],
  discord: [
    {
      q: "How do I make my Discord name or channels standout?",
      a: "Discord supports bold-sans and monospace characters. They provide an clean, premium look for channel category markers and role names."
    },
    {
      q: "Is there any risk of moderation using these?",
      a: "None. They are legitimate Unicode characters, but server admins appreciate legible nickname variants for easy tagging!"
    }
  ],
  zalgo: [
    {
      q: "What is Zalgo text?",
      a: "Zalgo text represents corruption or cursed imagery. It utilizes combining character classes to overlap text upwards, downwards, and through the center."
    },
    {
      q: "Can I control the height of the Zalgo corruption?",
      a: "Our Zalgo implementation is tuned to have maximum visual presence while preventing heavy webpage lag or lockups."
    }
  ],
  stylisha: [
    {
      q: "What defines the Stylisha category?",
      a: "Stylisha focuses on clean brackets, delicate underlines, and chic symbol frame borders for a modern, fashion-forward aesthetic."
    },
    {
      q: "Is it good for brand representation?",
      a: "Yes, many micro-brands and aesthetic influencers use Stylisha presets to make their social media announcements look hand-curated."
    }
  ],
  strike: [
    {
      q: "What are Strikethrough unicode characters?",
      a: "These styles use combining overlay codes like slash (U+0338) or strike (U+0336) to draw a continuous cross line directly through your text."
    },
    {
      q: "Are these native strike features?",
      a: "Yes, unlike HTML tags like <s>, these are embedded into the characters themselves, so they stay crossed out in plain-text fields."
    }
  ],
  cool: [
    {
      q: "What text styles are featured in Cool?",
      a: "You'll find double-struck (blackboard bold), bubbles, squares, and parenthesized digits. Extremely popular for aesthetic tags."
    },
    {
      q: "Do bubbles work for numerical characters?",
      a: "Yes, we map special circled numbers (e.g. ①, ②) so your numbers convert alongside letters successfully."
    }
  ],
  tiktok: [
    {
      q: "Where are TikTok fonts best utilized?",
      a: "TikTok bios, voice-over captions, and overlay sticker text. Bold circles and solid bubble text make words significantly more readable over short video loops."
    },
    {
      q: "Why are comments with these styles highly liked?",
      a: "They pop in the comment section and attract quick attention, helping drive profile views and engagement."
    }
  ],
  upsidedown: [
    {
      q: "How does the 'Upside Down' effect flip characters?",
      a: "It reverses character sequence and matches letters with upside-down equivalents (like 'e' to 'ǝ', 'a' to 'ɐ')."
    },
    {
      q: "Can this be decrypted easily?",
      a: "Yes, the brain reads it naturally after a split-second. It's a fantastic puzzle gimmick for riddle posts!"
    }
  ],
  weird: [
    {
      q: "What is the Weird category composed of?",
      a: "A mix of inverted, slashed, glitchy, and ancient Runes. It is optimized for fantasy gamers, roleplayers, and obscure profiles."
    },
    {
      q: "Why use these over default text?",
      a: "It breaks the standard visual pattern of social feeds, forcing users to pause and read your specialized copy."
    }
  ],
  twitter: [
    {
      q: "Are custom fonts safe for Twitter/X handles?",
      a: "Yes, millions of accounts use bold-sans and monospace characters for their display names so they look distinct in conversation feeds."
    },
    {
      q: "Does custom styling count extra towards the 280-character limit?",
      a: "Nope! Each generated character is still treated as a single letter/character, preserving your valuable tweet length."
    }
  ],
  underline: [
    {
      q: "How does the Unicode double or single underline function?",
      a: "It inserts combining macron-below glyphs beneath each character sequence, simulating a true underline look."
    },
    {
      q: "Can I combine Underline with Bold or Italic?",
      a: "Yes, many of our integrated styles combine underlines with luxurious serifs and bold-sans weights."
    }
  ],
  smallcaps: [
    {
      q: "What are Small Caps fonts?",
      a: "Small Caps convert lowercase characters into miniature uppercase glyph templates (like ᴀ, ʙ, ᴄ), giving a clean, sophisticated editorial layout."
    },
    {
      q: "Why is Small Caps popular in bios?",
      a: "It creates a uniform height line, which looks incredibly neat, professional, and is highly legible."
    }
  ],
  cursed: [
    {
      q: "What defines 'Cursed' typography?",
      a: "Cursed text combines spooky Gothic text, corrupted Zalgo splatters, and ancient runic symbols, producing a dark, mystical aura."
    },
    {
      q: "Where is Cursed style most popular?",
      a: "Mainly in dark/goth aesthetics, gaming handles, Halloween themes, or underground music accounts."
    }
  ],
  whatsapp: [
    {
      q: "Does WhatsApp support these special fonts?",
      a: "Absolutely! Since these are raw Unicode glyphs, you can copy-paste them straight into your group chats, status loops, and WhatsApp bio descriptions."
    },
    {
      q: "How does this differ from WhatsApp star markdown?",
      a: "WhatsApp markdown (like *text*) only works inside their chat client. These Unicode fonts work in search, phone contacts, status bars, and everywhere else!"
    }
  ],
  big: [
    {
      q: "What makes fonts in the 'Big' category stand out?",
      a: "They utilize bold blocky structures, full-width vaporwave spaces, and solid circular elements to occupy larger screen areas."
    },
    {
      q: "Are they useful for banners?",
      a: "Yes, they are highly legible from a distance, making them perfect for event headers and profile banners."
    }
  ],
  cursive: [
    {
      q: "What varieties of cursive are supported?",
      a: "We support multiple script weights—elegant cursive curves, thick calligraphic loops, and handwriting-inspired lines."
    },
    {
      q: "Can I write in cursive for formal emails?",
      a: "While readable, we suggest using script fonts primarily for visual headings, signatures, or decorative blocks to ensure maximum corporate accessibility."
    }
  ],
  creepy: [
    {
      q: "How do creepy fonts differ from gothic ones?",
      a: "Creepy styles combine irregular scratch marks, glitchy under-structures, and spacing offsets to mimic horror or vintage slasher movies."
    },
    {
      q: "Can these be used in gamer tags?",
      a: "Yes, they render flawlessly in usernames for Call of Duty, Minecraft, and Steam profile pages."
    }
  ],
  facebook: [
    {
      q: "Does Facebook support formatted text in posts?",
      a: "Yes, Facebook posts stay default plain-text, but pasting these formatted structures allows full-caps headers, italicized quotes, or bold callouts."
    },
    {
      q: "Is it safe for running ads?",
      a: "Yes! Many high-converting digital marketers use styled unicode in ads to create visual checkpoints in their ad copies."
    }
  ],
  bold: [
    {
      q: "What are the benefits of using Bold unicode characters?",
      a: "They naturally draw attention to key promotional words, act as natural headlines, and retain bold styling even in environments where standard markdown fails."
    },
    {
      q: "Will they work on all screen readers?",
      a: "Some screen readers read mathematical bold alphanumerics literally. For extreme accessibility, use standard text for critical instructions and bold fonts for headings."
    }
  ],
  italic: [
    {
      q: "When is Italic text styling recommended?",
      a: "Italic is perfect for poetic status lines, intellectual quotes, movie titles, emphasizing thoughts, or adding an elegant slant to bios."
    },
    {
      q: "Do italics have different weights?",
      a: "We offer both clean sans-serif italics and decorative serif slants, giving you multiple ways to style your sentences."
    }
  ]
};

export default function UnicodeList({
  inputText,
  setInputText,
  favorites,
  toggleFavorite,
}: UnicodeListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sharedId, setSharedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(30);
  const [previewStyle, setPreviewStyle] = useState<ExpandedStyle | null>(null);
  
  const [selectedHighlightId, setSelectedHighlightId] = useState<string>("none");

  const highlightPresets = [
    { id: "none", name: "Plain Text (Default)", prefix: "", suffix: "" },
    { id: "sparkles", name: "✨ Cosmic Sparkle", prefix: "✨ ", suffix: " ✨" },
    { id: "hearts", name: "୨♡୧ Heart Frame", prefix: "୨♡୧ ꒰ ", suffix: " ꒱ ୨♡୧" },
    { id: "double-box", name: "【 Japanese Box 】", prefix: "【 ", suffix: " 】" },
    { id: "wings", name: "ʚ♡ɞ Divine Wings", prefix: "ʚ˚̣̣̣͙ɞ ", suffix: " ʚ˚̣̣̣͙ɞ" },
    { id: "milky-way", name: "★彡 Shooting Stars", prefix: "★彡 ", suffix: " 彡★" },
    { id: "royal-crown", name: "♛ Royal Crown", prefix: "♛ ༺ ", suffix: " ༻ ♛" },
    { id: "matrix", name: "⚡︎ Cyber Plate ⚡︎", prefix: "⚡︎ ⟪ ", suffix: " ⟫ ⚡︎" },
    { id: "glitch-bars", name: "░▒▓ Glitch Block ▓▒░", prefix: "░▒▓ ", suffix: " ▓▒░" },
    { id: "crosshair", name: "❖ Crest Borders", prefix: "❖ [ ", suffix: " ] ❖" },
  ];

  const applyHighlight = (text: string) => {
    const preset = highlightPresets.find(p => p.id === selectedHighlightId);
    if (!preset || preset.id === "none") return text;
    return `${preset.prefix}${text}${preset.suffix}`;
  };

  const getCategoryProperties = (category: string) => {
    switch (category?.toLowerCase()) {
      case "bold":
        return {
          badgeBg: "bg-blue-50 text-blue-600 border-blue-100",
          barColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
          tag: "💪 Bold Accent",
        };
      case "cursive":
        return {
          badgeBg: "bg-pink-50 text-pink-600 border-pink-100",
          barColor: "bg-gradient-to-r from-rose-400 to-pink-500",
          tag: "🖋️ Script Slant",
        };
      case "gothic":
        return {
          badgeBg: "bg-purple-50 text-purple-700 border-purple-100",
          barColor: "bg-gradient-to-r from-purple-800 to-indigo-950",
          tag: "💀 Blackletter Gothic",
        };
      case "aesthetic":
        return {
          badgeBg: "bg-amber-50 text-amber-700 border-amber-100",
          barColor: "bg-gradient-to-r from-amber-400 to-rose-400",
          tag: "🌸 Aesthetic Wing",
        };
      case "decorated":
        return {
          badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
          barColor: "bg-gradient-to-r from-emerald-400 to-teal-500",
          tag: "✨ Decorated Ribbon",
        };
      case "hybrid":
        return {
          badgeBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
          barColor: "bg-gradient-to-r from-indigo-500 to-purple-600",
          tag: "🌌 Cosmic Hybrid",
        };
      default:
        return {
          badgeBg: "bg-slate-50 text-slate-600 border-slate-150",
          barColor: "bg-gradient-to-r from-slate-400 to-slate-500",
          tag: "✦ Classic Typeface",
        };
    }
  };
  
  // Reset pagination on category change or search filter edit
  useEffect(() => {
    setVisibleCount(30);
  }, [selectedCategory, searchTerm]);

  // Quick text transform cases
  const applyCase = (type: "upper" | "lower" | "title") => {
    if (!inputText) return;
    if (type === "upper") setInputText(inputText.toUpperCase());
    if (type === "lower") setInputText(inputText.toLowerCase());
    if (type === "title") {
      setInputText(
        inputText
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }
  };

  const categories = [
    { id: "all", label: "✨ 1,020+ Styles" },
    { id: "favorites", label: "❤️ Favorites" },
    { id: "instagram", label: "📸 Instagram" },
    { id: "glitch", label: "👾 Glitch" },
    { id: "fancy", label: "👑 Fancy" },
    { id: "discord", label: "💬 Discord" },
    { id: "zalgo", label: "👁️ Zalgo" },
    { id: "stylisha", label: "💅 Stylisha" },
    { id: "strike", label: "❌ Strike" },
    { id: "cool", label: "😎 Cool" },
    { id: "tiktok", label: "🎵 TikTok" },
    { id: "upsidedown", label: "🙃 Upside Down" },
    { id: "weird", label: "🌀 Weird" },
    { id: "twitter", label: "🐦 Twitter" },
    { id: "underline", label: "📝 Underline" },
    { id: "smallcaps", label: "🌟 Small Caps" },
    { id: "cursed", label: "💀 Cursed" },
    { id: "whatsapp", label: "🟢 WhatsApp" },
    { id: "big", label: "🌌 Big" },
    { id: "cursive", label: "🖋️ Cursive" },
    { id: "creepy", label: "🕸️ Creepy" },
    { id: "facebook", label: "👥 Facebook" },
    { id: "bold", label: "💪 Bold" },
    { id: "italic", label: "✨ Italic" },
  ];

  const styleMatchesCategory = (style: ExpandedStyle, catId: string): boolean => {
    if (catId === "all") return true;
    
    const id = style.id.toLowerCase();
    const name = style.name.toLowerCase();
    
    switch (catId) {
      case "instagram":
        return style.category === "cursive" || style.category === "decorated" || style.category === "aesthetic" || id.includes("cursive") || id.includes("deco-") || id.includes("bracket-") || id.includes("theme-");
      
      case "glitch":
        return id.includes("glitch") || id.includes("reverse") || id.includes("strike") || id.includes("slash");
      
      case "fancy":
        return style.category === "cursive" || style.category === "decorated" || id.includes("cursive") || id.includes("double-struck") || id.includes("sparkles") || id.includes("royal-wings") || name.includes("shining-stars") || name.includes("heart");
      
      case "discord":
        return id.includes("monospace") || id.includes("gothic") || id.includes("bold") || id.includes("-7") || id.includes("-14") || name.includes("cyberpunk") || name.includes("wing");
      
      case "zalgo":
        return id.includes("glitch-zalgo") || id.includes("ancient") || name.includes("casing") || id.includes("reverse");
      
      case "stylisha":
        return id.includes("bracket-") || id.includes("theme-") || id.includes("deco-") || style.category === "aesthetic";
      
      case "strike":
        return id.includes("strikethrough") || id.includes("slash-through");
      
      case "cool":
        return id.includes("double-struck") || id.includes("bubble-outline") || id.includes("bubble-filled") || id.includes("square-outline") || id.includes("square-filled") || id.includes("monospace") || id.includes("parenthesized");
      
      case "tiktok":
        return id.includes("bubble-filled") || id.includes("parenthesized") || id.includes("vaporwave") || name.includes("heart") || name.includes("lollipop");
      
      case "upsidedown":
        return id.includes("reverse-backwards");
      
      case "weird":
        return id.includes("ancient") || id.includes("reverse-backwards") || id.includes("slash-through") || id.includes("glitch-zalgo") || id.includes("parenthesized");
      
      case "twitter":
        return id.includes("bold-sans") || id.includes("italic-sans") || id.includes("monospace") || id.includes("small-caps") || id.includes("bracket");
      
      case "underline":
        return id.includes("underlined-single") || id.includes("underlined-double");
      
      case "smallcaps":
        return id.includes("small-caps");
      
      case "cursed":
        return id.includes("glitch-zalgo") || id.includes("ancient") || id.includes("gothic") || id.includes("slash");
      
      case "whatsapp":
        return id.includes("bold-serif") || id.includes("italic-serif") || id.includes("monospace") || style.category === "all";
      
      case "big":
        return id.includes("vaporwave") || id.includes("bold-sans") || id.includes("square-filled") || id.includes("bubble-filled");
      
      case "cursive":
        return id.includes("cursive") || id.includes("fancy-tail");
      
      case "creepy":
        return id.includes("gothic") || id.includes("glitch-zalgo") || id.includes("ancient");
      
      case "facebook":
        return id.includes("bold-serif") || id.includes("double-struck") || id.includes("parenthesized");
      
      case "bold":
        return id.includes("bold") || id.includes("double-struck") || id.includes("sans-serif");
      
      case "italic":
        return id.includes("italic") || id.includes("cursive") || id.includes("tail");
      
      default:
        return false;
    }
  };

  // Map and filter styles out of the 1000+ available styles database
  const filteredStyles = useMemo(() => {
    let list = ALL_EXPANDED_STYLES;

    // Search filter
    const trimmedSearch = searchTerm.trim().toLowerCase();
    if (trimmedSearch) {
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(trimmedSearch) ||
          s.description.toLowerCase().includes(trimmedSearch) ||
          s.category.toLowerCase().includes(trimmedSearch)
      );
    }

    // Category constraints
    if (selectedCategory === "favorites") {
      list = list.filter((s) => favorites.includes(s.id));
    } else if (selectedCategory !== "all") {
      list = list.filter((s) => styleMatchesCategory(s, selectedCategory));
    }

    return list;
  }, [selectedCategory, searchTerm, favorites]);

  // Slice displayed styles for extreme responsiveness and speed
  const displayedStyles = useMemo(() => {
    return filteredStyles.slice(0, visibleCount);
  }, [filteredStyles, visibleCount]);

  // Handle single item copy
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  };

  // Handle device system sharing & fallback
  const handleShare = async (text: string, id: string) => {
    if (!text) return;
    if (navigator.share) {
      try {
        await navigator.share({
          text: text,
        });
        setSharedId(id);
        setTimeout(() => {
          setSharedId(null);
        }, 1800);
      } catch (err) {
        console.warn("Native share canceled or failed:", err);
      }
    } else {
      // Fallback mode if browser lacks navigator.share support
      try {
        await navigator.clipboard.writeText(text);
        setSharedId(id);
        setTimeout(() => {
          setSharedId(null);
        }, 1800);
      } catch (err) {
        console.error("Fallback share-to-copy action failed:", err);
      }
    }
  };

  // Quick decorator append helper
  const handleApplyDecorator = (prefix: string, suffix: string) => {
    setInputText(`${prefix}${inputText}${suffix}`);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 30, filteredStyles.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredStyles.length);
  };

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Monitor scroll for back-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back-to-top floating control button
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="unicode-subsystem-root" className="space-y-6">
      {/* CASE FORMATTERS & DECORATOR PRESETS ROW */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-indigo-50/10 border border-gray-200 hover:border-indigo-300 rounded-2xl p-5 md:p-6 shadow-xs space-y-5 transition duration-200">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Smart Modifiers (Left panel) */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-gray-700 text-xs font-bold uppercase tracking-wider">
              <Type className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>Alpha Case Modifiers</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                id="modifier-btn-upper"
                onClick={() => applyCase("upper")}
                disabled={!inputText}
                className="px-2 py-2.5 text-xs font-bold bg-white hover:bg-indigo-50/50 text-gray-700 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 rounded-xl transition cursor-pointer disabled:opacity-40 select-none text-center"
              >
                ALL CAPS
              </button>
              <button
                id="modifier-btn-lower"
                onClick={() => applyCase("lower")}
                disabled={!inputText}
                className="px-2 py-2.5 text-xs font-bold bg-white hover:bg-indigo-50/50 text-gray-700 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 rounded-xl transition cursor-pointer disabled:opacity-40 select-none text-center"
              >
                lowercase
              </button>
              <button
                id="modifier-btn-title"
                onClick={() => applyCase("title")}
                disabled={!inputText}
                className="px-2 py-2.5 text-xs font-bold bg-white hover:bg-indigo-50/50 text-gray-700 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 rounded-xl transition cursor-pointer disabled:opacity-40 select-none text-center"
              >
                Title Case
              </button>
            </div>

            {/* Quick Flairs Selection */}
            <div className="border-t border-gray-100 pt-3">
              <div className="text-[10px] text-gray-400 font-bold mb-2 flex items-center gap-1.5 uppercase tracking-wider select-none">
                <Smile className="w-3.5 h-3.5 text-slate-500" />
                <span>Quick ribbon tail insertions:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {DECORATORS.map((deco, idx) => (
                  <button
                    id={`deco-btn-${idx}`}
                    key={idx}
                    type="button"
                    onClick={() => handleApplyDecorator(deco.prefix, deco.suffix)}
                    className="text-[10px] px-2 py-1.5 bg-white border border-gray-200 text-gray-700 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/30 rounded-lg transition duration-150 flex items-center gap-1 font-mono cursor-pointer"
                  >
                    <span>{deco.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Highlight Border Injector Panel (Right panel) */}
          <div className="flex-1 bg-indigo-50/45 border border-indigo-150/80 p-4 md:p-5 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <Sparkles className="w-4 h-4 text-indigo-600 animate-spin-slow" />
                  <span>Interactive Highlights & Borders</span>
                </span>
                <span className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider select-none">
                  Glow Active
                </span>
              </div>
              <p className="text-[11px] text-slate-550 leading-normal">
                Choose a custom dynamic highlight frame. Inject high-vibe borders around all 1,020+ fonts with one tap below.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-1.5">
              {highlightPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedHighlightId(preset.id)}
                  className={`text-[10.5px] font-bold py-2 px-2.5 rounded-xl border transition-all text-center truncate cursor-pointer ${
                    selectedHighlightId === preset.id
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10 font-extrabold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-indigo-50/50 hover:border-indigo-200 hover:text-indigo-600"
                  }`}
                  title={preset.name}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* FILTER TABS & SEARCH - Sticky top with soft backdrop blur */}
      <div className="sticky top-[67px] z-10 bg-gray-150/95 backdrop-blur-md py-3.5 -mx-4 md:-mx-6 px-4 md:px-6 border-b border-gray-200 flex flex-col gap-3 shadow-3xs transition-all duration-200">
        {/* Category Selector Scrollbar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-gray-200 w-full">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                id={`cat-pill-${cat.id}`}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 focus:outline-none py-2 text-xs font-bold rounded-lg shrink-0 transition duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="unicode-search-input"
            type="text"
            placeholder="Search through 1000+ custom variations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white font-medium text-xs placeholder:text-gray-400 border border-gray-200 text-gray-800 pl-9.5 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* RENDER STYLES CARDS */}
      {displayedStyles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 p-8 animate-fadeIn">
          <p className="text-sm text-gray-400 font-semibold font-sans">
            No custom font style matches your category or search term in our database.
          </p>
          {selectedCategory === "favorites" && (
            <p className="text-xs text-indigo-500 mt-2 font-medium">
              Tip: Pin text styles with the ❤️ favorite toggle inside any card!
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayedStyles.map((style) => {
              const baseResult = style.render(inputText || "Type text here...");
              const previewResult = applyHighlight(baseResult);
              const isFav = favorites.includes(style.id);
              const isCopied = copiedId === style.id;
              const isShared = sharedId === style.id;
              const catProps = getCategoryProperties(style.category);

              return (
                <div
                  key={style.id}
                  className={`group relative bg-white border rounded-2xl p-4 md:p-5 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                    isCopied
                      ? "border-emerald-500 shadow-lg shadow-emerald-500/5 scale-[1.005]"
                      : "border-slate-200 hover:border-indigo-300 hover:shadow-indigo-500/5 hover:-translate-y-0.5"
                  }`}
                >
                  {/* Category Top Action Accent Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${catProps.barColor}`} />

                  <div className="space-y-3.5 pt-1.5">
                    {/* Header bar and indicators */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`text-[8.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${catProps.badgeBg}`}>
                            {catProps.tag}
                          </span>
                          {selectedHighlightId !== "none" && (
                            <span className="text-[8px] bg-indigo-50/70 border border-indigo-100 text-indigo-650 font-extrabold px-1.5 py-0.5 rounded-md uppercase">
                              Framed
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs md:text-[13px] font-black text-slate-800 tracking-tight select-all">
                          {style.name}
                        </h4>
                      </div>

                      {/* Favorite button */}
                      <button
                        id={`fav-toggle-${style.id}`}
                        onClick={() => toggleFavorite(style.id)}
                        className={`p-1.5 rounded-xl hover:bg-slate-50 transition duration-150 cursor-pointer shrink-0 ${
                          isFav ? "text-rose-500 scale-105" : "text-slate-300 hover:text-rose-400"
                        }`}
                        title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Heart className={`w-4.5 h-4.5 ${isFav ? "fill-current animate-pulse-once" : ""}`} />
                      </button>
                    </div>

                    {/* Pre-formatted typography container */}
                    <div
                      id={`preview-container-${style.id}`}
                      onClick={() => handleCopy(previewResult, style.id)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 min-h-[5rem] flex items-center overflow-x-auto whitespace-pre scrolling-touch scrollbar-none select-all relative ${
                        isCopied
                          ? "bg-emerald-50/20 border-emerald-300 shadow-inner"
                          : "bg-slate-50 hover:bg-indigo-50/15 border-slate-150 group-hover:border-indigo-100 hover:shadow-2xs"
                      }`}
                    >
                      <p className={`text-base md:text-lg break-keep select-all font-sans leading-relaxed tracking-wide select-all ${
                        isCopied ? "text-emerald-800 font-semibold" : "text-slate-900"
                      }`}>
                        {previewResult || " "}
                      </p>

                      {/* Quick copy tag overlay on hover */}
                      <span className={`absolute right-3.5 bottom-2.5 text-[8.5px] font-bold transition duration-150 flex items-center gap-1 select-none ${
                        isCopied ? "text-emerald-600 font-extrabold" : "text-slate-400 group-hover:text-indigo-600"
                      }`}>
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 animate-bounce" />
                            COPIED!
                          </>
                        ) : (
                          <>
                            <Copy className="w-2.5 h-2.5" />
                            TAP TO COPY
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar inside card bottom */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 overflow-hidden shrink-0">
                    <span className="text-[10px] text-slate-400 italic truncate max-w-[120px] sm:max-w-[180px]" title={style.description}>
                      {style.description}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0 ml-auto font-sans">
                      <button
                        id={`preview-btn-${style.id}`}
                        onClick={() => setPreviewStyle(style)}
                        className="relative px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer select-none shrink-0 bg-slate-50 hover:bg-indigo-50/50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-100 shadow-2xs animate-fadeIn"
                        title="Preview in full screen modal"
                      >
                        <Maximize2 className="w-3 h-3 text-slate-500" />
                        <span>Preview</span>
                      </button>

                      <button
                        id={`share-btn-${style.id}`}
                        onClick={() => handleShare(previewResult, style.id)}
                        className={`relative px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer select-none shrink-0 border shadow-2xs ${
                          isShared
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm animate-pulse"
                            : "bg-indigo-50 hover:bg-indigo-100/85 text-indigo-700 hover:text-indigo-850 border-indigo-100"
                        }`}
                        title="Share this styled text"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>{isShared ? "Shared!" : "Share"}</span>
                      </button>

                      <button
                        id={`copy-btn-${style.id}`}
                        onClick={() => handleCopy(previewResult, style.id)}
                        className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer select-none shrink-0 border ${
                          isCopied
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                            : "bg-slate-900 border-slate-950 text-white hover:bg-indigo-600 hover:border-indigo-650 shadow-2xs"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PAGINATION / LOAD MORE */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 shrink-0">
            <span className="font-semibold text-gray-600">
              Showing {Math.min(visibleCount, filteredStyles.length)} of {filteredStyles.length} aesthetic font styles
            </span>

            {visibleCount < filteredStyles.length && (
              <div className="flex gap-2">
                <button
                  id="load-more-btn-incremental"
                  onClick={handleShowMore}
                  className="bg-white hover:bg-gray-50 text-indigo-600 border border-gray-200 px-4 py-2 rounded-lg font-bold transition flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Load More Styles
                </button>
                <button
                  id="load-more-btn-all"
                  onClick={handleShowAll}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition shadow-sm cursor-pointer"
                >
                  Show All {filteredStyles.length} Styles
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CATEGORY-SPECIFIC FAQ ACCORDION SECTION */}
      {CATEGORY_FAQS[selectedCategory] && (
        <div className="bg-gradient-to-br from-indigo-50/40 to-white border border-indigo-150 rounded-xl p-5 shadow-xs space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2 pb-2.5 border-b border-indigo-100">
            <HelpCircle className="w-4 h-4 text-indigo-650" />
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Category Focus Q&A —</span>
              <span className="text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold font-mono">
                {categories.find(c => c.id === selectedCategory)?.label || "Info"}
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORY_FAQS[selectedCategory].map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white/85 border border-gray-150 p-4 rounded-xl flex flex-col gap-1.5 hover:shadow-xs hover:border-indigo-200 transition duration-150"
              >
                <div id={`category-faq-q-${idx}`} className="text-xs font-extrabold text-indigo-700 flex items-start gap-1.5">
                  <span className="text-indigo-400 font-mono">Q:</span>
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-4">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Design Dynamic Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="back-to-top-floating-trigger"
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all outline-none border border-indigo-500/30 flex items-center justify-center cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dynamic Unicode Style Centered Preview Modal */}
      <AnimatePresence>
        {previewStyle && (() => {
          const baseResult = previewStyle.render(inputText || "Type text here...");
          const previewResult = applyHighlight(baseResult);
          const isFav = favorites.includes(previewStyle.id);
          const isCopied = copiedId === previewStyle.id;
          const isShared = sharedId === previewStyle.id;
          
          return (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="preview-modal-root">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPreviewStyle(null)}
                className="fixed inset-0 bg-gray-950/70 backdrop-blur-md transition-opacity"
              />

              {/* Centered screen container wrapper */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 md:p-8 text-left shadow-2xl border border-gray-100 transition-all space-y-6 z-10"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-extrabold text-indigo-650 bg-indigo-50 px-2.5 py-1 rounded-full">
                      {previewStyle.category} category
                    </span>
                    <h3 className="text-lg md:text-xl font-black text-gray-950 mt-1 flex items-center gap-2">
                      {previewStyle.name} Style
                    </h3>
                  </div>

                  <button
                    id="close-preview-modal-trigger"
                    onClick={() => setPreviewStyle(null)}
                    className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                    title="Close preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Large visual rendering canvas */}
                <div className="relative">
                  <div className="bg-gray-50 border border-gray-200 hover:border-indigo-200 transition duration-150 p-6 md:p-8 rounded-2xl min-h-[10rem] flex flex-col justify-center items-center text-center relative select-all scrollbar-none max-h-[18rem] overflow-y-auto">
                    <p className="text-xl md:text-3xl font-sans font-medium text-gray-955 break-words leading-relaxed select-all tracking-wide w-full whitespace-pre-wrap">
                      {previewResult || " "}
                    </p>
                    
                    {/* Character statistics */}
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold font-mono mt-4 select-none">
                      {previewResult.length} characters • Rendered from custom Unicode points
                    </span>
                  </div>
                </div>

                {/* Informational description */}
                <div className="bg-indigo-50/40 border border-indigo-100/50 p-3.5 rounded-xl text-xs text-indigo-950 leading-relaxed">
                  <span className="font-bold block mb-0.5 text-indigo-900">About this typography style:</span>
                  {previewStyle.description}
                </div>

                {/* Action row at bottom */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                  <button
                    id="modal-fav-toggle-btn"
                    onClick={() => toggleFavorite(previewStyle.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer select-none ${
                      isFav 
                        ? "bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100" 
                        : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : "text-gray-400"}`} />
                    <span>{isFav ? "Favorited" : "Add to Favorites"}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      id="modal-share-btn"
                      onClick={() => handleShare(previewResult, previewStyle.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer select-none ${
                        isShared
                          ? "bg-indigo-650 text-white shadow-sm"
                          : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-150"
                      }`}
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{isShared ? "Shared!" : "Share Text"}</span>
                    </button>

                    <button
                      id="modal-copy-btn"
                      onClick={() => handleCopy(previewResult, previewStyle.id)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer select-none shadow-sm ${
                        isCopied
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "bg-gray-950 hover:bg-indigo-650 text-white"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied to Clipboard
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Text
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
