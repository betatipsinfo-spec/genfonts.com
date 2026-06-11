import React, { useState, useMemo } from "react";
import { 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Heart, 
  Star, 
  Compass, 
  BookOpen, 
  Music, 
  RefreshCw, 
  Layers, 
  X, 
  Scissors, 
  Type, 
  Smile, 
  HelpCircle,
  Hash,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SymbolItem {
  char: string;
  name: string;
  category: string;
  tags: string[];
}

// Extensive PICSART inspired Symbol Categories
export const CURATED_SYMBOLS: Record<string, SymbolItem[]> = {
  hearts_love: [
    { char: "♥", name: "Black Heart Suit", category: "hearts_love", tags: ["heart", "love", "dark"] },
    { char: "♡", name: "White Heart Suit", category: "hearts_love", tags: ["heart", "love", "light", "aesthetic"] },
    { char: "❥", name: "Rotated Heavy Black Heart Bullet", category: "hearts_love", tags: ["heart", "love", "bullet"] },
    { char: "❣", name: "Heavy Heart Exclamation Mark Ornament", category: "hearts_love", tags: ["heart", "exclamation", "love"] },
    { char: "❦", name: "Floral Heart / Leaf", category: "hearts_love", tags: ["heart", "nature", "leaf"] },
    { char: "❧", name: "Rotated Floral Heart / Leaf", category: "hearts_love", tags: ["heart", "nature", "leaf", "flair"] },
    { char: "🖤", name: "Black Heart Emoji", category: "hearts_love", tags: ["heart", "love", "goth", "emoji"] },
    { char: "💖", name: "Sparkling Heart Emoji", category: "hearts_love", tags: ["heart", "love", "sparkle", "emoji"] },
    { char: "💗", name: "Growing Heart Emoji", category: "hearts_love", tags: ["heart", "love", "pink", "emoji"] },
    { char: "💓", name: "Beating Heart Emoji", category: "hearts_love", tags: ["heart", "love", "vibrating", "emoji"] },
    { char: "💞", name: "Revolving Hearts Emoji", category: "hearts_love", tags: ["heart", "love", "revolving", "emoji"] },
    { char: "💕", name: "Two Hearts Emoji", category: "hearts_love", tags: ["heart", "love", "pair", "emoji"] },
    { char: "💔", name: "Broken Heart Emoji", category: "hearts_love", tags: ["heart", "sad", "broken", "emoji"] },
    { char: "🧡", name: "Orange Heart Emoji", category: "hearts_love", tags: ["heart", "love", "color", "emoji"] },
    { char: "💛", name: "Yellow Heart Emoji", category: "hearts_love", tags: ["heart", "love", "color", "emoji"] },
    { char: "💚", name: "Green Heart Emoji", category: "hearts_love", tags: ["heart", "love", "color", "emoji"] },
    { char: "💙", name: "Blue Heart Emoji", category: "hearts_love", tags: ["heart", "love", "color", "emoji"] },
    { char: "💜", name: "Purple Heart Emoji", category: "hearts_love", tags: ["heart", "love", "color", "emoji"] },
    { char: "🤎", name: "Brown Heart Emoji", category: "hearts_love", tags: ["heart", "love", "color", "emoji"] },
    { char: "🤍", name: "White Heart Emoji", category: "hearts_love", tags: ["heart", "love", "color", "emoji"] },
    { char: "💖", name: "Sparkling Heart", category: "hearts_love", tags: ["heart", "love", "sparkles"] },
    { char: "💘", name: "Heart with Arrow", category: "hearts_love", tags: ["heart", "love", "arrow"] },
    { char: "💌", name: "Love Letter", category: "hearts_love", tags: ["heart", "love", "envelope"] },
    { char: "💝", name: "Heart with Ribbon", category: "hearts_love", tags: ["heart", "love", "gift"] },
    { char: "🎔", name: "Left Winged Heart", category: "hearts_love", tags: ["heart", "love", "winged", "ribbon"] }
  ],
  stars_glitter: [
    { char: "★", name: "Black Star", category: "stars_glitter", tags: ["star", "dark", "solid"] },
    { char: "☆", name: "White Star", category: "stars_glitter", tags: ["star", "light", "outline"] },
    { char: "✦", name: "Black Four Pointed Star", category: "stars_glitter", tags: ["star", "sparkle", "four-point", "glitter"] },
    { char: "✧", name: "White Four Pointed Star", category: "stars_glitter", tags: ["star", "sparkle", "four-point", "outline", "aesthetic"] },
    { char: "✩", name: "Open Star", category: "stars_glitter", tags: ["star", "outline", "fancy"] },
    { char: "✪", name: "Circled Star", category: "stars_glitter", tags: ["star", "circle", "badge"] },
    { char: "✫", name: "Five Pointed Pinwheel Star", category: "stars_glitter", tags: ["star", "pinwheel", "fancy"] },
    { char: "✬", name: "Black-White Star", category: "stars_glitter", tags: ["star", "shaded"] },
    { char: "✭", name: "Heavy Five Pointed Star", category: "stars_glitter", tags: ["star", "heavy", "bold"] },
    { char: "✮", name: "Star in Circle Outline", category: "stars_glitter", tags: ["star", "circled", "outline"] },
    { char: "☄", name: "Comet", category: "stars_glitter", tags: ["star", "comet", "space", "meteor"] },
    { char: "🌟", name: "Shining Star Emoji", category: "stars_glitter", tags: ["star", "shining", "gold", "emoji"] },
    { char: "✨", name: "Sparkles Emoji", category: "stars_glitter", tags: ["star", "sparkle", "glitter", "gold", "emoji"] },
    { char: "✶", name: "Six Pointed Black Star", category: "stars_glitter", tags: ["star", "six-point", "solid"] },
    { char: "✷", name: "Eight Pointed Black Star", category: "stars_glitter", tags: ["star", "eight-point", "solid"] },
    { char: "✸", name: "Twelve Pointed Black Star", category: "stars_glitter", tags: ["star", "burst", "solid"] },
    { char: "✹", name: "Heavy Twelve Pointed Star", category: "stars_glitter", tags: ["star", "burst", "heavy"] },
    { char: "✺", name: "Sixteen Pointed Asterisk", category: "stars_glitter", tags: ["star", "sparkle", "burst"] },
    { char: "✻", name: "Teardrop-Spoked Asterisk", category: "stars_glitter", tags: ["star", "flower", "asterisk"] },
    { char: "✼", name: "Eight-Teardrop-Spoked Propeller Asterisk", category: "stars_glitter", tags: ["star", "flower", "pinwheel"] },
    { char: "❄️", name: "Snowflake Spark", category: "stars_glitter", tags: ["star", "cold", "snow", "crystal"] },
    { char: "❅", name: "Serrated Snowflake", category: "stars_glitter", tags: ["star", "cold", "crystal", "snow"] },
    { char: "⍟", name: "Sircle-contained Star Icon", category: "stars_glitter", tags: ["star", "badge", "icon"] },
    { char: "✵", name: "Eight-point Pinwheel", category: "stars_glitter", tags: ["star", "pinwheel", "burst"] },
    { char: "❉", name: "Floral Heart Circle Asterisk", category: "stars_glitter", tags: ["star", "flower", "burst", "fancy"] }
  ],
  arrows_direction: [
    { char: "←", name: "Leftwards Arrow", category: "arrows_direction", tags: ["arrow", "left", "simple"] },
    { char: "↑", name: "Upwards Arrow", category: "arrows_direction", tags: ["arrow", "up", "simple"] },
    { char: "→", name: "Rightwards Arrow", category: "arrows_direction", tags: ["arrow", "right", "simple"] },
    { char: "↓", name: "Downwards Arrow", category: "arrows_direction", tags: ["arrow", "down", "simple"] },
    { char: "↔", name: "Left Right Arrow", category: "arrows_direction", tags: ["arrow", "left-right", "horizontal"] },
    { char: "↕", name: "Up Down Arrow", category: "arrows_direction", tags: ["arrow", "up-down", "vertical"] },
    { char: "↖", name: "North West Arrow", category: "arrows_direction", tags: ["arrow", "diagonal", "up-left"] },
    { char: "↗", name: "North East Arrow", category: "arrows_direction", tags: ["arrow", "diagonal", "up-right"] },
    { char: "↘", name: "South East Arrow", category: "arrows_direction", tags: ["arrow", "diagonal", "down-right"] },
    { char: "↙", name: "South West Arrow", category: "arrows_direction", tags: ["arrow", "diagonal", "down-left"] },
    { char: "↚", name: "Left Arrow Stroke", category: "arrows_direction", tags: ["arrow", "cancelled", "left"] },
    { char: "↛", name: "Right Arrow Stroke", category: "arrows_direction", tags: ["arrow", "cancelled", "right"] },
    { char: "↜", name: "Left Wave Arrow", category: "arrows_direction", tags: ["arrow", "wave", "left"] },
    { char: "↝", name: "Right Wave Arrow", category: "arrows_direction", tags: ["arrow", "wave", "right"] },
    { char: "↞", name: "Left Double Arrow", category: "arrows_direction", tags: ["arrow", "double", "left"] },
    { char: "↟", name: "Up Double Arrow", category: "arrows_direction", tags: ["arrow", "double", "up"] },
    { char: "↠", name: "Right Double Arrow", category: "arrows_direction", tags: ["arrow", "double", "right"] },
    { char: "↡", name: "Down Double Arrow", category: "arrows_direction", tags: ["arrow", "double", "down"] },
    { char: "↩", name: "Left Return Arrow", category: "arrows_direction", tags: ["arrow", "return", "left"] },
    { char: "↪", name: "Right Return Arrow", category: "arrows_direction", tags: ["arrow", "return", "right"] },
    { char: "↫", name: "Left Loop Arrow", category: "arrows_direction", tags: ["arrow", "loop", "left"] },
    { char: "↬", name: "Right Loop Arrow", category: "arrows_direction", tags: ["arrow", "loop", "right"] },
    { char: "↰", name: "Up-Left Angle Arrow", category: "arrows_direction", tags: ["arrow", "corner", "angle"] },
    { char: "↱", name: "Up-Right Angle Arrow", category: "arrows_direction", tags: ["arrow", "corner", "angle"] },
    { char: "↳", name: "Down-Right Angle Arrow", category: "arrows_direction", tags: ["arrow", "corner", "angle"] },
    { char: "↵", name: "Enter-Key downwards arrow left", category: "arrows_direction", tags: ["arrow", "enter", "keyboard"] },
    { char: "↺", name: "Counterclockwise Loop Arrow", category: "arrows_direction", tags: ["arrow", "refresh", "retake"] },
    { char: "↻", name: "Clockwise Loop Arrow", category: "arrows_direction", tags: ["arrow", "refresh", "forward"] },
    { char: "➔", name: "Heavy Rightwards Arrow", category: "arrows_direction", tags: ["arrow", "heavy", "solid", "right"] },
    { char: "➘", name: "Rightwards Falling Arrow", category: "arrows_direction", tags: ["arrow", "falling", "slanted"] },
    { char: "➙", name: "Rightwards Rising Arrow", category: "arrows_direction", tags: ["arrow", "rising", "slanted"] },
    { char: "➛", name: "Teardrop-Barbed Arrow", category: "arrows_direction", tags: ["arrow", "fancy", "heavy"] },
    { char: "➜", name: "Heavy Round Barbed Right Arrow", category: "arrows_direction", tags: ["arrow", "heavy", "round"] },
    { char: "➝", name: "Triangle-headed Right Arrow", category: "arrows_direction", tags: ["arrow", "triangle", "modern"] },
    { char: "➞", name: "Heavy Wide-headed Right Arrow", category: "arrows_direction", tags: ["arrow", "chubby", "fat"] },
    { char: "➡", name: "Black Right Arrow Emoji", category: "arrows_direction", tags: ["arrow", "solid", "box", "emoji"] },
    { char: "➢", name: "Three-D Top-Lighted Arrow", category: "arrows_direction", tags: ["arrow", "3d", "slanted"] },
    { char: "➤", name: "Triangle-headed Solid Pointer", category: "arrows_direction", tags: ["arrow", "solid", "pointer"] },
    { char: "➥", name: "Heavy Curved Downwards Arrow Input", category: "arrows_direction", tags: ["arrow", "curved", "corner"] },
    { char: "➦", name: "Heavy Curved Upwards Arrow Input", category: "arrows_direction", tags: ["arrow", "curved", "corner"] },
    { char: "➩", name: "Open-headed Rightwards Block Arrow", category: "arrows_direction", tags: ["arrow", "block", "outline"] },
    { char: "➫", name: "Shaded Rightwards Block Arrow", category: "arrows_direction", tags: ["arrow", "block", "shaded"] },
    { char: "➲", name: "Circled Rightwards Block Arrow", category: "arrows_direction", tags: ["arrow", "block", "circle"] },
    { char: "➳", name: "Feathered Rightwards Arrow", category: "arrows_direction", tags: ["arrow", "feather", "tribal"] },
    { char: "➴", name: "Slanted Feathered Arrow Down", category: "arrows_direction", tags: ["arrow", "feather", "archery"] },
    { char: "➵", name: "Horizontal Barb-feathered Arrow", category: "arrows_direction", tags: ["arrow", "archery", "delicate"] },
    { char: "➶", name: "Slanted Feathered Arrow Up", category: "arrows_direction", tags: ["arrow", "archery", "up"] }
  ],
  brackets_accents: [
    { char: "【", name: "Left Black Lenticular Bracket", category: "brackets_accents", tags: ["bracket", "left", "lenticular", "box"] },
    { char: "】", name: "Right Black Lenticular Bracket", category: "brackets_accents", tags: ["bracket", "right", "lenticular", "box"] },
    { char: "『", name: "Left White Corner Bracket", category: "brackets_accents", tags: ["bracket", "left", "corner", "vintage"] },
    { char: "』", name: "Right White Corner Bracket", category: "brackets_accents", tags: ["bracket", "right", "corner", "vintage"] },
    { char: "〔", name: "Left Toric Shell Bracket", category: "brackets_accents", tags: ["bracket", "left", "thin"] },
    { char: "〕", name: "Right Toric Shell Bracket", category: "brackets_accents", tags: ["bracket", "right", "thin"] },
    { char: "《", name: "Left Double Angle Bracket", category: "brackets_accents", tags: ["bracket", "left", "double-angle", "chevron"] },
    { char: "》", name: "Right Double Angle Bracket", category: "brackets_accents", tags: ["bracket", "right", "double-angle", "chevron"] },
    { char: "⟨", name: "Mathematical Left Angle Bracket", category: "brackets_accents", tags: ["bracket", "left", "math"] },
    { char: "⟩", name: "Mathematical Right Angle Bracket", category: "brackets_accents", tags: ["bracket", "right", "math"] },
    { char: "⟪", name: "Mathematical Left Double Angle Bracket", category: "brackets_accents", tags: ["bracket", "left", "double", "gilded"] },
    { char: "⟫", name: "Mathematical Right Double Angle Bracket", category: "brackets_accents", tags: ["bracket", "right", "double", "gilded"] },
    { char: "〖", name: "Left White Lenticular Bracket", category: "brackets_accents", tags: ["bracket", "left", "fancy", "outline"] },
    { char: "〗", name: "Right White Lenticular Bracket", category: "brackets_accents", tags: ["bracket", "right", "fancy", "outline"] },
    { char: "⌠", name: "Top Half Integral", category: "brackets_accents", tags: ["bracket", "math", "integral", "top"] },
    { char: "⌡", name: "Bottom Half Integral", category: "brackets_accents", tags: ["bracket", "math", "integral", "bottom"] },
    { char: "﹙", name: "Left Small Parenthesis", category: "brackets_accents", tags: ["bracket", "left", "small"] },
    { char: "﹚", name: "Right Small Parenthesis", category: "brackets_accents", tags: ["bracket", "right", "small"] },
    { char: "﹛", name: "Left Small Curly Bracket", category: "brackets_accents", tags: ["bracket", "left", "small", "curly"] },
    { char: "﹜", name: "Right Small Curly Bracket", category: "brackets_accents", tags: ["bracket", "right", "small", "curly"] },
    { char: "﹝", name: "Left Small Square Bracket", category: "brackets_accents", tags: ["bracket", "left", "small", "square"] },
    { char: "﹞", name: "Right Small Square Bracket", category: "brackets_accents", tags: ["bracket", "right", "small", "square"] },
    { char: "⁅", name: "Left Square Bracket with Quill", category: "brackets_accents", tags: ["bracket", "left", "quill"] },
    { char: "⁆", name: "Right Square Bracket with Quill", category: "brackets_accents", tags: ["bracket", "right", "quill"] },
    { char: "⌈", name: "Left Ceiling Symbol", category: "brackets_accents", tags: ["bracket", "top", "roof"] },
    { char: "⌉", name: "Right Ceiling Symbol", category: "brackets_accents", tags: ["bracket", "top", "roof"] },
    { char: "⌊", name: "Left Floor Symbol", category: "brackets_accents", tags: ["bracket", "bottom", "feet"] },
    { char: "⌋", name: "Right Floor Symbol", category: "brackets_accents", tags: ["bracket", "bottom", "feet"] },
    { char: "꧁༺", name: "Left Fancy Wing Flair", category: "brackets_accents", tags: ["bracket", "flair", "wing", "left", "ribbon"] },
    { char: "༻꧂", name: "Right Fancy Wing Flair", category: "brackets_accents", tags: ["bracket", "flair", "wing", "right", "ribbon"] }
  ],
  nature_leaves: [
    { char: "✿", name: "Black Flower Icon", category: "nature_leaves", tags: ["flower", "solid", "deco", "garden"] },
    { char: "❀", name: "White Flower Icon", category: "nature_leaves", tags: ["flower", "outline", "deco", "garden"] },
    { char: "❁", name: "Floral Pinwheel Roseette", category: "nature_leaves", tags: ["flower", "pinwheel", "cute"] },
    { char: "❃", name: "Heavy Eight Petaled Flower", category: "nature_leaves", tags: ["flower", "bold", "tropical"] },
    { char: "💮", name: "White Flower Ribbon Stamp", category: "nature_leaves", tags: ["flower", "stamp", "japanese", "emoji"] },
    { char: "🌿", name: "Green Herb Stem", category: "nature_leaves", tags: ["nature", "leaf", "green", "garden", "emoji"] },
    { char: "🍁", name: "Red Maple Leaf", category: "nature_leaves", tags: ["nature", "leaf", "autumn", "fall", "emoji"] },
    { char: "🍀", name: "Four-leaf Clover", category: "nature_leaves", tags: ["nature", "lucky", "green", "spring", "emoji"] },
    { char: "🍃", name: "Leaf fluttering in Wind", category: "nature_leaves", tags: ["nature", "leaf", "wind", "emoji"] },
    { char: "🍄", name: "Mushroom", category: "nature_leaves", tags: ["nature", "mushroom", "cottagecore", "emoji"] },
    { char: "🌾", name: "Ear of Rice", category: "nature_leaves", tags: ["nature", "wheat", "rice", "emoji"] },
    { char: "🌸", name: "Cherry Blossom", category: "nature_leaves", tags: ["flower", "cherry", "pink", "emoji"] },
    { char: "🥀", name: "Wilted Rose", category: "nature_leaves", tags: ["flower", "rose", "goth", "sad", "emoji"] },
    { char: "🌹", name: "Red Rose", category: "nature_leaves", tags: ["flower", "rose", "love", "emoji"] },
    { char: "🌺", name: "Hibiscus Tropical", category: "nature_leaves", tags: ["flower", "tropical", "pink", "emoji"] },
    { char: "🌻", name: "Sunflower", category: "nature_leaves", tags: ["flower", "sunflower", "gold", "emoji"] },
    { char: "🌼", name: "Blossom Yellow", category: "nature_leaves", tags: ["flower", "yellow", "emoji"] },
    { char: "🌷", name: "Tulip", category: "nature_leaves", tags: ["flower", "tulip", "pink", "emoji"] },
    { char: "🍂", name: "Fallen Leaves", category: "nature_leaves", tags: ["nature", "leaf", "autumn", "emoji"] },
    { char: "🌵", name: "Cactus Desert", category: "nature_leaves", tags: ["nature", "desert", "green", "emoji"] },
    { char: "🌴", name: "Palm Tree Coast", category: "nature_leaves", tags: ["nature", "beach", "tropical", "emoji"] },
    { char: "🌙", name: "Crescent Moon", category: "nature_leaves", tags: ["sky", "moon", "night", "emoji"] },
    { char: "☀️", name: "Sun", category: "nature_leaves", tags: ["sky", "sun", "hot", "emoji"] },
    { char: "💧", name: "Waterdroplet", category: "nature_leaves", tags: ["water", "tear", "rain", "emoji"] },
    { char: "🌊", name: "Water wave", category: "nature_leaves", tags: ["water", "wave", "surf", "emoji"] }
  ],
  music_media: [
    { char: "♪", name: "Eighth Note", category: "music_media", tags: ["music", "sound", "note", "melody"] },
    { char: "♫", name: "Beamed Eighth Notes", category: "music_media", tags: ["music", "sound", "note", "chord", "melody"] },
    { char: "♩", name: "Quarter Note", category: "music_media", tags: ["music", "note", "sound"] },
    { char: "♬", name: "Beamed Sixteenth Notes", category: "music_media", tags: ["music", "note", "chords", "rhythm"] },
    { char: "♭", name: "Music Flat Sign", category: "music_media", tags: ["music", "flat", "pitch"] },
    { char: "♮", name: "Music Natural Sign", category: "music_media", tags: ["music", "natural", "pitch"] },
    { char: "♯", name: "Music Sharp Sign", category: "music_media", tags: ["music", "sharp", "pitch"] },
    { char: "🎙️", name: "Studio Microphone", category: "music_media", tags: ["music", "audio", "mic", "emoji"] },
    { char: "🎧", name: "Headphone", category: "music_media", tags: ["music", "audio", "listen", "emoji"] },
    { char: "🎵", name: "Musical Note", category: "music_media", tags: ["music", "note", "song", "emoji"] },
    { char: "🎶", name: "Multiple Notes", category: "music_media", tags: ["music", "note", "chorus", "emoji"] },
    { char: "🔊", name: "Speaker High Value", category: "music_media", tags: ["sound", "audio", "volume", "emoji"] },
    { char: "🔇", name: "Muted Speaker", category: "music_media", tags: ["sound", "audio", "mute", "off", "emoji"] },
    { char: "🎹", name: "Piano Keypad", category: "music_media", tags: ["music", "synthesizer", "keys", "emoji"] },
    { char: "🥁", name: "Drum set", category: "music_media", tags: ["music", "beat", "drum", "emoji"] },
    { char: "🎷", name: "Saxophone Band", category: "music_media", tags: ["music", "jazz", "sax", "emoji"] },
    { char: "  📻", name: "Retro Radio Receiver", category: "music_media", tags: ["media", "radio", "audio", "retro", "emoji"] },
    { char: "🎚️", name: "Level fader slider", category: "music_media", tags: ["audio", "knob", "dj", "emoji"] },
    { char: "🎛️", name: "Control dials knobs", category: "music_media", tags: ["audio", "dj", "analog", "emoji"] }
  ],
  math_numbers: [
    { char: "+", name: "Plus Sign", category: "math_numbers", tags: ["math", "operator", "plus"] },
    { char: "−", name: "Minus Sign", category: "math_numbers", tags: ["math", "operator", "minus"] },
    { char: "×", name: "Multiplication Sign", category: "math_numbers", tags: ["math", "operator", "times"] },
    { char: "÷", name: "Division Sign", category: "math_numbers", tags: ["math", "operator", "divide"] },
    { char: "=", name: "Equals Sign", category: "math_numbers", tags: ["math", "operator", "equal"] },
    { char: "≠", name: "Not Equal To", category: "math_numbers", tags: ["math", "operator", "unequal"] },
    { char: "≈", name: "Almost Equal To", category: "math_numbers", tags: ["math", "approximate", "wave"] },
    { char: "±", name: "Plus-Minus Sign", category: "math_numbers", tags: ["math", "plus-minus"] },
    { char: "<", name: "Less Than", category: "math_numbers", tags: ["math", "comparison", "small"] },
    { char: ">", name: "Greater Than", category: "math_numbers", tags: ["math", "comparison", "big"] },
    { char: "≤", name: "Less-Than or Equal", category: "math_numbers", tags: ["math", "comparison"] },
    { char: "≥", name: "Greater-Than or Equal", category: "math_numbers", tags: ["math", "comparison"] },
    { char: "%", name: "Percentage Sign", category: "math_numbers", tags: ["math", "percent", "rate"] },
    { char: "‰", name: "Per Mille Sign", category: "math_numbers", tags: ["math", "permille", "rate"] },
    { char: "√", name: "Square Root Sign", category: "math_numbers", tags: ["math", "radical", "root"] },
    { char: "∛", name: "Cube Root Sign", category: "math_numbers", tags: ["math", "radical", "root"] },
    { char: "∜", name: "Fourth Root Sign", category: "math_numbers", tags: ["math", "radical", "root"] },
    { char: "∞", name: "Infinity Symbol", category: "math_numbers", tags: ["math", "endless", "loop", "forever"] },
    { char: "∫", name: "Integral Symbol", category: "math_numbers", tags: ["math", "calculus", "integral"] },
    { char: "∴", name: "Therefore Symbol", category: "math_numbers", tags: ["math", "logic", "dots", "conclusion"] },
    { char: "∵", name: "Because Symbol", category: "math_numbers", tags: ["math", "logic", "dots"] },
    { char: "½", name: "One Half Fraction", category: "math_numbers", tags: ["math", "fraction", "half"] },
    { char: "⅓", name: "One Third Fraction", category: "math_numbers", tags: ["math", "fraction"] },
    { char: "⅔", name: "Two Thirds Fraction", category: "math_numbers", tags: ["math", "fraction"] },
    { char: "¼", name: "One Quarter Fraction", category: "math_numbers", tags: ["math", "fraction", "quarter"] },
    { char: "¾", name: "Three Quarters Fraction", category: "math_numbers", tags: ["math", "fraction"] }
  ],
  money_currency: [
    { char: "$", name: "US Dollar Sign", category: "money_currency", tags: ["money", "currency", "dollar"] },
    { char: "€", name: "Euro Sign", category: "money_currency", tags: ["money", "currency", "euro"] },
    { char: "£", name: "British Pound Sign", category: "money_currency", tags: ["money", "currency", "pound"] },
    { char: "¥", name: "Yuan/Yen Sign", category: "money_currency", tags: ["money", "currency", "yen", "japan"] },
    { char: "¢", name: "Cent Sign", category: "money_currency", tags: ["money", "currency", "cent"] },
    { char: "৳", name: "Taka Sign", category: "money_currency", tags: ["money", "currency", "taka"] },
    { char: "₨", name: "Rupee Ledger Symbol", category: "money_currency", tags: ["money", "currency", "rupee"] },
    { char: "₩", name: "Korean Won Sign", category: "money_currency", tags: ["money", "currency", "won", "korean"] },
    { char: "₪", name: "Israeli New Shekel Sign", category: "money_currency", tags: ["money", "currency", "shekel"] },
    { char: "₫", name: "Dong Sign", category: "money_currency", tags: ["money", "currency", "dong"] },
    { char: "₭", name: "Kip Sign", category: "money_currency", tags: ["money", "currency", "kip"] },
    { char: "₱", name: "Peso Sign", category: "money_currency", tags: ["money", "currency", "peso"] },
    { char: "₲", name: "Guarani Sign", category: "money_currency", tags: ["money", "currency", "guarani"] },
    { char: "₴", name: "Hryvnia Sign", category: "money_currency", tags: ["money", "currency", "hryvnia"] },
    { char: "₸", name: "Tenge Sign", category: "money_currency", tags: ["money", "currency", "tenge"] },
    { char: "₹", name: "Indian Rupee Symbol", category: "money_currency", tags: ["money", "currency", "rupee", "india"] },
    { char: "₺", name: "Turkish Lira Sign", category: "money_currency", tags: ["money", "currency", "lira", "turkish"] },
    { char: "₽", name: "Russian Ruble Sign", category: "money_currency", tags: ["money", "currency", "ruble"] },
    { char: "🪙", name: "Coin Gold", category: "money_currency", tags: ["money", "coin", "gold", "emoji"] },
    { char: "💰", name: "Bag of Money", category: "money_currency", tags: ["money", "cash", "gold", "emoji"] },
    { char: "💳", name: "Credit Card", category: "money_currency", tags: ["money", "card", "bank", "emoji"] }
  ],
  lines_boxes: [
    { char: "─", name: "Light Horizontal Bar Line", category: "lines_boxes", tags: ["line", "divider", "horizontal"] },
    { char: "━", name: "Heavy Horizontal Bar Line", category: "lines_boxes", tags: ["line", "divider", "heavy", "horizontal"] },
    { char: "│", name: "Light Vertical Column Line", category: "lines_boxes", tags: ["line", "vertical"] },
    { char: "┃", name: "Heavy Vertical Column Line", category: "lines_boxes", tags: ["line", "vertical", "heavy"] },
    { char: "┄", name: "Light Quadruple Dashed Line Horizontal", category: "lines_boxes", tags: ["line", "dashed", "dot"] },
    { char: "┅", name: "Heavy Quadruple Dashed Line Horizontal", category: "lines_boxes", tags: ["line", "dashed", "heavy"] },
    { char: "┈", name: "Light Triple Dashed Line Horizontal", category: "lines_boxes", tags: ["line", "dashed", "divider"] },
    { char: "┉", name: "Heavy Triple Dashed Line Horizontal", category: "lines_boxes", tags: ["line", "dashed", "heavy"] },
    { char: "┌", name: "Light Down and Right Corner Box", category: "lines_boxes", tags: ["line", "corner", "box", "border"] },
    { char: "┐", name: "Light Down and Left Corner Box", category: "lines_boxes", tags: ["line", "corner", "box", "border"] },
    { char: "└", name: "Light Up and Right Corner Box", category: "lines_boxes", tags: ["line", "corner", "box", "border"] },
    { char: "┘", name: "Light Up and Left Corner Box", category: "lines_boxes", tags: ["line", "corner", "box", "border"] },
    { char: "├", name: "Light Vertical Column and Right Branch", category: "lines_boxes", tags: ["line", "border", "branch", "table"] },
    { char: "┤", name: "Light Vertical Column and Left Branch", category: "lines_boxes", tags: ["line", "border", "branch", "table"] },
    { char: "┬", name: "Light Down Branch Column", category: "lines_boxes", tags: ["line", "border", "branch", "table"] },
    { char: "┴", name: "Light Up Branch Column", category: "lines_boxes", tags: ["line", "border", "branch", "table"] },
    { char: "┼", name: "Light Vertical and Horizontal Cross", category: "lines_boxes", tags: ["line", "cross", "table"] },
    { char: "═", name: "Double Horizontal Box Line", category: "lines_boxes", tags: ["line", "double", "border"] },
    { char: "║", name: "Double Vertical Box Line", category: "lines_boxes", tags: ["line", "double", "border"] },
    { char: "╔", name: "Double Down and Right Corner Box", category: "lines_boxes", tags: ["line", "double", "corner", "box"] },
    { char: "╗", name: "Double Down and Left Corner Box", category: "lines_boxes", tags: ["line", "double", "corner", "box"] },
    { char: "╚", name: "Double Up and Right Corner Box", category: "lines_boxes", tags: ["line", "double", "corner", "box"] },
    { char: "╝", name: "Double Up and Left Corner Box", category: "lines_boxes", tags: ["line", "double", "corner", "box"] },
    { char: "█", name: "Full Solid Block Shading", category: "lines_boxes", tags: ["block", "square", "shading", "brutalist"] },
    { char: "▄", name: "Lower Half Block Shading", category: "lines_boxes", tags: ["block", "square", "shading"] },
    { char: "▀", name: "Upper Half Block Shading", category: "lines_boxes", tags: ["block", "square", "shading"] },
    { char: "■", name: "Black Medium Square Bullet", category: "lines_boxes", tags: ["square", "bullet", "solid"] },
    { char: "░", name: "Light Shading Screen Density", category: "lines_boxes", tags: ["shading", "gradient", "vintage", "dot"] },
    { char: "▒", name: "Medium Shading Screen Density", category: "lines_boxes", tags: ["shading", "gradient", "vintage"] },
    { char: "▓", name: "Dark Shading Screen Density", category: "lines_boxes", tags: ["shading", "gradient", "vintage"] }
  ],
  cool_misc: [
    { char: "✓", name: "Checkmark Tick Symbol", category: "cool_misc", tags: ["check", "yes", "accept"] },
    { char: "✔", name: "Heavy Checkmark Tick", category: "cool_misc", tags: ["check", "yes", "bold"] },
    { char: "✗", name: "Cross Mark Ballot", category: "cool_misc", tags: ["cross", "no", "cancel"] },
    { char: "✘", name: "Heavy Cross Mark Ballot", category: "cool_misc", tags: ["cross", "no", "bold"] },
    { char: "🗸", name: "Thin Ribbon Checkmark", category: "cool_misc", tags: ["check", "tick"] },
    { char: "☑", name: "Ballot Box with Check", category: "cool_misc", tags: ["box", "check", "voted"] },
    { char: "☒", name: "Ballot Box with X", category: "cool_misc", tags: ["box", "cross", "voted"] },
    { char: "☮", name: "Peace Symbol", category: "cool_misc", tags: ["peace", "freedom", "vintage"] },
    { char: "☯", name: "Yin Yang Balance", category: "cool_misc", tags: ["yin-yang", "balance", "chinese", "witchy"] },
    { char: "☸", name: "Wheel of Dharma", category: "cool_misc", tags: ["wheel", "dharma", "buddhist"] },
    { char: "✡", name: "Star of David", category: "cool_misc", tags: ["star", "david", "jewish"] },
    { char: "🔯", name: "Dotted Six-Point Star Emoji", category: "cool_misc", tags: ["star", "six-point", "emoji"] },
    { char: "☪", name: "Star and Crescent", category: "cool_misc", tags: ["moon", "star", "crescent", "islam"] },
    { char: "✝", name: "Latin Christian Cross", category: "cool_misc", tags: ["cross", "religion", "christian"] },
    { char: "†", name: "Dagger Typography Sign", category: "cool_misc", tags: ["cross", "dagger", "historic"] },
    { char: "‡", name: "Double Dagger Sign", category: "cool_misc", tags: ["cross", "dagger", "double"] },
    { char: "☠", name: "Skull & Crossbones", category: "cool_misc", tags: ["danger", "goth", "death", "pirate"] },
    { char: "☣", name: "Biohazard Sign Warning", category: "cool_misc", tags: ["danger", "hazard", "toxic"] },
    { char: "☢", name: "Radioactive Sign Nuclear", category: "cool_misc", tags: ["danger", "hazard", "atomic"] },
    { char: "❂", name: "Circled Open Flower Sun", category: "cool_misc", tags: ["sun", "flower", "burst"] },
    { char: "✉", name: "Envelope Mail Stamp", category: "cool_misc", tags: ["mail", "envelope", "letter"] },
    { char: "⏳", name: "Hourglass Sandy Time", category: "cool_misc", tags: ["time", "hourglass", "timer", "emoji"] },
    { char: "⚓", name: "Ship Maritime Anchor", category: "cool_misc", tags: ["sea", "anchor", "boat"] },
    { char: "⚖", name: "Scales of Justice", category: "cool_misc", tags: ["legal", "scales", "balance"] }
  ]
};

// CURATED TEMPLATES MATCHING PICSART DECORATIVE DESIGNS
interface OrnamentTemplate {
  name: string;
  niche: string;
  template: string;
  sample: string;
}

export const CURATED_ORNAMENTS: OrnamentTemplate[] = [
  { name: "Double Wave Floral Ripple", niche: "Aesthetic Frame", template: "⊱ ────── {text} ────── ⊰", sample: "⊱ ────── Bio Intro ────── ⊰" },
  { name: "Hearts Sparkle Orbit", niche: "Cute Sparkle", template: "♥*･゜ﾟ･*:.｡..｡.:* {text} *:.｡. .｡.:*･゜ﾟ･*♥", sample: "♥*･゜ﾟ･*:.｡..｡.:* Cutie *:.｡. .｡.:*･゜ﾟ･*♥" },
  { name: "Royal Imperial Crest", niche: "Gilded Wing", template: "👑 ༺ {text} ༻ 👑", sample: "👑 ༺ Champion Rank ༻ 👑" },
  { name: "Underline Ribbon Wave", niche: "Sweet Header", template: "❀ ───► {text} ◄─── ❀", sample: "❀ ───► Welcome ◄─── ❀" },
  { name: "Ethereal Heavenly Wing", niche: "Angelic Wing", template: "ʚ˚̣̣̣͙ɞ {text} ʚ˚̣̣̣͙ɞ", sample: "ʚ˚̣̣̣͙ɞ Heavenly Spirit ʚ˚̣̣̣͙ɞ" },
  { name: "Star Banner Signette", niche: "Vintage Star", template: "✮ :･ﾟ  {text}  ﾟ･: ✮", sample: "✮ :･ﾟ  Make a Wish  ﾟ･: ✮" },
  { name: "Discord Cyber Box", niche: "Tech Retro", template: "┌─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───┐\n  {text}\n└─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───┘", sample: "┌─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───┐\n  Server Rules\n└─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───┘" },
  { name: "Cosmic Nebula Orbit", niche: "Space Horizon", template: "☄️ * . 🪐 {text} 🪐 . * ☄️", sample: "☄️ * . 🪐 Star Explorer 🪐 . * ☄️" },
  { name: "Lofi Retro Walkman", niche: "Vintage Cyber", template: "📺 彡〖 {text} 〗彡 📺", sample: "📺 彡〖 Night Drive 〗彡 📺" },
  { name: "Cute Kitten Tail", niche: "Animal Kawaii", template: "🐾 🐱 {text} 🐱 🐾", sample: "🐾 🐱 My Cozy Room 🐱 🐾" },
  { name: "Ethereal Witch Cauldron", niche: "Mystical Coziness", template: "🔮🕯️ {text} 🕯️🔮", sample: "🔮🕯️ Shadow Magic 🕯️🔮" },
  { name: "Cottagecore Moss Line", niche: "Forest Moss", template: "🐌 🌿 ──── {text} ──── 🌿 🐌", sample: "🐌 🌿 ──── Green Leaves ──── 🌿 🐌" },
  { name: "Imperial Cross Sword", niche: "Metal Gothic", template: "✖️ ⛓️ {text} ⛓️ ✖️", sample: "✖️ ⛓️ Restless Soul ⛓️ ✖️" },
  { name: "Chic Chevron Arrows", niche: "Modern Tag", template: "»»─────► {text} ◄─────««", sample: "»»─────► Read More ◄─────««" },
  { name: "Double Bracket Enclosure", niche: "Minimalist Outline", template: "【【 {text} 】】", sample: "【【 Season Finale 】】" },
  { name: "Vintage Scroll Border", niche: "Historical Line", template: "📜 ✦───⊱ {text} ⊰───✦ 📜", sample: "📜 ✦───⊱ Lost Artifact ⊰───✦ 📜" },
  { name: "Aesthetic Sparkling Dividers", niche: "Sparkling Border", template: "✧♬•*¨*•.｡ {text} ｡.•*¨*•♬✧", sample: "✧♬•*¨*•.｡ Happy Beats ｡.•*¨*•♬✧" },
  { name: "Delicate Underlined Accent", niche: "Chic Elegance", template: "┊  {text}  ┊\n ﹌﹌﹌﹌﹌﹌﹌", sample: "┊  Lounge Playlist  ┊\n ﹌﹌﹌﹌﹌﹌﹌" },
  { name: "Zen Garden Bamboo", niche: "Peaceful Oriental", template: "🎋 ── {text} ── 🎋", sample: "🎋 ── Tea Session ── 🎋" }
];

export default function SymbolsHub({ triggerToast }: { triggerToast: (msg: string) => void }) {
  // Navigation
  const [activeSubTab, setActiveSubTab] = useState<"directory" | "templates">("directory");
  const [directoryCat, setDirectoryCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Custom Ornament input text for real-time previewing
  const [decoratorInput, setDecoratorInput] = useState<string>("Aesthetic Text");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Scratchpad logic
  const [scratchpad, setScratchpad] = useState<string>("");
  
  // Favorites synced with localStorage
  const [starredSymbols, setStarredSymbols] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("picsart_symbols_favs");
      return saved ? JSON.parse(saved) : ["✨", "♥", "✦", "【", "】", "✿", "♪"];
    } catch {
      return ["✨", "♥", "✦", "【", "】", "✿", "♪"];
    }
  });

  const toggleFavorite = (char: string) => {
    setStarredSymbols(prev => {
      const next = prev.includes(char) ? prev.filter(c => c !== char) : [...prev, char];
      localStorage.setItem("picsart_symbols_favs", JSON.stringify(next));
      return next;
    });
    triggerToast(starredSymbols.includes(char) ? "Removed from favorites!" : "Saved to Symbol Favorites! ⭐");
  };

  // Inspect symbol
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolItem | null>(() => {
    return CURATED_SYMBOLS["hearts_love"][1] || null;
  });

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    let total = 0;
    Object.keys(CURATED_SYMBOLS).forEach(cat => {
      const len = CURATED_SYMBOLS[cat].length;
      counts[cat] = len;
      total += len;
    });
    counts["all"] = total;
    counts["starred"] = starredSymbols.length;
    return counts;
  }, [starredSymbols]);

  const performCopy = (str: string) => {
    try {
      navigator.clipboard.writeText(str);
      setCopiedText(str);
      triggerToast(`Copied "${str}" to clipboard!`);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const appendToScratchpad = (char: string) => {
    setScratchpad(prev => prev + char);
    triggerToast(`Added "${char}" to combos scratchpad!`);
  };

  // Filtered Symbols list
  const filteredSymbolsList = useMemo(() => {
    const list: SymbolItem[] = [];
    const query = searchQuery.trim().toLowerCase();

    if (directoryCat === "starred") {
      Object.keys(CURATED_SYMBOLS).forEach(cat => {
        CURATED_SYMBOLS[cat].forEach(item => {
          if (starredSymbols.includes(item.char)) {
            if (!list.some(x => x.char === item.char)) {
              list.push(item);
            }
          }
        });
      });
    } else {
      Object.keys(CURATED_SYMBOLS).forEach(cat => {
        if (directoryCat === "all" || directoryCat === cat) {
          list.push(...CURATED_SYMBOLS[cat]);
        }
      });
    }

    if (!query) return list;

    return list.filter(item => {
      return (
        item.char === query ||
        item.name.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    });
  }, [directoryCat, searchQuery, starredSymbols]);

  return (
    <div id="picsart-symbols-hub-section" className="space-y-6">
      
      {/* 1. EMBEDDED INTRO PANE */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-pink-950 text-white p-5 md:p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial-gradient from-fuchsia-500/20 to-transparent pointer-events-none opacity-60" />
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase font-black bg-fuchsia-600 text-white px-2.5 py-0.5 rounded-full select-none tracking-wider font-mono">
              PicsArt Style
            </span>
            <h2 className="text-base md:text-lg font-black tracking-tight font-sans">
              Aesthetic Text Symbols & Borders
            </h2>
          </div>
          <p className="text-xs text-indigo-200 max-w-xl font-medium">
            Copy-paste cool text decorators, lines, bracket symbols, arrows, wings, and hearts. Build your bio combinations or choose beautiful real-time border frames easily.
          </p>
        </div>

        <div className="flex bg-white/10 p-1 rounded-xl border border-white/15 shrink-0 z-10 self-start md:self-auto shadow-inner">
          <button
            onClick={() => setActiveSubTab("directory")}
            className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "directory" ? "bg-white text-indigo-950 shadow-sm" : "hover:bg-white/10 text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Symbols Palette</span>
          </button>
          <button
            onClick={() => setActiveSubTab("templates")}
            className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "templates" ? "bg-white text-indigo-950 shadow-sm" : "hover:bg-white/10 text-white"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Border Templates</span>
          </button>
        </div>
      </div>

      {/* 2. TAB CONTENT - SYMBOLS PALETTE GREETING */}
      {activeSubTab === "directory" && (
        <div className="space-y-6">
          
          {/* SYMBOL CONTROLLER OPTIONS BAR */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs space-y-4">
            
            {/* Category Filter Pills */}
            <div className="flex gap-1.5 flex-wrap w-full">
              {[
                { id: "all", label: "All Symbols", icon: "✨" },
                { id: "hearts_love", label: "Hearts & Love", icon: "♥" },
                { id: "stars_glitter", label: "Stars & Glitter", icon: "✦" },
                { id: "brackets_accents", label: "Brackets", icon: "【" },
                { id: "arrows_direction", label: "Arrows", icon: "➔" },
                { id: "nature_leaves", label: "Flora & Sky", icon: "✿" },
                { id: "music_media", label: "Music & Beats", icon: "♪" },
                { id: "math_numbers", label: "Math Symbols", icon: "√" },
                { id: "money_currency", label: "Currency", icon: "$" },
                { id: "lines_boxes", label: "Lines & Boxes", icon: "─" },
                { id: "cool_misc", label: "Witchy & Misc", icon: "☯" },
                { id: "starred", label: "Starred", icon: "⭐" }
              ].map(cat => {
                const isActive = directoryCat === cat.id;
                const count = categoryCounts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setDirectoryCat(cat.id);
                    }}
                    className={`text-[11px] px-3 py-2 font-bold rounded-xl transition duration-150 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <span className="text-xs select-none font-mono">{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span className={`text-[8.5px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? "bg-white/25 text-white font-black" : "bg-gray-200 text-gray-400"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Input search query + Hot quick tags row */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-gray-100 pt-4">
              
              <div className="flex flex-wrap gap-1.5 items-center w-full md:flex-1">
                <span className="text-[10px] font-mono uppercase font-black text-gray-400 select-none mr-1 flex items-center gap-1">
                  <Hash className="w-3 h-3 text-purple-400" />
                  Quick tags:
                </span>
                {[
                  { label: "Hearts", val: "heart" },
                  { label: "Sparkles", val: "sparkle" },
                  { label: "Lines", val: "line" },
                  { label: "Brackets", val: "bracket" },
                  { label: "Cursors", val: "pointer" },
                  { label: "Leaves", val: "leaf" },
                  { label: "Melody", val: "music" },
                  { label: "Witchy", val: "witchy" }
                ].map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(tag.val)}
                    className={`text-[10px] px-2.5 py-1 rounded-md transition font-semibold cursor-pointer border ${
                      searchQuery === tag.val
                        ? "bg-purple-50 border-purple-350 text-purple-750"
                        : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600"
                    }`}
                  >
                    #{tag.label}
                  </button>
                ))}
              </div>

              {/* Text Search container */}
              <div className="relative w-full md:w-80 shrink-0">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Query: star, bracket, arrow, chess..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-10 pr-9 bg-gray-50 border border-gray-250 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium placeholder:text-gray-400 text-gray-800"
                />
                
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* MAIN GRID AND INSPECTOR SPLIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* COLUMN 1: INTERACTIVE SYMBOLS GRID BOARD (8 Columns) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 select-none">
                  <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider select-none font-sans">
                      PicsArt Text Symbols Matrix ({filteredSymbolsList.length} Glyphs)
                    </h3>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                      Tap any symbol card below to inspect unicode details, copy unicode quickly or attach to your bio generator scratchpad.
                    </p>
                  </div>
                  <span className="text-[10px] text-purple-700 bg-purple-50 font-black px-2.5 py-1 rounded-md uppercase tracking-wider select-none">
                    {directoryCat === "starred" ? "⭐ Curated Stars" : `${directoryCat.replace("_", " ").toUpperCase()}`}
                  </span>
                </div>

                {filteredSymbolsList.length > 0 ? (
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 max-h-[500px] overflow-y-auto pr-1">
                    {filteredSymbolsList.map((item, idx) => {
                      const isCopied = copiedText === item.char;
                      const isSelected = selectedSymbol?.char === item.char;
                      const isStarred = starredSymbols.includes(item.char);

                      return (
                        <button
                          key={`${item.char}-${idx}`}
                          onClick={() => {
                            setSelectedSymbol(item);
                            performCopy(item.char);
                          }}
                          className={`aspect-square p-2 border rounded-xl flex flex-col items-center justify-center transition duration-150 relative group cursor-pointer ${
                            isSelected
                              ? "bg-purple-50/70 border-purple-500 ring-2 ring-purple-600/25 scale-102"
                              : isCopied 
                                ? "bg-fuchsia-50 border-fuchsia-500 shadow-3xs" 
                                : "bg-gray-50/50 border-gray-200 hover:border-purple-300 hover:bg-white"
                          }`}
                          title={`${item.name} | Category: ${item.category}`}
                        >
                          {/* Symbol Output */}
                          <span className="text-2xl font-semibold select-all font-sans select-none">{item.char}</span>
                          
                          <span className="text-[8px] font-mono mt-1 text-gray-400 line-clamp-1 select-none font-bold">
                            {item.char.length > 1 ? "Twin" : item.char.charCodeAt(0).toString(16).toUpperCase()}
                          </span>

                          {/* Quick Copied Action State Indicator */}
                          {isCopied && (
                            <div className="absolute top-1 right-1 bg-fuchsia-600 text-white rounded-full p-0.5" style={{ fontSize: "5px" }}>
                              <Check className="w-1.5 h-1.5" />
                            </div>
                          )}

                          {/* Favorite Star state indicator */}
                          {isStarred && !isCopied && (
                            <span className="absolute top-1 right-1 text-[8px] text-amber-500 select-none">
                              ★
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-xl space-y-2 border border-gray-150-grid select-none">
                    <div className="text-3xl">🔮</div>
                    <p className="text-xs text-gray-500 font-extrabold">No custom symbols match "{searchQuery}"</p>
                    <p className="text-[10px] text-gray-400 font-semibold font-sans">Try resizing tags or select clear filters above.</p>
                  </div>
                )}
              </div>

              {/* BIO COMBO BUILDER IN SYMBOLS HUB */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-150 rounded-2xl p-5 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between select-none">
                  <div>
                    <h4 className="text-xs font-black text-gray-800 flex items-center gap-1.5 select-none font-sans">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      PicsArt Custom Bio Combo Mixer
                    </h4>
                    <p className="text-[10px] text-gray-400 font-medium">
                      Formulate unique aesthetic bio templates! Type normally or attach clicked symbols above. Include custom spacings instantly.
                    </p>
                  </div>

                  {scratchpad.length > 0 && (
                    <button
                      onClick={() => setScratchpad("")}
                      className="text-[10px] text-red-500 hover:text-red-700 font-bold bg-white/60 border border-red-250 px-2.5 py-1.2 rounded-lg transition duration-150 cursor-pointer"
                    >
                      Reset Mixer
                    </button>
                  )}
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="flex-1 bg-white border border-gray-250 rounded-xl p-3 text-sm font-bold tracking-widest placeholder:text-gray-405 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-850"
                    value={scratchpad}
                    onChange={(e) => setScratchpad(e.target.value)}
                    placeholder="Assemble beautiful customized lines here..."
                  />

                  <button
                    onClick={() => {
                      if (!scratchpad) {
                        triggerToast("The mixer field is empty! Tap some fancy symbols to start.");
                        return;
                      }
                      performCopy(scratchpad);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-3 rounded-xl transition duration-150 cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy Combo</span>
                  </button>
                </div>

                {/* Preset aesthetic spaces */}
                <div className="flex flex-wrap gap-1.5 items-center select-none pt-0.5">
                  <span className="text-[9px] font-mono uppercase font-black text-gray-400 mr-2 flex items-center gap-1">
                    <Scissors className="w-3 h-3" /> Quick Spacers:
                  </span>
                  {[
                    { label: "✦ star space ✦", insert: " ✦ " },
                    { label: "✿ organic ✿", insert: " ✿ " },
                    { label: "― solid line ―", insert: " ──── " },
                    { label: "・ aesthetic dot ・", insert: " ・ " },
                    { label: "» chevron »", insert: " » " },
                    { label: "✨ sparkles ✨", insert: " ✨ " }
                  ].map((spacer, idx) => (
                    <button
                      key={idx}
                      onClick={() => setScratchpad(prev => prev + spacer.insert)}
                      className="text-[10px] bg-white border border-gray-200 hover:border-purple-300 text-gray-600 px-2.5 py-1.2 rounded-lg transition duration-150 cursor-pointer font-medium hover:text-purple-600"
                    >
                      {spacer.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* COLUMN 2: SYMBOL INSPECTOR DETAILED SIDEBAR (4 Columns) */}
            <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-6">
              
              {selectedSymbol ? (
                <div className="bg-white border border-gray-250 rounded-2xl p-5 shadow-xs space-y-5">
                  
                  <div className="flex items-center justify-between border-b border-gray-105 pb-3">
                    <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md uppercase font-mono tracking-wider">
                      Symbol Inspector
                    </span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase select-none">Focused View</span>
                  </div>

                  {/* Gigantic Preview */}
                  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30 border border-gray-200/70 rounded-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                    
                    <span className="text-7xl mb-4 select-all transform hover:scale-110 duration-200 relative z-10 filter drop-shadow-3xs active:scale-95 cursor-pointer leading-none">
                      {selectedSymbol.char}
                    </span>
                    <span className="text-xs font-black text-gray-800 text-center font-sans tracking-tight relative z-10 leading-snug">
                      {selectedSymbol.name}
                    </span>
                    <span className="text-[9px] text-gray-400 lowercase font-mono mt-1 font-semibold select-all">
                      {selectedSymbol.char.split("").map(c => `U+${c.charCodeAt(0).toString(16).toUpperCase()}`).join(", ")}
                    </span>
                  </div>

                  {/* Actions Tray */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => performCopy(selectedSymbol.char)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs p-2.5 rounded-xl transition duration-150 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Character</span>
                    </button>
                    
                    <button
                      onClick={() => toggleFavorite(selectedSymbol.char)}
                      className={`text-xs font-bold p-2.5 rounded-xl transition duration-150 cursor-pointer flex items-center justify-center gap-1.5 ${
                        starredSymbols.includes(selectedSymbol.char)
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                      }`}
                    >
                      <span>★</span>
                      <span>{starredSymbols.includes(selectedSymbol.char) ? "Starred" : "Favorite"}</span>
                    </button>
                  </div>

                  {/* Mixer Injection button */}
                  <button
                    onClick={() => appendToScratchpad(selectedSymbol.char)}
                    className="w-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-705 font-bold text-xs p-2.5 rounded-xl transition duration-150 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Attach to Mixer</span>
                  </button>

                  {/* Meta tags section */}
                  <div className="space-y-2 border-t border-gray-100 pt-4 select-none">
                    <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                      Search Tags & Categorization
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSymbol.tags.map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSearchQuery(tag)}
                          className="text-[9.5px] bg-gray-50 hover:bg-purple-50 hover:text-purple-600 text-gray-500 border border-gray-250 px-2.5 py-1 rounded-md transition duration-150 cursor-pointer font-bold"
                        >
                          #{tag}
                        </button>
                      ))}
                      <span className="text-[9.5px] text-gray-400 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-md lowercase font-mono">
                        cat: {selectedSymbol.category}
                      </span>
                    </div>
                  </div>

                  {/* Standard guidelines info snippet */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[10.5px] text-gray-500 leading-normal flex gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                    <p>
                      <strong>Pro tip:</strong> PicsArt symbols are pure Unicode glyphs. Highlighted configurations operate identically upon Instagram stories and game usernames without any issues.
                    </p>
                  </div>

                </div>
              ) : (
                <div className="bg-white border border-gray-250 rounded-2xl p-8 shadow-xs text-center space-y-2 select-none">
                  <span className="text-4xl text-gray-300 block">👀</span>
                  <h4 className="text-xs font-black text-gray-700">No Symbol Selected</h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">Select any block card from the gallery on your left side to extract precise statistics.</p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* 3. TAB CONTENT - BORDER LIST & HEADER TEMPLATES */}
      {activeSubTab === "templates" && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* USER CUSTOM TYPING INPUT */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="aesthetic-decorator-input" className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 select-none">
                <Type className="w-4 h-4 text-purple-600" />
                <span>Text to Decorate over PicsArt Lines:</span>
              </label>
              
              {decoratorInput && (
                <button
                  onClick={() => setDecoratorInput("")}
                  className="text-[10px] font-bold text-purple-600 hover:text-purple-800"
                >
                  Clear Custom Text
                </button>
              )}
            </div>

            <input
              id="aesthetic-decorator-input"
              type="text"
              placeholder="e.g. Welcome to my profile, rules, happy hour, bio, etc..."
              className="w-full bg-gray-50 border border-gray-250 text-gray-900 rounded-xl p-3 font-semibold text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={decoratorInput}
              onChange={(e) => setDecoratorInput(e.target.value)}
            />

            <p className="text-[10px] text-gray-400 font-bold leading-normal italic">
              * Type above to see your customized text instantly converted into all classic PicsArt ornamental formats below.
            </p>
          </div>

          {/* GENERATED RESULTS MATRIX */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 select-none">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider font-sans">
                Curated Ornament Headers & Dividers
              </h3>
              <span className="text-[9.5px] text-gray-400 font-bold uppercase">
                {CURATED_ORNAMENTS.length} Classic Frameworks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CURATED_ORNAMENTS.map((item, idx) => {
                const filledText = decoratorInput.trim() ? decoratorInput.trim() : "Custom Text";
                // Substitute all literal tags {text} with text
                const renderedResult = item.template.replace(/{text}/g, filledText);
                const isCopied = copiedText === renderedResult;

                return (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 border border-gray-200 hover:border-purple-300 rounded-xl flex flex-col justify-between items-stretch gap-4 transition duration-150 relative group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-purple-700 font-mono tracking-wider">
                          {item.name}
                        </span>
                        <span className="text-[9px] text-gray-400 font-bold bg-white border border-gray-200 px-1.5 py-0.5 rounded">
                          {item.niche}
                        </span>
                      </div>

                      {/* Pure Render Output view */}
                      <pre className="text-xs font-mono font-bold text-gray-800 p-3 bg-white border border-gray-150 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                        {renderedResult}
                      </pre>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => performCopy(renderedResult)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-lg transition duration-150 cursor-pointer flex items-center gap-1.5 shadow-3xs ${
                          isCopied
                            ? "bg-fuchsia-600 text-white"
                            : "bg-purple-600 hover:bg-purple-700 text-white"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied Layout!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Layout</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* DETAILED ACCORDION FAQ SECTION */}
      <div id="symbols-hub-faq-block" className="mt-8 bg-gradient-to-br from-white to-purple-50/20 border border-purple-100 rounded-2xl p-5 md:p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3.5 border-b border-purple-100">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
            <HelpCircle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest font-mono">
              Aesthetic Symbols & Ornaments FAQ
            </h3>
            <p className="text-[10px] text-gray-400 font-bold mt-0.5">
              Learn how native Unicode symbols, custom ornamental headers, and PicsArt-style layouts integrate into social bios.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "What are PicsArt aesthetic symbols and unicode decorations?",
              a: "They are rare typographic glyphs from diverse international alphabets, math notations, and ancient block-drawing sets. Because they are native text symbols, they require absolutely no image loading or external hosting to display beautifully."
            },
            {
              q: "Will these symbols keep their alignment on Instagram, TikTok, and Discord?",
              a: "Yes! Every symbol, spacer, and ornamental layout uses standardized system characters that render beautifully on any major social networking site, instant messenger, or custom gaming nickname field."
            },
            {
              q: "Why do some characters display as empty boxes or question marks?",
              a: "This typographic effect is called 'tofu'. It indicates that your active device or browser font set hasn't implemented support for that specific Unicode subset. Modern iOS and Android devices support nearly 100% of these characters, but older platforms might occasionally display them as hollow squares."
            },
            {
              q: "How can I assemble my own customized name or description banner?",
              a: "Use the custom 'Interactive Scratchpad' inside the Symbol Directory tab! Clicking on any star, heart, or music note appends it to your workspace. You can then insert your custom message and copy the entire completed design with one click."
            },
            {
              q: "Can these elegant dividers wrap custom texts automatically?",
              a: "Definitely! Navigate to the 'Aesthetic Ornaments' tab, type any message in the live input field, and you will see your text automatically compiled into dozens of classic symmetric, oriental, celestial, and cyber-themed templates instantly."
            }
          ].map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-xl transition duration-150 overflow-hidden ${
                  isOpen ? "bg-white border-purple-300 shadow-3xs" : "bg-white/80 border-gray-150 hover:bg-white hover:border-purple-200"
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left py-3.5 px-4 flex items-center justify-between gap-4 cursor-pointer select-none focus:outline-none"
                >
                  <span className="text-xs font-extrabold text-gray-800 flex items-center gap-2">
                    <span className="text-purple-600 font-mono">0{idx + 1}.</span>
                    <span>{item.q}</span>
                  </span>
                  <span className="text-gray-400">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-purple-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
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
