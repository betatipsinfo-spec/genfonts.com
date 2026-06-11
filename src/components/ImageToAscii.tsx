import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Upload, 
  ImageIcon, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Shuffle, 
  RefreshCw, 
  Sliders, 
  HelpCircle, 
  Maximize2, 
  X, 
  VolumeX,
  Languages,
  RotateCcw,
  Palette,
  FileImage,
  Sun,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Predefined character scales for ASCII art depth mapping
export interface CharacterSet {
  id: string;
  name: string;
  characters: string;
}

const CHARACTER_SETS: CharacterSet[] = [
  { id: "standard", name: "Standard Retro", characters: "@%#*+=-:. " },
  { id: "dense", name: "High Precision", characters: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. " },
  { id: "blocks", name: "Brutalist Blocks", characters: "█▓▒░ " },
  { id: "binary", name: "Hex & Binary", characters: "10 " },
  { id: "matrix", name: "Digital Grid", characters: "漢字XYZ789#!+" },
  { id: "minimal", name: "Minimalist Dots", characters: "##..  " }
];

interface AsciiPixel {
  char: string;
  r: number;
  g: number;
  b: number;
  a: number;
}

export default function ImageToAscii({ triggerToast }: { triggerToast: (msg: string) => void }) {
  // Image states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("Sample Pattern");
  
  // Customization Sliders
  const [width, setWidth] = useState<number>(80);
  const [aspectRatioFactor, setAspectRatioFactor] = useState<number>(0.55);
  const [contrast, setContrast] = useState<number>(10);
  const [brightness, setBrightness] = useState<number>(0);
  const [selectedSet, setSelectedSet] = useState<string>("standard");
  const [customChars, setCustomChars] = useState<string>("");
  const [invert, setInvert] = useState<boolean>(false);
  const [grayscaleMode, setGrayscaleMode] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(10);
  
  // Controls & UI States
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Generated output
  const [asciiArt, setAsciiArt] = useState<AsciiPixel[][]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Active character set
  const activeChars = useMemo(() => {
    if (selectedSet === "custom") {
      return customChars || "@%#*+=-:. ";
    }
    const found = CHARACTER_SETS.find(s => s.id === selectedSet);
    return found ? found.characters : CHARACTER_SETS[0].characters;
  }, [selectedSet, customChars]);

  // Generate Sample Pattern using HTML Canvas
  const generateSamplePattern = (type: "abstract" | "portrait" | "spiral") => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill background
    ctx.fillStyle = "#0c1017";
    ctx.fillRect(0, 0, 300, 300);

    if (type === "abstract") {
      // Draw pretty overlapping shapes
      ctx.fillStyle = "#818cf8"; // Indigo
      ctx.beginPath();
      ctx.arc(120, 120, 70, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#f43f5e"; // Rose
      ctx.beginPath();
      ctx.arc(180, 180, 75, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#10b981"; // Emerald
      ctx.beginPath();
      ctx.arc(180, 100, 45, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, 220, 220);
    } else if (type === "portrait") {
      // A nice smiley aesthetic portrait
      ctx.fillStyle = "#fbbf24"; // Warm face
      ctx.beginPath();
      ctx.arc(150, 140, 90, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(115, 120, 12, 0, Math.PI * 2);
      ctx.arc(185, 120, 12, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(150, 150, 50, 0, Math.PI, false);
      ctx.stroke();

      // Fun little star
      ctx.fillStyle = "#ec4899";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("✧", 60, 80);
      ctx.fillText("✧", 220, 220);
    } else {
      // Hypnotic spiral
      const cx = 150, cy = 150;
      ctx.strokeStyle = "#a78bfa"; // Violet petals
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i < 720; i++) {
        const angle = 0.1 * i;
        const r = 0.2 * i;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Core glow
      const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 60);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 65, 0, Math.PI * 2);
      ctx.fill();
    }

    setImageSrc(canvas.toDataURL());
    setImageName(`Procedural ${type.toUpperCase()}`);
    triggerToast(`Loaded procedural ${type} sample!`);
  };

  // Load abstract pattern on initial mount
  useEffect(() => {
    generateSamplePattern("abstract");
  }, []);

  // Primary Processing Effect
  useEffect(() => {
    if (!imageSrc) return;
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      try {
        const canvas = canvasRef.current || document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Calculate aspect ratios & dimensions
        // Monospace characters are taller than wide (usually ~0.5 - 0.6 factor)
        const dWidth = Math.max(10, Math.min(250, Math.round(width)));
        const dHeight = Math.max(10, Math.round(dWidth * (img.height / img.width) * aspectRatioFactor));
        
        canvas.width = dWidth;
        canvas.height = dHeight;
        
        // Draw image on canvas to compute downsampled pixels
        ctx.clearRect(0, 0, dWidth, dHeight);
        ctx.drawImage(img, 0, 0, dWidth, dHeight);
        
        // Grab values
        const imgData = ctx.getImageData(0, 0, dWidth, dHeight);
        const pixels = imgData.data;
        const rows: AsciiPixel[][] = [];

        // Dynamic contrast & brightness helper values
        const cFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));

        for (let y = 0; y < dHeight; y++) {
          const cols: AsciiPixel[] = [];
          for (let x = 0; x < dWidth; x++) {
            const idx = (y * dWidth + x) * 4;
            let r = pixels[idx];
            let g = pixels[idx+1];
            let b = pixels[idx+2];
            const a = pixels[idx+3];

            // Apply Contrast Adjustment
            r = Math.max(0, Math.min(255, cFactor * (r - 128) + 128));
            g = Math.max(0, Math.min(255, cFactor * (g - 128) + 128));
            b = Math.max(0, Math.min(255, cFactor * (b - 128) + 128));

            // Apply Brightness Adjustment
            r = Math.max(0, Math.min(255, r + brightness));
            g = Math.max(0, Math.min(255, g + brightness));
            b = Math.max(0, Math.min(255, b + brightness));

            // Standard luminance formulas
            let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

            // Normalize index to character array mapping
            if (invert) {
              luminance = 255 - luminance;
            }

            // Map luminance (0..255) to character range (0..len-1)
            const charIdx = Math.floor((luminance / 255) * (activeChars.length - 1));
            const char = activeChars[charIdx] || " ";

            cols.push({ char, r: Math.round(r), g: Math.round(g), b: Math.round(b), a });
          }
          rows.push(cols);
        }

        setAsciiArt(rows);
      } catch (err) {
        console.error("Failed to generate ascii art:", err);
      } finally {
        setIsProcessing(false);
      }
    };
  }, [imageSrc, width, aspectRatioFactor, contrast, brightness, activeChars, invert]);

  // Combine art matrix into a single raw text string
  const rawTextOutput = useMemo(() => {
    return asciiArt.map(row => row.map(pixel => pixel.char).join("")).join("\n");
  }, [asciiArt]);

  // Copy raw output
  const handleCopy = () => {
    if (!rawTextOutput) return;
    try {
      navigator.clipboard.writeText(rawTextOutput);
      setCopied(true);
      triggerToast("ASCII Art copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  // Download raw ASCII text file
  const handleDownloadTxt = () => {
    if (!rawTextOutput) return;
    try {
      const blob = new Blob([rawTextOutput], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${imageName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-ascii.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerToast("Txt art file saved!");
    } catch(err) {
      console.error(err);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    } else {
      triggerToast("Please drop a valid image file!");
    }
  };

  const processFile = (file: File) => {
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        setImageSrc(event.target.result as string);
        triggerToast("Custom Image loaded and processing!");
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    generateSamplePattern("abstract");
  };

  return (
    <div id="image-to-ascii-master-container" className="space-y-6">
      
      {/* EXPLANATORY HEADER BANNER */}
      <div className="bg-gradient-to-r from-violet-900 to-indigo-950 text-white rounded-2xl p-5 md:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black bg-rose-500 text-white px-2.5 py-0.5 rounded-full select-none">
              New Feature
            </span>
            <h2 className="text-base md:text-lg font-black tracking-tight font-sans">
              Image to ASCII Converter
            </h2>
          </div>
          <p className="text-xs text-indigo-200 font-medium">
            Transform any photo, diagram, or asset into vintage ASCII typography. Style with colors or copy raw text!
          </p>
        </div>

        <div className="flex gap-2">
          <button
            id="sample-btn-abstract"
            onClick={() => generateSamplePattern("abstract")}
            className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            ✧ Pastel Abstract
          </button>
          <button
            id="sample-btn-spiral"
            onClick={() => generateSamplePattern("spiral")}
            className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            ☯ Neon Spiral
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE TUNING AND UPLOAD PANEL */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* FILE UPLOAD AND DRAG ZONE */}
          <div 
            id="image-drag-drop-zone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`bg-white border-2 border-dashed p-6 rounded-2xl text-center transition duration-150 relative flex flex-col items-center justify-center min-h-[14rem] cursor-pointer ${
              isDragging 
                ? "border-violet-500 bg-violet-50/50" 
                : "border-gray-250 hover:border-violet-300"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) processFile(file);
              }}
              accept="image/*" 
              className="hidden" 
            />

            {imageSrc ? (
              <div className="space-y-3 w-full flex flex-col items-center justify-center">
                <div className="relative group overflow-hidden rounded-lg border border-gray-150 max-h-[8rem] flex items-center justify-center shadow-xs">
                  <img 
                    src={imageSrc} 
                    alt="Active target" 
                    referrerPolicy="no-referrer"
                    className="max-h-[8rem] object-contain transition duration-150 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-150 flex items-center justify-center">
                    <span className="text-[10px] text-white font-black bg-black/60 px-2.5 py-1 rounded-full uppercase">Change Image</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black text-gray-800 line-clamp-1 break-all px-4">
                    {imageName}
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    Target Output resolution: {width} x {Math.max(10, Math.round(width * (aspectRatioFactor || 0.5)))} characters
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 py-4 flex flex-col items-center">
                <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center shadow-2xs">
                  <FileImage className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-extrabold text-gray-800">
                    Drag & Drop Image Here
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Supports JPG, PNG, WEBP, or SVG files
                  </p>
                </div>
                <span className="text-xs text-violet-600 font-black underline bg-violet-50 px-3 py-1 rounded-full hover:bg-violet-100 transition select-none">
                  Browse file
                </span>
              </div>
            )}
            
            {imageSrc && (
              <button
                id="reset-uploaded-image-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
                className="absolute top-3 right-3 p-1.5 bg-gray-100 hover:bg-rose-100 text-gray-500 hover:text-rose-600 rounded-full transition cursor-pointer"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* DYNAMIC PROCESSING SLIDERS */}
          <div className="bg-white border border-gray-250 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
              <SlidersHorizontal className="w-4 h-4 text-violet-600" />
              <span>Processing Sliders:</span>
            </h3>

            {/* RESOLUTION (WIDTH) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-650 flex items-center gap-1">
                  Width (Columns):
                </label>
                <span className="text-xs font-mono font-black text-violet-600 pl-3">
                  {width} chars
                </span>
              </div>
              <input 
                type="range"
                min={20}
                max={180}
                step={2}
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
                className="w-full accent-violet-600 cursor-pointer"
              />
              <span className="text-[9px] text-gray-400 block leading-tight">
                Higher counts provide cleaner image precision, lower values preserve columns on mobile terminals.
              </span>
            </div>

            {/* CHARACTER ASPECT RATIO PRESET */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-650">
                  Aspect Stretching Ratio:
                </label>
                <span className="text-xs font-mono font-black text-violet-600 pl-3">
                  {aspectRatioFactor.toFixed(2)}
                </span>
              </div>
              <input 
                type="range"
                min={0.3}
                max={1.0}
                step={0.05}
                value={aspectRatioFactor}
                onChange={(e) => setAspectRatioFactor(parseFloat(e.target.value))}
                className="w-full accent-violet-600 cursor-pointer"
              />
              <span className="text-[9px] text-gray-400 block leading-tight">
                Compensates for the height of monospaced fonts (keeps circles round instead of oval).
              </span>
            </div>

            {/* BRIGHTNESS */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-650 flex items-center gap-1">
                  Brightness:
                </label>
                <span className={`text-xs font-mono font-black pl-3 ${brightness >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                  {brightness > 0 ? `+${brightness}` : brightness}
                </span>
              </div>
              <input 
                type="range"
                min={-100}
                max={100}
                step={5}
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full accent-violet-600 cursor-pointer"
              />
            </div>

            {/* CONTRAST */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-650">
                  Contrast Spark:
                </label>
                <span className="text-xs font-mono font-black text-violet-600 pl-3">
                  {contrast > 0 ? `+${contrast}` : contrast}%
                </span>
              </div>
              <input 
                type="range"
                min={-80}
                max={80}
                step={5}
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value))}
                className="w-full accent-violet-600 cursor-pointer"
              />
            </div>

            {/* COLOR STYLE SELECTORS */}
            <div className="space-y-1.5 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-gray-650 block select-none">
                  Invert Contrast:
                </span>
                <span className="text-[9px] text-gray-400 block leading-none">
                  Flip light/dark pixels
                </span>
              </div>
              <button
                id="toggle-invert-contrast"
                onClick={() => setInvert(!invert)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition duration-150 cursor-pointer border ${
                  invert 
                    ? "bg-violet-600 text-white border-violet-600" 
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                }`}
              >
                {invert ? "Inverted" : "Normal"}
              </button>
            </div>

          </div>

          {/* PALETTES SELECTOR */}
          <div className="bg-white border border-gray-250 p-4 rounded-2xl shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
              <Palette className="w-4 h-4 text-violet-600" />
              <span>Chroma Map Palette:</span>
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {CHARACTER_SETS.map(set => (
                <button
                  key={set.id}
                  id={`char-set-btn-${set.id}`}
                  onClick={() => setSelectedSet(set.id)}
                  className={`text-left p-2.5 border rounded-xl transition duration-150 flex flex-col justify-start cursor-pointer ${
                    selectedSet === set.id
                      ? "bg-violet-50/60 border-violet-400"
                      : "bg-white border-gray-150 hover:border-violet-200"
                  }`}
                >
                  <span className="text-xs font-black text-gray-800 leading-tight">{set.name}</span>
                  <span className="text-[10px] text-gray-400 font-mono mt-0.5 line-clamp-1">{set.characters}</span>
                </button>
              ))}

              <button
                id="char-set-btn-custom"
                onClick={() => setSelectedSet("custom")}
                className={`text-left p-2.5 border rounded-xl transition duration-150 flex flex-col justify-start cursor-pointer ${
                  selectedSet === "custom"
                    ? "bg-violet-50/60 border-violet-400"
                    : "bg-white border-gray-150 hover:border-violet-200"
                }`}
              >
                <span className="text-xs font-black text-gray-800 leading-tight">Custom Set</span>
                <span className="text-[10px] text-gray-400 font-mono mt-0.5 line-clamp-1">Type custom series</span>
              </button>
            </div>

            <AnimatePresence>
              {selectedSet === "custom" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5 pt-2"
                >
                  <input
                    type="text"
                    placeholder="Enter custom letters (e.g. #.- )..."
                    value={customChars}
                    onChange={(e) => setCustomChars(e.target.value)}
                    className="w-full text-xs font-mono bg-gray-50 border border-gray-250 p-2 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-500 rounded-lg text-center"
                  />
                  <span className="text-[9px] text-gray-400 block leading-tight text-center">
                    Order from darkest/densest element to lightest spacing element!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* RIGHT COLUMN: RAW TERMINAL RENDER & COLOR SPEC PREVIEW */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-gray-950 border border-gray-900 rounded-2xl shadow-xl flex flex-col overflow-hidden">
            
            {/* TERMINAL HEADER BAR */}
            <div className="bg-gray-900/95 py-3 px-4 border-b border-gray-850 flex items-center justify-between flex-wrap gap-2">
              
              {/* Dots and state */}
              <div className="flex items-center gap-1.5 select-none">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full inline-block"></span>
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full inline-block"></span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block"></span>
                <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wider pl-1.5 flex items-center gap-1.5">
                  <span>AESTHETIC CANVAS ART</span>
                  <span className="text-gray-700 select-none">•</span>
                  {isProcessing ? (
                    <span className="text-amber-400 animate-pulse flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Processing...
                    </span>
                  ) : (
                    <span className="text-emerald-400">READY</span>
                  )}
                </span>
              </div>

              {/* Toolbar Actions */}
              <div className="flex items-center gap-1.5">
                {/* ZOOM SLIDER CONTROL */}
                <div className="flex items-center gap-1.5 mr-2">
                  <span className="text-[9px] font-bold text-gray-500 uppercase font-mono">Zoom:</span>
                  <input 
                    type="range"
                    min={4}
                    max={20}
                    step={1}
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-16 accent-violet-500 cursor-pointer h-1 rounded"
                    title="Preview font size"
                  />
                  <span className="text-[9px] font-mono text-gray-400 w-6 text-right font-black">{fontSize}px</span>
                </div>

                <button
                  id="ascii-image-maximize-btn"
                  onClick={() => setFullscreen(true)}
                  className="p-1 px-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded transition text-[10px] font-bold flex items-center gap-1 cursor-pointer select-none"
                  title="Expand to Fullscreen View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">FULLSCREEN</span>
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="p-1 px-2 hover:bg-gray-800 text-violet-400 hover:text-violet-300 rounded transition text-[10px] font-bold flex items-center gap-1 cursor-pointer select-none"
                  title="Save art as plain .txt file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">SAVE TXT</span>
                </button>
              </div>

            </div>

            {/* CONFIGURE THE MODE: COLOR OR COPIABLE MONO */}
            <div className="bg-gray-900/50 p-2.5 border-b border-gray-850 flex items-center justify-between gap-3 text-xs">
              <span className="text-[10px] font-mono uppercase font-black text-gray-500 select-none">
                Renderer Format Switcher:
              </span>

              <div className="flex bg-gray-950 p-1 rounded-lg border border-gray-800">
                <button
                  id="format-btn-grayscale"
                  onClick={() => setGrayscaleMode(true)}
                  className={`px-3 py-1 text-[10px] font-extrabold rounded-md cursor-pointer transition flex items-center gap-1 ${
                    grayscaleMode 
                      ? "bg-violet-600 text-white shadow-xs" 
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Monochrome Code (Copiable)
                </button>
                <button
                  id="format-btn-chroma"
                  onClick={() => setGrayscaleMode(false)}
                  className={`px-3 py-1 text-[10px] font-extrabold rounded-md cursor-pointer transition flex items-center gap-1 ${
                    !grayscaleMode 
                      ? "bg-violet-600 text-white shadow-xs" 
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Rich Image Hue (Pixel Color)
                </button>
              </div>
            </div>

            {/* THE CANVAS ART SCREEN */}
            <div className="p-5 md:p-6 bg-gray-950 flex flex-col justify-center min-h-[22rem]">
              <div 
                id="ascii-pixel-renderer-terminal-frame"
                className="bg-black/95 border border-gray-900 rounded-xl overflow-auto select-all max-h-[32rem] min-h-[14rem] relative shadow-inner p-6 scrollbar-thin flex flex-col items-center justify-start"
              >
                {grayscaleMode ? (
                  // Copiable Monochrome pre format
                  <pre 
                    className="font-mono leading-none tracking-normal whitespace-pre font-extrabold text-emerald-400 select-all"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {rawTextOutput || "\n\n   ( FILE OUTPUT WILL BE DISPLAYED HERE )\n\n"}
                  </pre>
                ) : (
                  // Custom styled Span-by-Span colorful matrix
                  <div 
                    className="font-mono leading-none tracking-normal font-bold select-all flex flex-col"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {asciiArt.map((row, rIdx) => (
                      <div key={rIdx} className="flex whitespace-nowrap leading-none">
                        {row.map((pixel, pIdx) => (
                          <span 
                            key={pIdx} 
                            style={{ color: `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})` }}
                            className="leading-none select-all"
                          >
                            {pixel.char}
                          </span>
                        ))}
                      </div>
                    ))}
                    {asciiArt.length === 0 && (
                      <span className="text-gray-600 text-xs text-center py-10 font-bold block">No content rendered. Load an image file.</span>
                    )}
                  </div>
                )}
              </div>

              {/* Statistics elements of canvas */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-gray-400 select-none uppercase font-bold">
                <div className="flex gap-4">
                  <span>Lines: {asciiArt.length}</span>
                  <span>Width: {width} columns</span>
                  <span>Set: {selectedSet}</span>
                </div>
                <span>Render system fully locally loaded</span>
              </div>
            </div>

            {/* ACTION FOOTER BAR */}
            <div className="bg-gray-900/45 p-4 border-t border-gray-850 flex items-center justify-between gap-3 flex-wrap">
              <span className="text-[10px] text-gray-500 italic">
                {grayscaleMode 
                  ? "Grayscale mode is optimized for copy-pasting into text apps!"
                  : "Chroma color mode renders vibrant CSS spectrum inside the web browser!"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  id="ascii-canvas-copy-btn"
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                    copied
                      ? "bg-emerald-500 text-white"
                      : "bg-white hover:bg-gray-100 text-gray-950"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied Art!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Raw Monospace
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* HIDDEN WORKING CANVAS FOR PIXEL SAMPLING */}
          <canvas ref={canvasRef} className="hidden" />

        </div>

      </div>

      {/* FULLSCREEN RENDER PREVIEW MODAL */}
      <AnimatePresence>
        {fullscreen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="ascii-image-fullscreen-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFullscreen(false)}
              className="fixed inset-0 bg-gray-950/80 backdrop-blur-md transition-opacity"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl transform overflow-hidden rounded-2xl bg-gray-950 border border-gray-850 p-6 md:p-8 shadow-2xl text-left transition-all space-y-6 z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-900 pb-4 shrink-0">
                <div>
                  <span className="text-[10px] uppercase font-black bg-rose-500 text-white px-2.5 py-0.5 rounded-full select-none">
                    Chroma Terminal Expand
                  </span>
                  <h3 className="text-base md:text-lg font-black text-white mt-1">
                    {imageName} ASCII Masterpiece
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="text-[9px] font-bold text-gray-500 uppercase font-mono">Size:</span>
                    <input 
                      type="range"
                      min={4}
                      max={20}
                      step={1}
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-20 accent-violet-500 cursor-pointer h-1 rounded"
                    />
                    <span className="text-[9px] font-mono text-gray-400 w-6 text-right">{fontSize}px</span>
                  </div>

                  <button
                    id="close-image-fullscreen-modal"
                    onClick={() => setFullscreen(false)}
                    className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-900 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Large pre display scroll container */}
              <div className="bg-black border border-emerald-950/40 p-6 rounded-xl overflow-auto select-all flex-1 min-h-[20rem] scrollbar-thin flex flex-col items-center">
                {grayscaleMode ? (
                  <pre 
                    className="font-mono leading-none tracking-normal whitespace-pre font-bold text-emerald-400 select-all"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {rawTextOutput}
                  </pre>
                ) : (
                  <div 
                    className="font-mono leading-none tracking-normal font-bold select-all flex flex-col"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {asciiArt.map((row, rIdx) => (
                      <div key={rIdx} className="flex whitespace-nowrap leading-none">
                        {row.map((pixel, pIdx) => (
                          <span 
                            key={pIdx} 
                            style={{ color: `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})` }}
                            className="leading-none select-all"
                          >
                            {pixel.char}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions row footer */}
              <div className="flex justify-between items-center flex-wrap gap-4 pt-4 border-t border-gray-900 shrink-0">
                <p className="text-[10px] text-gray-500 font-mono">
                  Width: {width} chars • Format: {grayscaleMode ? "Plain Monospace" : "Vibrant Chroma HTML"}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadTxt}
                    className="bg-gray-900 hover:bg-gray-850 border border-gray-800 text-gray-300 font-extrabold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download TXT</span>
                  </button>
                  <button
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
                        Copy Raw Monospace
                      </>
                    )}
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NEW DETAILED ACCORDION FAQ SECTION */}
      <div className="mt-8 bg-gradient-to-br from-white to-violet-50/20 border border-violet-100 rounded-2xl p-5 md:p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3.5 border-b border-violet-100">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
            <HelpCircle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest font-mono">
              Image to ASCII FAQ Guide
            </h3>
            <p className="text-[10px] text-gray-400 font-bold mt-0.5">
              Learn how pixel density, aspect stretching ratios, and local browser-based generation power your retro outputs.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "How does the Image to ASCII converter work under the hood?",
              a: "It uses local HTML5 canvas processing. When you upload an image, it is downscaled, and we measure the luminescence or brightness of each downscaled pixel. These values are then mapped to specific characters ranging from high density (e.g., '#' or '@') to low density (dots or spaces), creating a detailed textile representation."
            },
            {
              q: "What is the difference between monochrome code and rich image hue?",
              a: "Monochrome Code (Copiable) creates a pure plain-text ASCII layout that you can copy to any chat or text document. Rich Image Hue applies the original pixel colors as CSS inline styles on top of the character grid. Note that colorful output can only be viewed in web browsers and does not copy over as colored text in plain-text editors."
            },
            {
              q: "What does the 'Aspect Stretching Ratio' slider do?",
              a: "Standard text fonts are rectangular (monospaced characters are typically twice as tall as they are wide). To prevent your ASCII render from looking vertically stretched (like squished tall ovals), the Aspect stretching ratio downscales the height dynamically. Adjust this slider to get perfectly proportioned circles and shapes."
            },
            {
              q: "How can I get the highest quality and sharpest ASCII designs?",
              a: "Maximize the Width slider to increase resolution (columns), and boost the 'Contrast Spark' to make edges pop. High contrast renders with sharp separation between light and dark fields. You can also experiment with different Character sets (like 'High Precision' or 'Brutalist Blocks') to see which fits your image's texture best."
            },
            {
              q: "Does my uploaded image get saved on any server?",
              a: "No, absolutely not! This converter runs entirely inside your browser (sandbox memory environment) using client-side JavaScript. No file or image is ever uploaded to a backend or saved anywhere, which makes it 100% private and offline-friendly."
            }
          ].map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-xl transition duration-150 overflow-hidden ${
                  isOpen ? "bg-white border-violet-300 shadow-3xs" : "bg-white/80 border-gray-150 hover:bg-white hover:border-violet-200"
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left py-3.5 px-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <span className="text-xs font-extrabold text-gray-800 flex items-center gap-2">
                    <span className="text-violet-500 font-mono">0{idx + 1}.</span>
                    <span>{item.q}</span>
                  </span>
                  <span className="text-gray-400">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-violet-500" />
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
