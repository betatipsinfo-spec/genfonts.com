import React, { useState, useMemo } from "react";
import { 
  Copy, 
  Check, 
  Share2, 
  Download, 
  RefreshCw, 
  Sliders, 
  Settings, 
  HelpCircle, 
  ArrowUp,
  Maximize2,
  X,
  Type,
  Frame,
  Shuffle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Robust character maps for our ASCII Fonts
const standardBlockMap: Record<string, string[]> = {
  'A': ["  ██  ", " █  █ ", "██████", "█    █", "█    █"],
  'B': ["█████ ", "█    █", "█████ ", "█    █", "█████ "],
  'C': [" ████ ", "█     ", "█     ", "█     ", " ████ "],
  'D': ["████  ", "█   █ ", "█    █", "█   █ ", "████  "],
  'E': ["██████", "█     ", "████  ", "█     ", "██████"],
  'F': ["██████", "█     ", "████  ", "█     ", "█     "],
  'G': [" ████ ", "█     ", "█  ███", "█    █", " ████ "],
  'H': ["█    █", "█    █", "██████", "█    █", "█    █"],
  'I': ["█████", "  █  ", "  █  ", "  █  ", "█████"],
  'J': ["  ████", "     █", "     █", "█    █", " ████ "],
  'K': ["█   █", "█  █ ", "███  ", "█  █ ", "█   █"],
  'L': ["█     ", "█     ", "█     ", "█     ", "██████"],
  'M': ["█    █", "██  ██", "█ ██ █", "█    █", "█    █"],
  'N': ["█    █", "██   █", "█ █  █", "█  █ █", "█   ██"],
  'O': [" ████ ", "█    █", "█    █", "█    █", " ████ "],
  'P': ["█████ ", "█    █", "█████ ", "█     ", "█     "],
  'Q': [" ████ ", "█    █", "█  █ █", "█   ██", " █████"],
  'R': ["█████ ", "█    █", "█████ ", "█  █  ", "█   █ "],
  'S': [" ████ ", "█     ", " ████ ", "     █", " ████ "],
  'T': ["███████", "   █   ", "   █   ", "   █   ", "   █   "],
  'U': ["█    █", "█    █", "█    █", "█    █", " ████ "],
  'V': ["█    █", "█    █", " █  █ ", " █  █ ", "  ██  "],
  'W': ["█    █", "█    █", "█  █ █", "██  ██", "█    █"],
  'X': ["█    █", " █  █ ", "  ██  ", " █  █ ", "█    █"],
  'Y': ["█    █", " █  █ ", "  ██  ", "  ██  ", "  ██  "],
  'Z': ["██████", "    █ ", "  ██  ", " █    ", "██████"],
  '0': [" ████ ", "█  ███", "█ █  █", "███  █", " ████ "],
  '1': ["  ██ ", "   █ ", "   █ ", "   █ ", " ████"],
  '2': [" ████ ", "     █", "  ███ ", " █    ", "██████"],
  '3': ["█████ ", "    █ ", " ████ ", "    █ ", "█████ "],
  '4': ["█   █ ", "█   █ ", "██████", "    █ ", "    █ "],
  '5': ["██████", "█     ", "█████ ", "     █", "█████ "],
  '6': [" ████ ", "█     ", "█████ ", "█    █", " ████ "],
  '7': ["██████", "    █ ", "   █  ", "  █   ", " █    "],
  '8': [" ████ ", "█    █", " ████ ", "█    █", " ████ "],
  '9': [" ████ ", "█    █", " █████", "     █", " ████ "],
  ' ': ["     ", "     ", "     ", "     ", "     "],
  '?': [" ████ ", "     █", "   ██ ", "      ", "   █  "],
  '!': ["  █  ", "  █  ", "  █  ", "     ", "  █  "],
  '-': ["      ", "      ", " ████ ", "      ", "      "],
  '+': ["      ", "  █   ", "█████ ", "  █   ", "      "],
  '=': ["      ", "█████ ", "      ", "█████ ", "      "],
  '.': ["      ", "      ", "      ", "      ", "  █   "],
  '*': ["  █  ", "█████", "  █  ", " █ █ ", "     "]
};

const slantMap: Record<string, string[]> = {
  'A': ["    /\\    ", "   /  \\   ", "  / /\\ \\  ", " / ____ \\ ", "/_/    \\_\\"],
  'B': ["██████\\   ", "█   __  \\ ", "██████  / ", "█   __  \\ ", "██████ /  "],
  'C': ["  ██████\\ ", " ██  __  \\", " ██ /  \\__|", " ██ \\____ ", " \\██████/ "],
  'D': ["██████\\   ", "█  __██\\  ", "█ /  ██ | ", "█ |__██ | ", "██████  / "],
  'E': ["██████\\\\  ", "█  _____| ", "████\\\\    ", "█  _____| ", "██████\\\\  "],
  'F': ["██████\\\\  ", "█  _____| ", "████\\\\    ", "█  |      ", "█  |      "],
  'G': ["  ██████\\\\ ", " ██  __  \\\\", " ██ /  \\__|", " ██ |  ██\\\\", " \\██████// "],
  'H': ["█    █\\\\  ", "█    █ |  ", "██████ |  ", "█    █ |  ", "█    █ |  "],
  'I': ["████\\\\ ", "  █  | ", "  █  | ", "  █  | ", "████\\\\ "],
  'J': ["  ████\\\\  ", "     █ |  ", "     █ |  ", "█    █ |  ", "\\████//   "],
  'K': ["█   █\\\\   ", "█  █ /    ", "███ /     ", "█  █ \\    ", "█   █\\\\   "],
  'L': ["█    \\\\   ", "█     |   ", "█     |   ", "█     |   ", "██████\\\\  "],
  'M': ["██  ██\\\\  ", "██\\/██ |  ", "█ ██ █ |  ", "█ \\/ █ |  ", "█    █ |  "],
  'N': ["██\\  █\\\\  ", "██\\\\ █ |  ", "█ █\\\\█ |  ", "█  █\\█ |  ", "█   ██ |  "],
  'O': ["  ████\\\\  ", " ██  █ \\\\ ", " ██ █  | |", " ██  █ // ", "  ████//  "],
  'P': ["██████\\\\  ", "█   __  \\\\", "██████ // ", "█  _____| ", "█  |      "],
  'Q': ["  ████\\\\  ", " ██  █ \\\\ ", " ██ █  | |", " ██  ██// ", "  ████//██\\\\"],
  'R': ["██████\\\\  ", "█   __  \\\\", "██████ // ", "█  __  \\\\ ", "█ /  █ \\\\ "],
  'S': ["  ██████\\\\", " ██  _____|", " \\██████\\\\ ", "  \\____██ |", " ███████//"],
  'T': ["████████\\\\", "   ██  __/", "   ██ |   ", "   ██ |   ", "   \\__|   "],
  'U': ["█    █\\\\  ", "█    █ |  ", "█    █ |  ", "█    █ |  ", "\\████//   "],
  'V': ["█    █\\\\  ", "█    █ |  ", "██  ██ /  ", " \\██  /   ", "  \\__/    "],
  'W': ["█    █\\\\  ", "█    █ |  ", "█  █ █ |  ", "██\\/██ |  ", "█    █ |  "],
  'X': ["█    █\\\\  ", "██  ██ /  ", "  ██  /   ", "██  ██ \\  ", "█    █\\\\  "],
  'Y': ["█    █\\\\  ", "██  ██ /  ", "  ██  /   ", "  ██  |   ", "  \\___/   "],
  'Z': ["███████\\\\ ", "    ███ / ", "   ███ /  ", "  ███ /   ", "███████\\\\ "],
  '0': ["  ████\\\\  ", " █  ██\\\\ |", " █ █ █ | |", " ████  | |", "  ████//  "],
  '1': ["  ██\\\\    ", "   █ |    ", "   █ /    ", "   █ |    ", "  ████\\\\   "],
  '2': [" ████\\\\   ", "     █ |  ", "  ███ /   ", " █  __/   ", "███████\\\\ "],
  '3': ["█████\\\\   ", "    ██ |  ", " ████ /   ", "    ██ |  ", "█████//   "],
  '4': ["█   █\\\\   ", "█   █ |   ", "██████\\\\  ", "    █  /  ", "    \\_/   "],
  '5': ["██████\\\\  ", "█  ___|   ", "█████\\\\   ", "    ██ |  ", "█████//   "],
  '6': [" ████\\\\   ", " █  __|   ", "█████\\\\   ", "█   ██ |  ", "\\████//   "],
  '7': ["██████\\\\  ", "    ██ /  ", "   ██ /   ", "  ██ /    ", "  \\_/     "],
  '8': [" ████\\\\   ", " █  ██ |  ", " ████ /   ", " █  ██ |  ", "\\████//   "],
  '9': [" ████\\\\   ", " █  ██ |  ", " \\████ |  ", "    ██ |  ", " \\███//   "],
  ' ': ["     ", "     ", "     ", "     ", "     "],
  '?': [" ████\\\\  ", "     █ | ", "   ██ /  ", "   \\_/   ", "   ██\\\\  "],
  '!': ["  ██\\\\   ", "  ██ |   ", "  ██ |   ", "  \\__|   ", "  ██\\\\   "],
  '-': ["         ", "         ", "  █████\\ ", "  \\____/ ", "         "],
  '+': ["         ", "   ██\\\\  ", "██████\\\\ ", "   ██ _/ ", "         "],
  '=': ["         ", "███████\\\\", "         ", "███████\\\\", "         "],
  '.': ["         ", "         ", "         ", "         ", "  ██\\\\   "],
  '*': ["  \\\\ //  ", " \\\\███// ", "  \\\\_//  ", "         ", "         "]
};

const bubblyMap: Record<string, string[]> = {
  'A': ["  oo ", " o  o", " oooo", " o  o", " o  o"],
  'B': [" ooo ", " o  o", " ooo ", " o  o", " ooo "],
  'C': ["  ooo", " o   ", " o   ", " o   ", "  ooo"],
  'D': [" ooo ", " o  o", " o  o", " o  o", " ooo "],
  'E': [" oooo", " o   ", " ooo ", " o   ", " oooo"],
  'F': [" oooo", " o   ", " ooo ", " o   ", " o   "],
  'G': ["  ooo", " o   ", " o oo", " o  o", "  ooo"],
  'H': [" o  o", " o  o", " oooo", " o  o", " o  o"],
  'I': [" ooo ", "  o  ", "  o  ", "  o  ", " ooo "],
  'J': ["  ooo", "    o", "    o", " o  o", "  oo "],
  'K': [" o  o", " o o ", " oo  ", " o o ", " o  o"],
  'L': [" o   ", " o   ", " o   ", " o   ", " oooo"],
  'M': [" o  o", " oo o", " o  o", " o  o", " o  o"],
  'N': [" o  o", " oo o", " o oo", " o  o", " o  o"],
  'O': ["  oo ", " o  o", " o  o", " o  o", "  oo "],
  'P': [" ooo ", " o  o", " ooo ", " o   ", " o   "],
  'Q': ["  oo ", " o  o", " o  o", "  oo ", "    o"],
  'R': [" ooo ", " o  o", " ooo ", " o o ", " o  o"],
  'S': ["  ooo", " o   ", "  oo ", "    o", " ooo "],
  'T': [" oooo", "  o  ", "  o  ", "  o  ", "  o  "],
  'U': [" o  o", " o  o", " o  o", " o  o", "  oo "],
  'V': [" o  o", " o  o", "  oo ", "  oo ", "   o "],
  'W': [" o  o", " o  o", " o  o", " oo o", "  oo "],
  'X': [" o  o", "  oo ", "  oo ", "  oo ", " o  o"],
  'Y': [" o  o", "  oo ", "   o ", "   o ", "   o "],
  'Z': [" oooo", "   o ", "  o  ", " o   ", " oooo"],
  '0': ["  oo ", " o  o", " o  o", " o  o", "  oo "],
  '1': ["  o  ", " oo  ", "  o  ", "  o  ", " ooo "],
  '2': [" ooo ", "    o", "  oo ", " o   ", " oooo"],
  '3': [" ooo ", "    o", "  oo ", "    o", " ooo "],
  '4': [" o  o", " o  o", " oooo", "    o", "    o"],
  '5': [" oooo", " o   ", " ooo ", "    o", " ooo "],
  '6': ["  oo ", " o   ", " ooo ", " o interior", "  oo "], // fallback mapped below
  '7': [" oooo", "    o", "   o ", "  o  ", "  o  "],
  '8': ["  oo ", " o  o", "  oo ", " o  o", "  oo "],
  '9': ["  oo ", " o  o", "  ooo", "    o", "  oo "],
  ' ': ["     ", "     ", "     ", "     ", "     "],
  '?': ["  oo ", "    o", "   o ", "     ", "   o "],
  '!': ["  o  ", "  o  ", "  o  ", "     ", "  o  "],
  '-': ["     ", "     ", " ooo ", "     ", "     "],
  '+': ["     ", "  o  ", " ooo ", "  o  ", "     "],
  '=': ["     ", " ooo ", "     ", " ooo ", "     "],
  '.': ["     ", "     ", "     ", "     ", "  o  "],
  '*': ["  *  ", " *** ", "  *  ", "     ", "     "]
};

// Update Bubble 6-row to 5-row safely
bubblyMap['6'] = ["  oo ", " o   ", " ooo ", " o  o", "  oo "];

const cyberMap: Record<string, string[]> = {
  'A': ["┌───┐", "│ ┌─┤", "├─┴─┤", "│ ┬ │", "└─┴─┘"],
  'B': ["├───┐", "├─┬─┘", "├─┴─┐", "│ ┬ │", "└───┘"],
  'C': ["┌───┐", "│ ┌─┘", "│ │  ", "│ └─┐", "└───┘"],
  'D': ["├───┐", "│ ┬ │", "│ │ │", "│ ┴ │", "└───┘"],
  'E': ["┌───┐", "├───┤", "├─┬─┘", "│ └─┐", "└───┘"],
  'F': ["┌───┐", "├───┤", "├─┬─┘", "│ │  ", "└─┘  "],
  'G': ["┌───┐", "│ ┌─┘", "│ │ ┬", "│ └─┤", "└───┘"],
  'H': ["┌─┬─┐", "│ └ │", "├───┤", "│ ┬ │", "└─┴─┘"],
  'I': ["┌─┬─┐", "  │  ", "  │  ", "  │  ", "└─┴─┘"],
  'J': ["┌─┬─┐", "  │  ", "  │  ", "│ └ │", "└───┘"],
  'K': ["┌─┬─┐", "│ └─┘", "├─┬─┐", "│ ┌─┤", "└─┴─┘"],
  'L': ["┌─┐  ", "│ │  ", "│ │  ", "│ └─┐", "└───┘"],
  'M': ["┌───┐", "│ █ │", "│ ┬ │", "│ │ │", "└─┴─┘"],
  'N': ["┌───┐", "│ █ │", "│ └ │", "│ █ │", "└─┴─┘"],
  'O': ["┌───┐", "│ ┬ │", "│ │ │", "│ ┴ │", "└───┘"],
  'P': ["┌───┐", "├─┬─┘", "├─┘  ", "│    ", "└─   "],
  'Q': ["┌───┐", "│ ┬ │", "│ │ │", "│ ┴─┤", "└───┘"],
  'R': ["┌───┐", "├─┬─┘", "├─┴─┐", "│ ┬ │", "└─┴─┘"],
  'S': ["┌───┐", "└─┬─┐", "┌─┴─┐", "├─┬─┘", "└───┘"],
  'T': ["┌───┐", "  │  ", "  │  ", "  │  ", "  ┴  "],
  'U': ["┌─┬─┐", "│ │ │", "│ │ │", "│ ┴ │", "└───┘"],
  'V': ["┌─┬─┐", "│ │ │", "└─┼─┘", "  │  ", "  ┴  "],
  'W': ["┌─┬─┐", "│ │ │", "│ ┼ │", "│ █ │", "└───┘"],
  'X': ["┌─┬─┐", "└─┼─┘", "  ┼  ", "┌─┼─┐", "└─┴─┘"],
  'Y': ["┌─┬─┐", "└─┼─┘", "  │  ", "  │  ", "  ┴  "],
  'Z': ["┌───┐", "  ┌─┘", " ┌─┘ ", "┌─┘  ", "└───┘"],
  '0': ["┌───┐", "│ █ │", "│ │ │", "│ █ │", "└───┘"],
  '1': ["┌─┐  ", "  │  ", "  │  ", "  │  ", "──┴──"],
  '2': ["┌───┐", "  ┌─┘", "┌─┴─┐", "│ ┌─┘", "└───┘"],
  '3': ["┌───┐", "  ┌─┘", "┌─┴─┐", "  ┌─┘", "└───┘"],
  '4': ["┌─┬─┐", "│ ┴ │", "└───┤", "    │", "    ┴"],
  '5': ["┌───┐", "├───┘", "└───┐", "  ┌─┘", "──┘  "],
  '6': ["┌───┐", "├────", "├───┐", "│ ┬ │", "└───┘"],
  '7': ["┌───┐", "  ┌─┘", " ┌─┘ ", " │   ", " ┴   "],
  '8': ["┌───┐", "├─┬─┤", "├─┴─┤", "│ ┬ │", "└───┘"],
  '9': ["┌───┐", "│ ┬ │", "└───┤", "  ┌─┘", "──┘  "],
  ' ': ["     ", "     ", "     ", "     ", "     "],
  '?': ["┌───┐", "  ┌─┘", " ┌─┘ ", "     ", " ┌─┐ "],
  '!': ["┌─┐  ", "│ │  ", "└─┘  ", "     ", "┌─┐  "],
  '-': ["     ", "     ", "───  ", "     ", "     "],
  '+': ["     ", "  ╪  ", "──┼──", "  ╪  ", "     "],
  '=': ["     ", "═════", "     ", "═════", "     "],
  '.': ["     ", "     ", "     ", "     ", " ┌─┐ "],
  '*': [" ┌─┐ ", "─┼─┼─", " ┌─┘ ", "     ", "     "]
};

const miniMap: Record<string, string[]> = {
  'A': [" █ ", "███", "█ █"],
  'B': ["██ ", "███", "██ "],
  'C': ["███", "█  ", "███"],
  'D': ["██ ", "█ █", "██ "],
  'E': ["███", "██ ", "███"],
  'F': ["███", "██ ", "█  "],
  'G': ["███", "█ █", "███"],
  'H': ["█ █", "███", "█ █"],
  'I': ["███", " █ ", "███"],
  'J': [" ██", "  █", "███"],
  'K': ["█ █", "██ ", "█ █"],
  'L': ["█  ", "█  ", "███"],
  'M': ["███", "█ █", "█ █"],
  'N': ["███", "███", "█ █"],
  'O': ["███", "█ █", "███"],
  'P': ["███", "███", "█  "],
  'Q': ["███", "███", " ██"],
  'R': ["██ ", "███", "█ █"],
  'S': ["███", "██ ", " ██"],
  'T': ["███", " █ ", " █ "],
  'U': ["█ █", "█ █", "███"],
  'V': ["█ █", "█ █", " █ "],
  'W': ["█ █", "█ █", "███"],
  'X': ["█ █", " █ ", "█ █"],
  'Y': ["█ █", " █ ", " █ "],
  'Z': ["███", " █ ", "███"],
  '0': ["███", "█ █", "███"],
  '1': [" █ ", " █ ", " █ "],
  '2': ["███", " █ ", "███"],
  '3': ["███", "███", "███"],
  '4': ["█ █", "███", "  █"],
  '5': ["███", "██ ", "███"],
  '6': ["███", "███", "███"],
  '7': ["███", "  █", "  █"],
  '8': ["███", "███", "███"],
  '9': ["███", "███", "███"],
  ' ': ["   ", "   ", "   "],
  '?': ["███", "  █", "  █"],
  '!': [" █ ", " █ ", " █ "],
  '-': ["   ", "███", "   "],
  '+': [" █ ", "███", " █ "],
  '=': ["███", "   ", "███"],
  '.': ["   ", "   ", " █ "],
  '*': ["* *", " * ", "* *"]
};

export interface AsciiFont {
  id: string;
  name: string;
  description: string;
  height: number;
  charMap: Record<string, string[]>;
}

export const ASCII_FONTS: AsciiFont[] = [
  {
    id: "standard",
    name: "Classic Bold Block",
    description: "Solid high-density standard block typeface",
    height: 5,
    charMap: standardBlockMap
  },
  {
    id: "slant",
    name: "Modern Slanted",
    description: "Sleek italicized slanted ASCII outline style",
    height: 5,
    charMap: slantMap
  },
  {
    id: "bubbly",
    name: "Rounded Bubbly",
    description: "Friendly bubble-ring outline style representation",
    height: 5,
    charMap: bubblyMap
  },
  {
    id: "cyber",
    name: "Cyber Grid Tech",
    description: "Retro grid console interface ASCII style",
    height: 5,
    charMap: cyberMap
  },
  {
    id: "mini",
    name: "Compact Micro",
    description: "Saves horizontal room, elegant 3-row blocks",
    height: 3,
    charMap: miniMap
  }
];

interface AsciiGeneratorProps {
  inputText: string;
  setInputText: (text: string) => void;
  triggerToast: (msg: string) => void;
}

export default function AsciiGenerator({
  inputText,
  setInputText,
  triggerToast
}: AsciiGeneratorProps) {
  const [selectedFont, setSelectedFont] = useState<string>("standard");
  const [fillChar, setFillChar] = useState<string>("█");
  const [customFill, setCustomFill] = useState<string>("");
  const [letterSpacing, setLetterSpacing] = useState<string>("comfy");
  const [borderStyle, setBorderStyle] = useState<string>("single");
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [showFaq, setShowFaq] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const currentFont = useMemo(() => {
    return ASCII_FONTS.find(f => f.id === selectedFont) || ASCII_FONTS[0];
  }, [selectedFont]);

  // Determine which fill character is active
  const activeFillChar = useMemo(() => {
    if (fillChar === "custom") {
      return customFill.substring(0, 1) || "█";
    }
    return fillChar;
  }, [fillChar, customFill]);

  // Main compilation logic
  const renderedAscii = useMemo(() => {
    if (!inputText.trim()) {
      return "   ( PLEASE TYPE WORDS ON THE INPUT PANEL ABOVE OR HERE )   ";
    }

    const words = inputText.split("\n");
    const renderedWords = words.map(word => {
      if (!word.trim()) return "";
      
      const rows: string[] = Array(currentFont.height).fill("");
      let spacingStr = " ";
      if (letterSpacing === "none") spacingStr = "";
      else if (letterSpacing === "comfy") spacingStr = "  ";
      else if (letterSpacing === "wide") spacingStr = "    ";

      for (let i = 0; i < word.length; i++) {
        const char = word[i].toUpperCase();
        // Lookup standard character map or fallback to space
        let mapped = currentFont.charMap[char] || currentFont.charMap[' '];
        
        // Final sanity safeguard if spacing matches
        if (!mapped || mapped.length !== currentFont.height) {
          mapped = Array(currentFont.height).fill(" ".repeat(5));
        }

        for (let r = 0; r < currentFont.height; r++) {
          let lineSegment = mapped[r];
          // Dynamically swap template solids with user's selected fill character
          if (activeFillChar !== "█") {
            lineSegment = lineSegment.replace(/█/g, activeFillChar);
            // Optionally map 'o' in bubbly as well
            if (currentFont.id === "bubbly") {
              lineSegment = lineSegment.replace(/o/g, activeFillChar);
            }
          }
          rows[r] += lineSegment + spacingStr;
        }
      }
      return rows.join("\n");
    });

    const parsedBanners = renderedWords.filter(Boolean).join("\n\n");

    // Implement border box wrap
    if (borderStyle !== "none" && parsedBanners) {
      const lines = parsedBanners.split("\n");
      const maxLength = Math.max(...lines.map(l => l.length));
      
      let top = "";
      let bottom = "";
      let left = "";
      let right = "";

      if (borderStyle === "single") {
        top = "┌" + "─".repeat(maxLength + 2) + "┐";
        bottom = "└" + "─".repeat(maxLength + 2) + "┘";
        left = "│ ";
        right = " │";
      } else if (borderStyle === "double") {
        top = "╔" + "═".repeat(maxLength + 2) + "╗";
        bottom = "╚" + "═".repeat(maxLength + 2) + "╝";
        left = "║ ";
        right = " ║";
      } else if (borderStyle === "stars") {
        top = "★" + "═".repeat(maxLength + 2) + "★";
        bottom = "★" + "═".repeat(maxLength + 2) + "★";
        left = "★ ";
        right = " ★";
      } else if (borderStyle === "sparkles") {
        top = "✨" + "─".repeat(maxLength + 2) + "✨";
        bottom = "✨" + "─".repeat(maxLength + 2) + "✨";
        left = "✨ ";
        right = " ✨";
      }

      const boxed = lines.map(line => {
        const padding = " ".repeat(maxLength - line.length);
        return left + line + padding + right;
      });

      return [top, ...boxed, bottom].join("\n");
    }

    return parsedBanners;
  }, [inputText, currentFont, activeFillChar, letterSpacing, borderStyle]);

  // Handle immediate clipboard copying
  const handleCopy = () => {
    if (!renderedAscii) return;
    try {
      navigator.clipboard.writeText(renderedAscii);
      setCopied(true);
      triggerToast("ASCII Banner copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
      
      // Dispatch standard DOM event to trigger regional session logging in App.tsx
      const copyEvent = new Event("copy");
      document.dispatchEvent(copyEvent);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  // Handle device application sharing
  const handleShare = async () => {
    if (!renderedAscii) return;
    if (navigator.share) {
      try {
        await navigator.share({
          text: renderedAscii,
        });
        setShared(true);
        triggerToast("ASCII Banner shared successfully!");
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.warn("Share canceled:", err);
      }
    } else {
      // Fallback to copy action
      handleCopy();
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  // Download ASCII masterpiece as a standard raw text file
  const handleDownload = () => {
    if (!renderedAscii) return;
    try {
      const blob = new Blob([renderedAscii], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ascii-banner-${selectedFont}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerToast("TXT banner downloaded successfully!");
    } catch(err) {
      console.error("TXT export error:", err);
    }
  };

  // Randomize font selection and parameters
  const randomizeSettings = () => {
    const fonts = ASCII_FONTS.map(f => f.id);
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    setSelectedFont(randomFont);

    const fillings = ["█", "#", "@", "*", "+", "░", "custom"];
    const randomFill = fillings[Math.floor(Math.random() * fillings.length)];
    setFillChar(randomFill);
    if (randomFill === "custom") {
      const customSymbols = ["$", "✿", "❤", "▲", "◆", "✔", "★", "⚡"];
      setCustomFill(customSymbols[Math.floor(Math.random() * customSymbols.length)]);
    }

    const borders = ["none", "single", "double", "stars", "sparkles"];
    setBorderStyle(borders[Math.floor(Math.random() * borders.length)]);

    const spacings = ["none", "comfy", "wide"];
    setLetterSpacing(spacings[Math.floor(Math.random() * spacings.length)]);

    triggerToast("Randomized ASCII generator settings!");
  };

  const asciiFaq = [
    {
      q: "Where does this ASCII banner render best?",
      a: "Because they use multiple lines of standard graphic letters, they look flawless on platform environments that support 'Monospace' fonts (such as raw text files, Discord markdown cards, GitHub readmes, reddit threads, and gaming server descriptions)."
    },
    {
      q: "How does the custom 'Fill Style' work?",
      a: "Our algorithm takes original solid character templates and sweeps through them to swap out the filler block character. You can choose classic hashtags, futuristic cyber grids, or type any custom symbol of your choice!"
    },
    {
      q: "Why do some ASCII fonts look misaligned or scrambled?",
      a: "ASCII art relies entirely on identical width formatting (monospaced typography). If you view or paste it in a standard proportional font (like Arial or Calibri), characters will have different widths and the shapes will collapse. Always toggle a 'monospace' display, code block format, or raw text mode wherever you paste it!"
    },
    {
      q: "What does the 'Letter Spacing' modifier change?",
      a: "Letter spacing alters the padding columns placed between each word character in the generator algorithm. 'None' crams glyphs tightly together for a brutalist solid aesthetic, 'Comfy' adds standard breathing space, and 'Wide' pulls elements apart, turning the characters into airy, modern text patterns."
    },
    {
      q: "Can I save, download, or share my generated ASCII banners?",
      a: "Yes! Use the 'Copy ASCII text banner' button to instantly save the plain-text artwork to your clipboard. Alternatively, click 'Download TXT' to grab a fully formatted offline `.txt` document file ready for distribution, and select 'Share Dynamic Art' to instantly update the master preview URL."
    }
  ];

  return (
    <div id="ascii-generator-subsystem" className="space-y-6">
      
      {/* SECTION EXPLANATION BAR */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white rounded-2xl p-5 md:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black bg-indigo-500 text-white px-2.5 py-0.5 rounded-full select-none">
              Aesthetic Core
            </span>
            <h2 className="text-base md:text-lg font-black tracking-tight font-sans">
              ASCII Text & Banner Generator
            </h2>
          </div>
          <p className="text-xs text-indigo-200 font-medium">
            Turn your plain text into beautiful multi-line terminal banners, big fonts, & stylish cyber block drawings. Paste anywhere!
          </p>
        </div>

        <div className="flex gap-2">
          <button
            id="ascii-faq-accordion-trigger"
            onClick={() => {
              const el = document.getElementById("ascii-generator-faq-block");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ Guide</span>
          </button>
          <button
            id="ascii-randomizer-trigger"
            onClick={randomizeSettings}
            className="text-xs font-bold text-indigo-900 bg-white hover:bg-indigo-50 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Shuffle className="w-4 h-4" />
            <span>Surprise Me!</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* INTERACTIVE CONTROLLER ACTIONS SIDEBAR (Takes 4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* FONT SELECTOR BOARD */}
          <div className="bg-white border border-gray-250 p-4 rounded-xl shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
              <Type className="w-4 h-4 text-indigo-600" />
              <span>Select ASCII Typography:</span>
            </h3>

            <div className="space-y-2">
              {ASCII_FONTS.map(font => {
                const isActive = selectedFont === font.id;
                return (
                  <button
                    key={font.id}
                    id={`ascii-font-card-${font.id}`}
                    onClick={() => setSelectedFont(font.id)}
                    className={`w-full text-left p-3 rounded-lg border transition duration-150 flex flex-col justify-start gap-0.5 cursor-pointer ${
                      isActive 
                        ? "bg-indigo-50/60 border-indigo-400 shadow-3xs" 
                        : "bg-white border-gray-150 hover:border-indigo-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-black text-gray-800">
                        {font.name}
                      </span>
                      {isActive && (
                        <span className="text-[9px] font-black text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded-full uppercase">
                          Selected
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {font.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PARAMETERS FINE-TUNING DRAWER */}
          <div className="bg-white border border-gray-250 p-4 rounded-xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Configure Render Rules:</span>
            </h3>

            {/* FILL CHARACTER SELECTION */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-650 block select-none">
                Ink Filler Glyphs:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { value: "█", name: "Solid" },
                  { value: "#", name: "Hashtag" },
                  { value: "@", name: "At-Sign" },
                  { value: "*", name: "Star" },
                  { value: "+", name: "Cross" },
                  { value: "░", name: "Cyber" },
                  { value: "o", name: "Bubble" },
                  { value: "custom", name: "Custom" }
                ].map(fill => (
                  <button
                    key={fill.value}
                    id={`fill-char-btn-${fill.name}`}
                    onClick={() => setFillChar(fill.value)}
                    className={`text-[10px] p-2 flex flex-col items-center justify-center gap-1 border rounded-lg font-bold transition duration-150 cursor-pointer ${
                      fillChar === fill.value
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xs font-mono font-black">{fill.value === "custom" ? "✎" : fill.value}</span>
                    <span className="text-[8px] uppercase">{fill.name}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic text input for Custom fillers */}
              <AnimatePresence>
                {fillChar === "custom" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="pt-2"
                  >
                    <input
                      id="custom-ascii-fill-input"
                      type="text"
                      maxLength={1}
                      placeholder="Type custom symbol (e.g. $, ✿, ★)..."
                      value={customFill}
                      onChange={(e) => setCustomFill(e.target.value)}
                      className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-center"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* LETTER SPACING */}
            <div className="space-y-1.5 pt-1 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-650 block select-none">
                Horizontal Char-Spacing:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { value: "none", name: "Tight" },
                  { value: "comfy", name: "Balanced" },
                  { value: "wide", name: "Super Wide" }
                ].map(spacing => (
                  <button
                    key={spacing.value}
                    id={`spacing-btn-${spacing.value}`}
                    onClick={() => setLetterSpacing(spacing.value)}
                    className={`text-[10px] p-2 rounded-lg border font-bold transition duration-150 cursor-pointer text-center ${
                      letterSpacing === spacing.value
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {spacing.name}
                  </button>
                ))}
              </div>
            </div>

            {/* DECORATION BOX FRAME */}
            <div className="space-y-1.5 pt-1 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-650 block select-none">
                Aesthetic Outer Borders:
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { value: "none", label: "None" },
                  { value: "single", label: "┌─┐" },
                  { value: "double", label: "╔═╗" },
                  { value: "stars", label: "★═★" },
                  { value: "sparkles", label: "✨" }
                ].map(b => (
                  <button
                    key={b.value}
                    id={`border-btn-${b.value}`}
                    onClick={() => setBorderStyle(b.value)}
                    className={`text-[9px] p-1.5 rounded-lg border font-bold transition duration-150 cursor-pointer text-center flex flex-col justify-center items-center h-10 ${
                      borderStyle === b.value
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                    title={`Box border: ${b.value}`}
                  >
                    <span className="font-mono text-[10px]">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* TERMINAL OUTPUT VISUAL DISPLAY CANVAS (Takes 8 columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-gray-950 border border-gray-900 rounded-2xl shadow-xl flex flex-col overflow-hidden">
            
            {/* Terminal Tab Bar */}
            <div className="bg-gray-900/90 py-3 px-4 border-b border-gray-850 flex items-center justify-between">
              
              {/* Left visual dots */}
              <div className="flex items-center gap-1.5 select-none">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full inline-block"></span>
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full inline-block"></span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block"></span>
                <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider pl-2 gap-1.5 flex items-center">
                  <span>Renderer Terminal</span>
                  <span className="text-gray-700 select-none">•</span>
                  <span className="text-indigo-400 font-black uppercase text-[9px] bg-indigo-950/70 border border-indigo-900 px-2 py-0.5 rounded-md">
                    {currentFont.name} font
                  </span>
                </span>
              </div>

              {/* Toolbar Quick Action items on right */}
              <div className="flex items-center gap-1.5">
                <button
                  id="ascii-maximize-trigger"
                  onClick={() => setPreviewOpen(true)}
                  className="p-1 px-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded transition text-[10px] font-bold flex items-center gap-1 cursor-pointer select-none"
                  title="Expand to Fullscreen View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">FULLSCREEN</span>
                </button>
                <button
                  id="ascii-download-file-btn"
                  onClick={handleDownload}
                  className="p-1 px-2 hover:bg-gray-800 text-indigo-400 hover:text-indigo-300 rounded transition text-[10px] font-bold flex items-center gap-1 cursor-pointer select-none"
                  title="Export raw .txt file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">DOWNLOAD FILE</span>
                </button>
              </div>
            </div>

            {/* Display Box */}
            <div className="p-5 md:p-6 bg-gray-950 flex flex-col justify-center min-h-[16rem]">
              <pre className="font-mono text-[9px] md:text-xs leading-none text-emerald-400 bg-black/40 border border-emerald-950 p-6 rounded-xl overflow-x-auto select-all scrollbar-thin scrollbar-thumb-gray-800 w-full font-bold whitespace-pre">
                {renderedAscii}
              </pre>

              {/* Character statistics tags */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-gray-500 select-none uppercase font-extrabold pb-0.5">
                <div className="flex gap-4">
                  <span>Lines: {renderedAscii.split("\n").length}</span>
                  <span>Width: {Math.max(...renderedAscii.split("\n").map(l => l.length))} symbols</span>
                </div>
                <span>Render Engine Live</span>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="bg-gray-900/40 p-4 border-t border-gray-850 flex items-center justify-between gap-3 flex-wrap">
              <span className="text-[10px] text-gray-400 italic">
                Tip: Copy-paste standard character blocks into files, discord channels, or web text bios!
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  id="ascii-share-big-btn"
                  onClick={handleShare}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1 px-3.5 py-2 rounded-xl transition cursor-pointer ${
                    shared
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{shared ? "Shared!" : "Share Banner"}</span>
                </button>

                <button
                  id="ascii-copy-big-btn"
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1 px-3.5 py-2 rounded-xl transition cursor-pointer shadow-sm ${
                    copied
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "bg-white hover:bg-gray-100 text-gray-950"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied Masterpiece!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy ASCII Art
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* DETAILED ACCORDION FAQ SECTION */}
      <div id="ascii-generator-faq-block" className="mt-8 bg-gradient-to-br from-white to-indigo-50/20 border border-indigo-100 rounded-2xl p-5 md:p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3.5 border-b border-indigo-100">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
            <HelpCircle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest font-mono">
              ASCII Typography & Monospace FAQ
            </h3>
            <p className="text-[10px] text-gray-400 font-bold mt-0.5">
              Learn about monospaced character columns, text spacing matrices, and custom font rendering styles.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {asciiFaq.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-xl transition duration-150 overflow-hidden ${
                  isOpen ? "bg-white border-indigo-300 shadow-3xs" : "bg-white/80 border-gray-150 hover:bg-white hover:border-indigo-200"
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left py-3.5 px-4 flex items-center justify-between gap-4 cursor-pointer select-none focus:outline-none"
                >
                  <span className="text-xs font-extrabold text-gray-800 flex items-center gap-2">
                    <span className="text-indigo-500 font-mono">0{idx + 1}.</span>
                    <span>{item.q}</span>
                  </span>
                  <span className="text-gray-400">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-500" />
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

      {/* FULLSCREEN PREVIEW MODAL */}
      <AnimatePresence>
        {previewOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="ascii-fullscreen-preview-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewOpen(false)}
              className="fixed inset-0 bg-gray-950/80 backdrop-blur-md transition-opacity"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl transform overflow-hidden rounded-2xl bg-gray-950 border border-gray-850 p-6 md:p-8 shadow-2xl text-left transition-all space-y-6 z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-900 pb-4">
                <div>
                  <span className="text-[9px] uppercase font-extrabold bg-indigo-900/80 border border-indigo-700 text-indigo-200 px-2.5 py-1 rounded-full">
                    Fullscreen Render View
                  </span>
                  <h3 className="text-base md:text-lg font-black text-white mt-1">
                    {currentFont.name} ASCII Masterpiece
                  </h3>
                </div>

                <button
                  id="close-ascii-preview-modal"
                  onClick={() => setPreviewOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-900 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large pre display scroll container */}
              <div className="bg-black border border-emerald-950/50 p-6 md:p-10 rounded-xl overflow-x-auto select-all max-h-[30rem] scrollbar-thin">
                <pre className="font-mono text-[9px] sm:text-xs md:text-sm lg:text-base leading-none text-emerald-400 font-bold select-all whitespace-pre">
                  {renderedAscii}
                </pre>
              </div>

              {/* Actions row footer */}
              <div className="flex justify-between items-center flex-wrap gap-4 pt-4 border-t border-gray-900">
                <p className="text-[10px] text-gray-500 font-mono">
                  Characters: {inputText.length} • Spacing: {letterSpacing} • Frame: {borderStyle}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    id="modal-ascii-download-btn"
                    onClick={handleDownload}
                    className="bg-gray-900 hover:bg-gray-850 border border-gray-800 text-gray-300 font-extrabold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download TXT</span>
                  </button>
                  <button
                    id="modal-ascii-copy-btn"
                    onClick={handleCopy}
                    className={`font-extrabold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm ${
                      copied
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-white hover:bg-gray-100 text-gray-950"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied successfully
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy ASCII text banner
                      </>
                    )}
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
