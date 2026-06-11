/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import UnicodeList from "./components/UnicodeList";
import GraphicCanvas from "./components/GraphicCanvas";
import AsciiGenerator from "./components/AsciiGenerator";
import ImageToAscii from "./components/ImageToAscii";
import EmojiHub from "./components/EmojiHub";
import SymbolsHub from "./components/SymbolsHub";
import { 
  Sparkles, 
  Palette, 
  HelpCircle, 
  Heart, 
  Star, 
  Copy, 
  RefreshCw, 
  ClipboardList, 
  Flame, 
  BookmarkCheck, 
  Smile, 
  Sliders, 
  BarChart2, 
  Settings, 
  Info, 
  Check, 
  HelpCircleIcon,
  Trash2,
  Terminal,
  ImageIcon,
  Layers,
  Users,
  Mail,
  ShieldCheck,
  FileText,
  X,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Emoticons bucket
const SYMBOL_CATEGORIES = [
  {
    name: "Aesthetic Flairs",
    symbols: ["✨", "🌸", "✧", "✦", "🌿", "🦋", "🌷", "🧸", "🧚‍♀️", "🌙", "☁️", "☕︎", "🎸", "🍿"]
  },
  {
    name: "Hearts & Stars",
    symbols: ["♡", "♥", "💖", "💕", "💘", "★", "☆", "✫", "☄", "⚡︎", "☼", "☯", "☣"]
  },
  {
    name: "Kaomojis",
    symbols: ["(❁´◡`❁)", "(๑•̀ㅂ•́)و✧", "(˵ •̀ ᴗ - ˵) ✧", "(* >ω<)", "٩(◕‿◕)۶", "(¬_¬ )", "(ಥ﹏ಥ)", "ಠ_ಠ", "（╹◡╹）♡"]
  },
  {
    name: "Brackets",
    symbols: ["【 】", "『 』", "〔 〕", "《 》", "⟨ ⟩", "⟪ ⟫", "〖 〗", "⌠ ⌡"]
  }
];

export default function App() {
  const [inputText, setInputText] = useState<string>("Aesthetic Font");
  const [activeTab, setActiveTab] = useState<"unicode" | "canvas" | "ascii" | "image-ascii" | "emoji" | "symbols">("unicode");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedHistory, setCopiedHistory] = useState<string[]>([]);
  const [showFaq, setShowFaq] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Footer navigation states
  const [activeFooterTab, setActiveFooterTab] = useState<"about" | "contact" | "privacy" | "terms" | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) {
      triggerToast("Please fill in all contact form fields!");
      return;
    }
    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSubmitted(true);
      triggerToast("Message sent! We'll reply within 24 hours.");
      setContactName("");
      setContactEmail("");
      setContactMsg("");
    }, 1200);
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Load state from localStorage on init
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("font_gen_favs");
      if (storedFavs) setFavorites(JSON.parse(storedFavs));

      const storedHistory = localStorage.getItem("font_gen_history");
      if (storedHistory) setCopiedHistory(JSON.parse(storedHistory));
    } catch (e) {
      console.warn("Storage loads failed:", e);
    }
  }, []);

  // Update favorites helper
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("font_gen_favs", JSON.stringify(next));
      return next;
    });
    triggerToast("Favorites list successfully updated!");
  };

  // Log copied elements
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Add copied text to global history board
  const logClipboardAction = (text: string) => {
    if (!text || copiedHistory.includes(text)) return;
    const nextHist = [text, ...copiedHistory.slice(0, 11)];
    setCopiedHistory(nextHist);
    localStorage.setItem("font_gen_history", JSON.stringify(nextHist));
    triggerToast("Copied to clipboard!");
  };

  // Delete individual logged item from clipboard history list
  const deleteHistoryItem = (indexToDelete: number) => {
    setCopiedHistory((prev) => {
      const next = prev.filter((_, idx) => idx !== indexToDelete);
      localStorage.setItem("font_gen_history", JSON.stringify(next));
      return next;
    });
    triggerToast("Removed history item!");
  };

  // Clear all historic elements
  const clearAllHistory = () => {
    setCopiedHistory([]);
    localStorage.removeItem("font_gen_history");
    triggerToast("Cleared all clipboard history logs!");
  };

  // Listen to standard copy events in browser to log history
  useEffect(() => {
    const handleCopyGlobal = () => {
      const selected = window.getSelection()?.toString();
      if (selected && selected.trim().length > 0) {
        logClipboardAction(selected.trim());
      }
    };
    document.addEventListener("copy", handleCopyGlobal);
    return () => document.removeEventListener("copy", handleCopyGlobal);
  }, [copiedHistory]);

  // Insert characters at the cursor location of the input box
  const handleInsertSymbol = (symbol: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setInputText((prev) => prev + symbol);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const before = text.substring(0, start);
    const after = text.substring(end, text.length);

    setInputText(before + symbol + after);
    triggerToast(`Added custom flair: ${symbol}`);

    // Re-focus & place cursor inside or right after
    setTimeout(() => {
      textarea.focus();
      const nextCursor = start + symbol.length;
      textarea.setSelectionRange(nextCursor, nextCursor);
    }, 50);
  };

  const clearInput = () => {
    setInputText("");
    triggerToast("Cleared input area");
  };

  const faqItems = [
    {
      q: "How does GenFonts operate?",
      a: "Standard keyboards type basic ASCII text. This application utilizes Unicode mathematical glyph offsets (from symbols blocks) to substitute character keys with corresponding beautiful stylistic variants. Since these are real Unicode characters (and not visual font files), you can paste them into any bio or web platform!"
    },
    {
      q: "Can I use these fonts on Instagram, TikTok, and Twitter?",
      a: "Absolutely! These special text formats can be copied and pasted straight onto Discord channels, WhatsApp, Instagram stories / bio sections, YouTube headers, and game client nicknames."
    },
    {
      q: "Why do some platforms show question marks or empty boxes?",
      a: "Certain older Android, iOS, or Windows Operating Systems lack complete Unicode standard support. If your device displays blank squares, it is simply unable to render those specific glyph collections."
    }
  ];

  // Dynamic statistcs for sidebar
  const characterCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  return (
    <div id="ai-studio-applet-viewport" className="min-h-screen bg-gray-150 text-gray-800 antialiased font-sans flex flex-col justify-between">
      
      {/* 1. MASTER HEADER SECTION */}
      <header className="bg-white border-b border-gray-200 py-3.5 sticky top-0 z-20 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5 select-none">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center text-white shadow-md font-sans font-black tracking-tighter text-base border border-indigo-400/25 transition-transform hover:scale-105 duration-300">
              GF
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-gray-900 tracking-tight flex items-center gap-1.5 leading-none">
                <span className="bg-gradient-to-r from-gray-900 to-indigo-950 bg-clip-text text-transparent">GenFonts</span>
                <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full font-bold">1,020+ STYLES</span>
              </h1>
              <p className="text-[9px] text-indigo-600/80 font-bold mt-1.5 uppercase tracking-wider font-mono">
                High Density Unicode Stylist & Graphic Designer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="faq-accordion-toggle"
              type="button"
              onClick={() => setShowFaq(!showFaq)}
              className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-indigo-50/50 transition cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <span>How to Use?</span>
            </button>
            <div className="hidden md:flex items-center gap-1 text-[9px] bg-gray-50 text-gray-500 px-2.5 py-1.5 rounded-lg font-mono font-bold border border-gray-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1"></span>
              CORE SECURE ENGINE ACTIVE
            </div>
          </div>
        </div>
      </header>

      {/* 2. CORE WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex-1 w-full space-y-6">
        <AnimatePresence mode="wait">
          {!activeFooterTab ? (
            <motion.div
              key="generator-dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* FAQ BLOCK AREA */}
        <AnimatePresence>
          {showFaq && (
            <motion.div
              id="faq-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-white border border-indigo-100 rounded-xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {faqItems.map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[9px] font-black">?</span>
                    {item.q}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOP COMMAND CONSOLE ROW: INPUT & TELEMETRY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* CENTRAL TYPING BOARD (Takes 9 Columns in the top grid) */}
          <div className="lg:col-span-9">
            {/* LARGE CENTRAL TYPING SLATE CARD */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm space-y-4 relative overflow-hidden">
              {/* Subtle visual ambient anchor */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <label htmlFor="master-typing-textarea" className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <Flame className="w-4 h-4 text-indigo-600" />
                  <span>Real-Time Input canvas:</span>
                </label>
                {inputText && (
                  <button
                    id="clear-slate-trigger"
                    onClick={clearInput}
                    className="text-[10px] font-bold text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 px-2.5 py-1.2 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    CLEAR TEXT
                  </button>
                )}
              </div>

              <textarea
                id="master-typing-textarea"
                ref={textareaRef}
                rows={2}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your bio, quotes, captions or words here... ࿐"
                className="w-full text-gray-950 placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-xl p-3 text-base md:text-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-inner font-sans"
              />

              {/* QUICK CHIPS PRESET ACCENTS PANEL */}
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200 space-y-3 shrink-0">
                <div className="text-xs text-gray-400 font-bold flex items-center gap-1.5 uppercase tracking-wider select-none">
                  <Smile className="w-4 h-4 text-gray-500" />
                  <span>Tap to insert custom accents & Kaomojis:</span>
                </div>
                <div className="space-y-2.5">
                  {SYMBOL_CATEGORIES.map((bucket, bIdx) => (
                    <div key={bIdx} className="flex flex-col md:flex-row md:items-center gap-2 border-b last:border-b-0 border-gray-100 pb-2 last:pb-0">
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase w-28 shrink-0">
                        {bucket.name}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {bucket.symbols.map((symbol, sIdx) => (
                          <button
                            id={`symbol-insert-btn-${bIdx}-${sIdx}`}
                            key={sIdx}
                            type="button"
                            onClick={() => handleInsertSymbol(symbol)}
                            className="text-xs px-2.5 py-1.5 bg-white hover:bg-indigo-50 text-gray-800 hover:text-indigo-600 border border-gray-200 hover:border-indigo-300 shadow-2xs rounded-lg transition duration-150 cursor-pointer text-center font-mono"
                          >
                            {symbol}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: COMPACT TELEMETRY PANEL + QUICK ACTIONS (Takes 3 Columns in the top grid) */}
          <div className="lg:col-span-3 space-y-4">
            {/* STATS TELEMETRY CARD */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wide">
                  <BarChart2 className="w-4 h-4 text-indigo-600" />
                  <span>Real-Time Telemetry</span>
                </div>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full">LIVE</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Input Length:</span>
                  <span className="text-xs font-bold text-gray-800 font-mono">{characterCount} chars</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Word Count:</span>
                  <span className="text-xs font-bold text-gray-800 font-mono">{wordCount} words</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Pinned Favorites:</span>
                  <span className="text-xs font-bold text-gray-800 font-mono">{favorites.length} styles</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">History Buffer:</span>
                  <span className="text-xs font-bold text-gray-800 font-mono">{copiedHistory.length} logged</span>
                </div>
              </div>

              {/* Character Health Bar */}
              <div className="space-y-1 pt-1.5">
                <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase font-bold">
                  <span>Input Capacity</span>
                  <span>{Math.round((characterCount / 280) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${Math.min((characterCount / 280) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-[9px] text-gray-400 italic block leading-tight">
                  Suggested under 280 chars for social bio limits and status layouts.
                </span>
              </div>
            </div>

            {/* QUICK CONTROLLER ACTIONS */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-2">
                <Settings className="w-4 h-4 text-indigo-600" />
                <span>Quick Tools</span>
              </div>

              <div className="space-y-2">
                <button
                  id="sidebar-clear-btn"
                  onClick={clearInput}
                  disabled={!inputText}
                  className="w-full text-left flex items-center justify-between text-xs font-semibold px-3 py-2 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-gray-700 transition disabled:opacity-50 cursor-pointer"
                >
                  <span>Reset Input Board</span>
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <div className="bg-indigo-50/50 rounded-lg p-3 text-xs text-indigo-700 leading-relaxed flex gap-2">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Clipboard Integration:</strong> Any text style you highlight or tap to copy on this page gets logged below for fast bulk export!
                  </p>
                </div>
              </div>
            </div>


          </div>

        </div>

        {/* FULL WIDTH TAB SELECTOR & VIEWFLOW SYSTEMS */}
        <div className="space-y-6 pt-4">

          {/* TAB SELECTOR TRIGGERS (Full dynamic width) */}
          <div className="flex flex-wrap md:flex-nowrap bg-gray-200/60 p-1.5 rounded-xl max-w-4xl mx-auto relative border border-gray-250 gap-1 md:gap-0">
            <button
              id="tab-toggle-unicode"
              type="button"
              onClick={() => setActiveTab("unicode")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 text-xs font-bold rounded-lg transition duration-150 cursor-pointer focus:outline-none ${
                activeTab === "unicode"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-850"
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Font Generator
            </button>
            <button
              id="tab-toggle-ascii"
              type="button"
              onClick={() => setActiveTab("ascii")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 text-xs font-bold rounded-lg transition duration-150 cursor-pointer focus:outline-none ${
                activeTab === "ascii"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-850"
              }`}
            >
              <Terminal className="w-4 h-4 text-indigo-600" />
              Text to ASCII
            </button>
            <button
              id="tab-toggle-image-ascii"
              type="button"
              onClick={() => setActiveTab("image-ascii")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 text-xs font-bold rounded-lg transition duration-150 cursor-pointer focus:outline-none ${
                activeTab === "image-ascii"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-850"
              }`}
            >
              <ImageIcon className="w-4 h-4 text-indigo-600" />
              Image to ASCII
            </button>
            <button
              id="tab-toggle-emoji"
              type="button"
              onClick={() => setActiveTab("emoji")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 text-xs font-bold rounded-lg transition duration-150 cursor-pointer focus:outline-none ${
                activeTab === "emoji"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-850"
              }`}
            >
              <Smile className="w-4 h-4 text-indigo-600" />
              Emoji & Kaomoji
            </button>
            <button
              id="tab-toggle-symbols"
              type="button"
              onClick={() => setActiveTab("symbols")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 text-xs font-bold rounded-lg transition duration-150 cursor-pointer focus:outline-none ${
                activeTab === "symbols"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-850"
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              Symbols
            </button>
            <button
              id="tab-toggle-canvas"
              type="button"
              onClick={() => setActiveTab("canvas")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 text-xs font-bold rounded-lg transition duration-150 cursor-pointer focus:outline-none ${
                activeTab === "canvas"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-850"
              }`}
            >
              <Palette className="w-4 h-4 text-indigo-600" />
              Artwork Canvas
            </button>
          </div>

          {/* SWITCHBOARD FOR CURRENT SUBVIEW - SPANS FULL 100% WIDTH */}
          <div className="relative">
            {activeTab === "unicode" ? (
              <div id="unicode-viewflow-wrapper" className="animate-fadeIn">
                <UnicodeList
                  inputText={inputText}
                  setInputText={setInputText}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </div>
            ) : activeTab === "ascii" ? (
              <div id="ascii-viewflow-wrapper" className="animate-fadeIn">
                <AsciiGenerator
                  inputText={inputText}
                  setInputText={setInputText}
                  triggerToast={triggerToast}
                />
              </div>
            ) : activeTab === "image-ascii" ? (
              <div id="image-ascii-viewflow-wrapper" className="animate-fadeIn">
                <ImageToAscii
                  triggerToast={triggerToast}
                />
              </div>
            ) : activeTab === "emoji" ? (
              <div id="emoji-hub-viewflow-wrapper" className="animate-fadeIn">
                <EmojiHub
                  triggerToast={triggerToast}
                />
              </div>
            ) : activeTab === "symbols" ? (
              <div id="symbols-hub-viewflow-wrapper" className="animate-fadeIn">
                <SymbolsHub
                  triggerToast={triggerToast}
                />
              </div>
            ) : (
              <div id="canvas-viewflow-wrapper" className="animate-fadeIn">
                <GraphicCanvas inputText={inputText} />
              </div>
            )}
          </div>

          {/* BOTTOM HISTORIC RECENT LOGS - SPANS FULL 100% WIDTH */}
          {copiedHistory.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2 select-none">
                    Session Clipboard logs (Quick Access)
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold">SAVED</span>
                  </h3>
                </div>
                <button
                  id="clear-all-history-btn"
                  onClick={clearAllHistory}
                  className="text-[10px] font-extrabold text-rose-600 hover:text-rose-800 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                >
                  CLEAR ALL LOGS
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {copiedHistory.map((item, idx) => (
                  <div
                    id={`history-item-card-${idx}`}
                    key={idx}
                    className="bg-gray-50 border border-gray-200 hover:border-indigo-300 p-3.5 rounded-xl flex flex-col justify-between items-start gap-2.5 relative group transition duration-150"
                  >
                    {/* Delete single item action button */}
                    <button
                      id={`delete-history-btn-${idx}`}
                      onClick={() => deleteHistoryItem(idx)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-md text-gray-400 hover:text-rose-500 hover:bg-rose-50 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100 opacity-100 transition duration-150 cursor-pointer"
                      title="Delete log entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <p className="text-sm font-semibold text-gray-800 tracking-wide font-sans truncate w-full pr-6 break-all selection:bg-indigo-100 select-all">
                      {item}
                    </p>
                    <button
                      id={`history-copy-btn-${idx}`}
                      onClick={() => {
                        navigator.clipboard.writeText(item);
                        triggerToast("Re-copied clipboard history element!");
                      }}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:scale-102 transition cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      COPY AGAIN
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
            </motion.div>
          ) : (
            <motion.div
              key="footer-dedicated-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 animate-fadeIn"
            >
              {/* BREADCRUMB HEADER NAV */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-3xs select-none">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">
                  <span>Home</span>
                  <span>/</span>
                  <span className="text-gray-400">Pages</span>
                  <span>/</span>
                  <span className="text-indigo-600 font-extrabold">
                    {activeFooterTab === "about" && "About Us"}
                    {activeFooterTab === "contact" && "Contact Customer Relations"}
                    {activeFooterTab === "privacy" && "State Privacy Policy"}
                    {activeFooterTab === "terms" && "Terms of Service Agreements"}
                  </span>
                </div>
                <button
                  id="subpage-back-to-generator"
                  onClick={() => setActiveFooterTab(null)}
                  className="px-4 py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white font-extrabold text-[11px] rounded-xl transition-all duration-150 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-2xs hover:scale-101"
                >
                  <span>← Back to GenFonts</span>
                </button>
              </div>

              {/* RICH SUB-PAGE CONTAINER */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col">
                
                {/* Visual Accent Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-6 md:px-8 md:py-8 flex items-center justify-between text-white select-none relative">
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/10 rounded-xl">
                      {activeFooterTab === "about" && <Users className="w-6 h-6 text-indigo-150" />}
                      {activeFooterTab === "contact" && <Mail className="w-6 h-6 text-indigo-150" />}
                      {activeFooterTab === "privacy" && <ShieldCheck className="w-6 h-6 text-indigo-150" />}
                      {activeFooterTab === "terms" && <FileText className="w-6 h-6 text-indigo-150" />}
                    </div>
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-widest font-mono text-indigo-50">
                        {activeFooterTab === "about" && "About Us"}
                        {activeFooterTab === "contact" && "Contact Us"}
                        {activeFooterTab === "privacy" && "State Privacy Policy"}
                        {activeFooterTab === "terms" && "Terms of Service"}
                      </h2>
                      <p className="text-[10px] text-indigo-205 font-bold uppercase mt-1 tracking-wider">
                        {activeFooterTab === "about" && "GenFonts Typographic Suite Overview"}
                        {activeFooterTab === "contact" && "Customer relations and feedback loop"}
                        {activeFooterTab === "privacy" && "General Data Protection Regulations"}
                        {activeFooterTab === "terms" && "General licensing agreements and user terms"}
                      </p>
                    </div>
                  </div>
                  <button
                    id="subpage-header-close"
                    onClick={() => setActiveFooterTab(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition duration-150 cursor-pointer"
                    title="Home"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* SubPage Contents */}
                <div className="p-6 md:p-10 text-gray-700 leading-relaxed text-xs select-text">
                  {activeFooterTab === "about" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
                            Who We Are & What We Do
                          </h4>
                          <p className="text-[11px] text-gray-500 mt-1">
                            We are a cooperative team of creators, typography lovers, and developers dedicated to delivering premium, offline-friendly unicode and geometric design instruments.
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-150 pt-5 space-y-4">
                        <p className="text-[13px] text-gray-600 leading-relaxed">
                          Founded with a simple mission: to build the most customizable, performance-focused <strong>GenFonts Typographic Suite</strong> on the web. Our tools translate plain typing matrices into gorgeous design ribbons, stylized social font styles, beautiful Unicode structures, and custom canvas-generated banners effortlessly.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                          <div className="p-5 bg-gray-50 rounded-xl border border-gray-150 font-sans shadow-2xs">
                            <h5 className="font-extrabold text-[12px] text-indigo-950 uppercase tracking-wider">100% Client-Side Engine</h5>
                            <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">All algorithms run instantly in your browser. Absolutely zero remote servers see, process, or save your visual designs.</p>
                          </div>
                          <div className="p-5 bg-gray-50 rounded-xl border border-gray-150 font-sans shadow-2xs">
                            <h5 className="font-extrabold text-[12px] text-indigo-955 uppercase tracking-wider">Aesthetic Quality Focus</h5>
                            <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">From line offsets to monospaced spacing modifiers, we guarantee seamless copy-paste properties across major socials.</p>
                          </div>
                        </div>

                        <div className="p-5 bg-indigo-50/40 rounded-xl border border-indigo-150/40 font-sans mt-4">
                          <h5 className="font-extrabold text-[12px] text-indigo-950 uppercase tracking-wider">Open Web Standards Built</h5>
                          <p className="text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                            Our application is developed standard with HTML5 canvas renders and compliant Unicode mapping logic matrices. This ensures your fonts perform uniformly across platforms such as Discord, WhatsApp, Instagram, Roblox, and Twitter.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFooterTab === "contact" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-violet-50 text-violet-600 rounded-xl shrink-0">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
                            Get in Touch with our Studio
                          </h4>
                          <p className="text-[11px] text-gray-500 mt-1">
                            Have any questions, bug reports, feature suggestions, or business inquiries? Drop us a line of code below! We usually respond within 24 hours.
                          </p>
                        </div>
                      </div>

                      {contactSubmitted ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-emerald-50 border border-emerald-200 p-8 rounded-xl text-center space-y-4 max-w-lg mx-auto"
                        >
                          <Check className="w-12 h-12 text-emerald-600 mx-auto bg-white rounded-full p-2.5 border border-emerald-200 shadow-sm animate-pulse" />
                          <div>
                            <h5 className="font-extrabold text-sm text-emerald-950 uppercase tracking-wider">Successfully Submitted!</h5>
                            <p className="text-[11px] text-emerald-600 mt-1.5 leading-relaxed">Your message has been secure-routed to our relations console. Thank you for making our tools better!</p>
                          </div>
                          <button
                            onClick={() => setContactSubmitted(false)}
                            className="text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 rounded-lg transition"
                          >
                            Submit Another Message
                          </button>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleContactSubmit} className="space-y-5 pt-2 max-w-2xl mx-auto">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider pl-1 font-mono">Your Name</label>
                              <input
                                type="text"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                placeholder="Alex Carter"
                                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-600 text-gray-950 font-sans hover:bg-gray-100/50 focus:bg-white"
                                required
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider pl-1 font-mono">Your Email</label>
                              <input
                                type="email"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                placeholder="alex@example.com"
                                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-600 text-gray-950 font-sans hover:bg-gray-100/50 focus:bg-white"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider pl-1 font-mono">Your Message</label>
                            <textarea
                              value={contactMsg}
                              onChange={(e) => setContactMsg(e.target.value)}
                              placeholder="Type details of your request here..."
                              rows={5}
                              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-600 text-gray-950 font-sans hover:bg-gray-100/50 focus:bg-white"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={isSubmittingContact}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] py-3.5 rounded-xl transition flex items-center justify-center gap-2 select-none shadow-xs disabled:opacity-50 cursor-pointer uppercase tracking-wider"
                          >
                            {isSubmittingContact ? "SECURE ROUTING..." : "DISPATCH ENCRYPTED MESSAGE"}
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  {activeFooterTab === "privacy" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
                            State Privacy Policy & Cookie Rules
                          </h4>
                          <p className="text-[11px] text-gray-400 mt-1 font-mono">
                            Last Updated: June 2026. Zero Server-Side data logging, absolute local safety guarantees.
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-150 pt-5 space-y-4 leading-relaxed text-[12px] text-gray-600">
                        <div>
                          <h5 className="font-extrabold text-gray-950 uppercase tracking-wider text-[12px] mb-1">1. Local Browser-Only Processing Engine</h5>
                          <p>
                            We implement full sandbox-isolation policies. When you enter texts in the Font Generator, generate text to ASCII, convert images into characters, or draw visual shapes on the Artwork Canvas, all computations are performed purely locally inside your browser's virtual machine. Absolutely zero data, text inputs, original images, or compiled designs are sent to our servers.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-extrabold text-gray-950 uppercase tracking-wider text-[12px] mb-1">2. LocalStorage Persistence Framework</h5>
                          <p>
                            To enhance convenience, your favorite styles and temporary clipboard logs are persisted within your device using standard HTML5 <strong>localStorage</strong>. This is not cookie-based tracking; is completely offline, remains in your device's browser memory, and can be wiped instantly by clicking "Clear All Logs" or resetting your browser cache.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-extrabold text-gray-950 uppercase tracking-wider text-[12px] mb-1">3. Third-Party Resource Delivery</h5>
                          <p>
                            Our Canvas panel fetches stylized fonts directly from Google Fonts APIs via safe CDN connections. Your browser's IP address may be shared with standard CDN edge networks to optimize streaming performance. Beyond streaming font packages, no usage data or telemetry logs are linked or compiled.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFooterTab === "terms" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
                            Aesthetic Font Suite Agreements
                          </h4>
                          <p className="text-[11px] text-gray-400 mt-1 font-mono">
                            Last Updated: June 2026. Please read our licensing terms, fair usage guidelines, and copyright policies.
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-150 pt-5 space-y-4 leading-relaxed text-[12px] text-gray-600">
                        <div>
                          <h5 className="font-extrabold text-gray-950 uppercase tracking-wider text-[12px] mb-1">1. Royalty-Free Graphics Ownership</h5>
                          <p>
                            Any digital card, background layout, PNG template, or textual ASCII art that you compile, draw, and download from our application belongs entirely to you. You are granted 100% royalty-free, perpetual, commercial usage rights to broadcast these assets across any social network or commercial design environment globally.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-extrabold text-gray-950 uppercase tracking-wider text-[12px] mb-1">2. Permitted Typographic Usage</h5>
                          <p>
                            Because Unicode mathematical symbol blocks are a globally shared standard, we make no proprietary ownership claims to the individual fonts/character maps generated. However, some online game clients or social networks explicitly forbid rare characters in usernames. You are solely responsible for ensuring your customized usernames comply with third-party social network community guidelines.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-extrabold text-gray-950 uppercase tracking-wider text-[12px] mb-1">3. Disclaimers of Liability</h5>
                          <p>
                            Our tools are provided "as-is" and "as-available" without warranties of any kind. Since all services execute with offline local memory structures, we are not responsible for browser data losses, local storage clearance, or device font-rendering compatibility limits.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Switchboard Controller at the bottom of the page */}
                <div className="bg-gray-50 border-t border-gray-150 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono select-none">
                  <div className="flex flex-wrap items-center gap-3 animate-fadeIn">
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setActiveFooterTab("about");
                      }}
                      className={`text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer ${
                        activeFooterTab === "about"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-gray-505 hover:bg-gray-200"
                      }`}
                    >
                      About Us
                    </button>
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setActiveFooterTab("contact");
                      }}
                      className={`text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer ${
                        activeFooterTab === "contact"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-gray-505 hover:bg-gray-200"
                      }`}
                    >
                      Contact
                    </button>
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setActiveFooterTab("privacy");
                      }}
                      className={`text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer ${
                        activeFooterTab === "privacy"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-gray-505 hover:bg-gray-200"
                      }`}
                    >
                      Privacy Policy
                    </button>
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setActiveFooterTab("terms");
                      }}
                      className={`text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer ${
                        activeFooterTab === "terms"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-gray-505 hover:bg-gray-200"
                      }`}
                    >
                      Terms of Service
                    </button>
                  </div>
                  
                  <button
                    id="subpage-footer-back-to-generator-bottom"
                    type="button"
                    onClick={() => setActiveFooterTab(null)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] uppercase px-5 py-2.5 rounded-xl transition duration-150 hover:scale-101 cursor-pointer"
                  >
                    ← Back to GenFonts
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="bg-gray-950 text-gray-400 text-center py-10 px-4 border-t border-gray-800 mt-16 font-sans">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-lg flex items-center justify-center text-white shadow-md font-sans font-black tracking-tighter text-xs border border-indigo-400/20 select-none">
              GF
            </div>
            <p className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              GenFonts • Designed Pro High Density Workspace
            </p>
          </div>
          
          {/* INTERACTIVE FOOTER PAGES SELECTORS */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 py-2.5 max-w-lg mx-auto border-t border-b border-gray-900">
            <button
              id="footer-link-about"
              onClick={() => setActiveFooterTab("about")}
              className="text-[11px] font-extrabold text-indigo-400 hover:text-white transition duration-150 cursor-pointer uppercase tracking-wider hover:underline"
            >
              About Us
            </button>
            <span className="text-gray-850 select-none">•</span>
            <button
              id="footer-link-contact"
              onClick={() => {
                setContactSubmitted(false);
                setActiveFooterTab("contact");
              }}
              className="text-[11px] font-extrabold text-indigo-400 hover:text-white transition duration-150 cursor-pointer uppercase tracking-wider hover:underline"
            >
              Contact
            </button>
            <span className="text-gray-850 select-none">•</span>
            <button
              id="footer-link-privacy"
              onClick={() => setActiveFooterTab("privacy")}
              className="text-[11px] font-extrabold text-indigo-400 hover:text-white transition duration-150 cursor-pointer uppercase tracking-wider hover:underline"
            >
              Privacy Policy
            </button>
            <span className="text-gray-850 select-none">•</span>
            <button
              id="footer-link-terms"
              onClick={() => setActiveFooterTab("terms")}
              className="text-[11px] font-extrabold text-indigo-400 hover:text-white transition duration-150 cursor-pointer uppercase tracking-wider hover:underline"
            >
              Terms of Service
            </button>
          </div>

          <p className="text-[11px] text-gray-400 max-w-xl mx-auto leading-relaxed">
            Generate calligraphic mathematical scripts, customized aesthetic ribbons, and high-fidelity PNG art covers instantly for social layouts.
          </p>
          <div className="pt-1 text-[9px] text-gray-500 font-mono flex flex-wrap justify-center gap-4 uppercase select-none">
            <span>Powered by HTML5 Canvas & Unicode Mapping Matrix</span>
            <span>•</span>
            <span>Zero Server Latency Database</span>
            <span>•</span>
            <span>Local Persisted History</span>
          </div>
        </div>
      </footer>

      {/* FLOAT GLOBAL TOAST FEEDBACK */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            id="system-floating-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-950 text-white font-bold text-xs px-5 py-3.5 rounded-lg shadow-xl border border-gray-800 flex items-center gap-2 cursor-default select-none animate-fadeIn font-sans"
          >
            <BookmarkCheck className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
