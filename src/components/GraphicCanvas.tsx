import React, { useState, useEffect, useRef } from "react";
import { Download, Sliders, Type, Grid, HelpCircle, Palette, Sparkles, ChevronDown, ChevronUp, Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import { DESIGNER_FONTS } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface GraphicCanvasProps {
  inputText: string;
}

// Preset designs for fast 1-click aesthetic creations
const CANVAS_PRESETS = [
  {
    name: "Sunset Dream",
    fontFamily: "Pacifico",
    textColor: "#ffffff",
    backgroundType: "gradient-linear",
    bgColorStart: "#ff7b54",
    bgColorEnd: "#ffb26b",
    gradientAngle: 135,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowBlur: 12,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    letterSpacing: 0,
    decorBorder: true,
  },
  {
    name: "Cyber Punk",
    fontFamily: "Space Grotesk",
    textColor: "#00ffff",
    backgroundType: "solid",
    bgColorStart: "#0a0b10",
    bgColorEnd: "#000000",
    gradientAngle: 0,
    shadowColor: "#ff007f",
    shadowBlur: 20,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    letterSpacing: 4,
    decorBorder: false,
  },
  {
    name: "Minimalist Editorial",
    fontFamily: "Playfair Display",
    textColor: "#1e293b",
    backgroundType: "solid",
    bgColorStart: "#f8fafc",
    bgColorEnd: "#e2e8f0",
    gradientAngle: 45,
    shadowColor: "rgba(30, 41, 59, 0.08)",
    shadowBlur: 8,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    letterSpacing: -1,
    decorBorder: true,
  },
  {
    name: "Retro Stamp",
    fontFamily: "Bebas Neue",
    textColor: "#f43f5e",
    backgroundType: "gradient-linear",
    bgColorStart: "#fef2f2",
    bgColorEnd: "#fee2e2",
    gradientAngle: 90,
    shadowColor: "rgba(244, 63, 94, 0.2)",
    shadowBlur: 0,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    letterSpacing: 2,
    decorBorder: true,
  },
  {
    name: "Organic Sage",
    fontFamily: "Great Vibes",
    textColor: "#ffffff",
    backgroundType: "gradient-linear",
    bgColorStart: "#84a98c",
    bgColorEnd: "#354f52",
    gradientAngle: 180,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowBlur: 10,
    shadowOffsetX: 3,
    shadowOffsetY: 3,
    letterSpacing: 1,
    decorBorder: false,
  }
];

export default function GraphicCanvas({ inputText }: GraphicCanvasProps) {
  // Config state
  const [fontFamily, setFontFamily] = useState<string>("Space Grotesk");
  const [fontSize, setFontSize] = useState<number>(44);
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [backgroundType, setBackgroundType] = useState<"solid" | "gradient-linear" | "gradient-radial" | "image">("gradient-linear");
  const [bgColorStart, setBgColorStart] = useState<string>("#ec4899");
  const [bgColorEnd, setBgColorEnd] = useState<string>("#8b5cf6");
  const [gradientAngle, setGradientAngle] = useState<number>(135);
  const [letterSpacing, setLetterSpacing] = useState<number>(1);
  const [lineHeightMultiplier, setLineHeightMultiplier] = useState<number>(1.2);
  const [align, setAlign] = useState<"left" | "center" | "right">("center");
  
  // Background Image states
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [bgImageFit, setBgImageFit] = useState<"cover" | "contain" | "stretch">("cover");
  const [bgImageBlur, setBgImageBlur] = useState<number>(0);
  const [bgImageOverlayOpacity, setBgImageOverlayOpacity] = useState<number>(0.3);
  const [bgImageOverlayColor, setBgImageOverlayColor] = useState<"black" | "white">("black");
  const [bgFileName, setBgFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // File Upload Handlers
  const handleImageUpload = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setBgFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setBgImage(img);
        setBackgroundType("image");
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleClearBgImage = () => {
    setBgImage(null);
    setBgFileName("");
    setBackgroundType("gradient-linear");
  };

  // Shadows
  const [shadowColor, setShadowColor] = useState<string>("rgba(0, 0, 0, 0.4)");
  const [shadowBlur, setShadowBlur] = useState<number>(12);
  const [shadowOffsetX, setShadowOffsetX] = useState<number>(4);
  const [shadowOffsetY, setShadowOffsetY] = useState<number>(4);
  
  // Aspect Ratios and Extras
  const [aspectRatio, setAspectRatio] = useState<"square" | "story" | "banner">("square");
  const [decorBorder, setDecorBorder] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load Google Fonts programmatically
  useEffect(() => {
    const linkId = "dyn-google-fonts";
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    const q = DESIGNER_FONTS.map(f => `family=${f.family.replace(/ /g, "+")}:wght@400;700;900`).join("&");
    link.href = `https://fonts.googleapis.com/css2?${q}&display=swap`;
  }, []);

  // Compute aspect ratio size
  const canvasSize = {
    square: { w: 1000, h: 1000 },
    story: { w: 1000, h: 1777 },
    banner: { w: 1200, h: 675 }
  };

  const { w, h } = canvasSize[aspectRatio];

  // Draw logic on Canvas whenever styles modify
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // 1. Draw Background
    if (backgroundType === "solid") {
      ctx.fillStyle = bgColorStart;
      ctx.fillRect(0, 0, w, h);
    } else if (backgroundType === "gradient-linear") {
      // Calculate angle coordinates
      const angleRad = (gradientAngle * Math.PI) / 180;
      const x1 = w / 2 - Math.cos(angleRad) * w / 2;
      const y1 = h / 2 - Math.sin(angleRad) * h / 2;
      const x2 = w / 2 + Math.cos(angleRad) * w / 2;
      const y2 = h / 2 + Math.sin(angleRad) * h / 2;

      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, bgColorStart);
      grad.addColorStop(1, bgColorEnd);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (backgroundType === "gradient-radial") {
      // Radial Gradient
      const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h) / 1.5);
      grad.addColorStop(0, bgColorStart);
      grad.addColorStop(1, bgColorEnd);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (backgroundType === "image") {
      if (bgImage) {
        ctx.save();
        
        // Apply blur filter on canvas if supported by context
        if (bgImageBlur > 0) {
          ctx.filter = `blur(${bgImageBlur}px)`;
        }

        if (bgImageFit === "stretch") {
          ctx.drawImage(bgImage, 0, 0, w, h);
        } else if (bgImageFit === "contain") {
          const imgRatio = bgImage.width / bgImage.height;
          const canvasRatio = w / h;
          let drawW = w;
          let drawH = h;
          let drawX = 0;
          let drawY = 0;
          if (imgRatio > canvasRatio) {
            drawH = w / imgRatio;
            drawY = (h - drawH) / 2;
          } else {
            drawW = h * imgRatio;
            drawX = (w - drawW) / 2;
          }
          ctx.fillStyle = bgColorStart || "#0d111d";
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(bgImage, drawX, drawY, drawW, drawH);
        } else { // cover fit
          const imgRatio = bgImage.width / bgImage.height;
          const canvasRatio = w / h;
          let drawW = w;
          let drawH = h;
          let drawX = 0;
          let drawY = 0;
          if (imgRatio > canvasRatio) {
            drawW = h * imgRatio;
            drawX = (w - drawW) / 2;
          } else {
            drawH = w / imgRatio;
            drawY = (h - drawH) / 2;
          }
          ctx.drawImage(bgImage, drawX, drawY, drawW, drawH);
        }
        
        ctx.restore();

        // 1b. Draw legibility overlay to avoid text merging into busy image backgrounds
        if (bgImageOverlayOpacity > 0) {
          ctx.fillStyle = bgImageOverlayColor === "black"
            ? `rgba(0, 0, 0, ${bgImageOverlayOpacity})`
            : `rgba(255, 255, 255, ${bgImageOverlayOpacity})`;
          ctx.fillRect(0, 0, w, h);
        }
      } else {
        // Fallback guidelines grid
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(0, 0, w, h);
        
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        const gridStep = 40;
        for (let x = 0; x < w; x += gridStep) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += gridStep) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText("[ IMAGE BACKGROUND SELECTED ]", w / 2, h / 2 - 30);
        ctx.font = "14px sans-serif";
        ctx.fillText("Please upload an image under the 'Background Customizer' side panel.", w / 2, h / 2 + 10);
      }
    }

    // 2. Draw Decorative Border Frame
    if (decorBorder) {
      ctx.strokeStyle = textColor;
      ctx.lineWidth = 4;
      ctx.opacity = 0.5;
      ctx.strokeRect(40, 40, w - 80, h - 80);
      
      // Fine outer trim
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;
      ctx.strokeRect(30, 30, w - 60, h - 60);

      // Cute corner decors
      ctx.fillStyle = textColor;
      ctx.fillRect(35, 35, 10, 10);
      ctx.fillRect(w - 45, 35, 10, 10);
      ctx.fillRect(35, h - 45, 10, 10);
      ctx.fillRect(w - 45, h - 45, 10, 10);
    }

    // 3. Draw Text
    // Configure shadows
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;

    // Text specifications (Font Size & TypeFamily)
    ctx.fillStyle = textColor;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.font = `bold ${fontSize * 1.5}px "${fontFamily}", sans-serif`;

    const txt = inputText || "DESIGN YOUR\nARTWORK LIVE";
    const lines = txt.split("\n");
    const itemHeight = fontSize * 1.5 * lineHeightMultiplier;
    const totalBlockHeight = itemHeight * (lines.length - 1);
    const startY = h / 2 - totalBlockHeight / 2;

    lines.forEach((line, index) => {
      let x = w / 2;
      if (align === "left") x = decorBorder ? 90 : 60;
      if (align === "right") x = decorBorder ? w - 90 : w - 60;

      const y = startY + index * itemHeight;

      // Handle custom Letter Spacing
      if (letterSpacing > 0) {
        let currentX = x;
        const totalLineWidth = line.split("").reduce((acc, char) => acc + ctx.measureText(char).width + letterSpacing, 0) - letterSpacing;
        
        if (align === "center") {
          currentX = w / 2 - totalLineWidth / 2;
        } else if (align === "right") {
          currentX = (decorBorder ? w - 90 : w - 60) - totalLineWidth;
        }

        ctx.textAlign = "left";
        line.split("").forEach((char) => {
          ctx.fillText(char, currentX, y);
          currentX += ctx.measureText(char).width + letterSpacing;
        });
      } else {
        ctx.textAlign = align;
        ctx.fillText(line, x, y);
      }
    });
  };

  // Redraw when properties edit
  useEffect(() => {
    // Redraw with small timeout to allow browser font hydration
    const timer = setTimeout(() => {
      drawCanvas();
    }, 150);
    return () => clearTimeout(timer);
  }, [
    inputText,
    fontFamily,
    fontSize,
    textColor,
    backgroundType,
    bgColorStart,
    bgColorEnd,
    gradientAngle,
    letterSpacing,
    lineHeightMultiplier,
    align,
    shadowColor,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
    aspectRatio,
    decorBorder,
    bgImage,
    bgImageFit,
    bgImageBlur,
    bgImageOverlayOpacity,
    bgImageOverlayColor
  ]);

  // Handle Preset Clicks
  const applyPreset = (preset: typeof CANVAS_PRESETS[0]) => {
    setFontFamily(preset.fontFamily);
    setTextColor(preset.textColor);
    setBackgroundType(preset.backgroundType as any);
    setBgColorStart(preset.bgColorStart);
    setBgColorEnd(preset.bgColorEnd);
    setGradientAngle(preset.gradientAngle);
    setShadowColor(preset.shadowColor);
    setShadowBlur(preset.shadowBlur);
    setShadowOffsetX(preset.shadowOffsetX);
    setShadowOffsetY(preset.shadowOffsetY);
    setLetterSpacing(preset.letterSpacing);
    setDecorBorder(preset.decorBorder);
  };

  // Export Canvas image (either PNG or JPG format)
  const handleDownload = (format: "png" | "jpg" = "png") => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        const canvas = canvasRef.current;
        if (canvas) {
          const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
          const ext = format === "jpg" ? "jpg" : "png";
          const url = canvas.toDataURL(mimeType, format === "jpg" ? 0.95 : undefined);
          
          const a = document.createElement("a");
          a.download = `font-style-${aspectRatio}-${Date.now()}.${ext}`;
          a.href = url;
          a.click();
        }
      } catch (e) {
        console.error("Download failed:", e);
      } finally {
        setIsDownloading(false);
      }
    }, 600);
  };

  return (
    <div className="space-y-8">
      <div id="graphic-canvas-panel-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* 1. LEFT PREVIEW STAGE */}
      <div className="lg:col-span-7 space-y-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[480px]">
          {/* Sizing Tags */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white/80 border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Preview Canvas ({w}x{h})</span>
          </div>

          <div className="absolute top-4 right-4 z-10 flex gap-1.5 text-white/50 text-[10px] select-none">
            {isDownloading && <span className="text-indigo-400 animate-pulse font-bold font-sans">Compiling Export File...</span>}
          </div>

          {/* Actual Visual Canvas Scale Container */}
          <div className="w-full max-w-full flex justify-center items-center overflow-hidden py-4">
            <canvas
              id="artwork-canvas-element"
              ref={canvasRef}
              width={w}
              height={h}
              style={{
                maxWidth: "100%",
                maxHeight: "380px",
                objectFit: "contain",
                aspectRatio: `${w}/${h}`,
                borderRadius: "16px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
              }}
              className="bg-black/20 border border-white/5"
            />
          </div>

          {/* Export buttons */}
          <div className="w-full border-t border-slate-800 pt-4 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
            <button
              id="export-png-trigger"
              onClick={() => handleDownload("png")}
              disabled={isDownloading}
              className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600 text-white font-bold rounded-xl text-xs hover:scale-102 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-98 transition duration-150 cursor-pointer select-none"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? "Exporting PNG..." : "Download High-Res PNG"}</span>
            </button>
            <button
              id="export-jpg-trigger"
              onClick={() => handleDownload("jpg")}
              disabled={isDownloading}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600 text-white font-bold rounded-xl text-xs hover:scale-102 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-98 transition duration-150 cursor-pointer select-none"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? "Exporting JPG..." : "Download High-Res JPG"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Preset Cards Panel */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4">
          <div className="text-xs text-slate-400 font-bold mb-2.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-slate-500" />
            <span>CHOOSE THEMED DESIGN PRESETS:</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {CANVAS_PRESETS.map((preset, idx) => (
              <button
                id={`preset-selector-btn-${idx}`}
                key={idx}
                type="button"
                onClick={() => applyPreset(preset)}
                className="overflow-hidden relative flex flex-col justify-between items-start text-left p-3 border border-slate-150 hover:border-indigo-450 rounded-xl hover:shadow-xs transition bg-slate-50 cursor-pointer"
              >
                <div
                  style={{ background: preset.bgColorEnd }}
                  className="w-full h-8 rounded-md mb-2 bg-gradient-to-r"
                />
                <span className="text-[10px] font-bold text-slate-700 truncate w-full">
                  {preset.name}
                </span>
                <span className="text-[9px] text-slate-400">
                  {preset.fontFamily}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDEBAR CONTROLS */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          {/* SECTION: TYPOGRAPHY SETUP */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Type className="w-4.5 h-4.5 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Typography Controls
              </h3>
            </div>

            {/* Font selector */}
            <div className="space-y-1.5">
              <label htmlFor="designer-font-select" className="text-[10px] font-bold text-slate-500 uppercase">
                Select Font Style
              </label>
              <select
                id="designer-font-select"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full bg-slate-50 font-semibold text-xs border border-slate-200 text-slate-700 p-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              >
                {DESIGNER_FONTS.map((f, idx) => (
                  <option key={idx} value={f.family}>
                    {f.name} ({f.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Font sliders */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="designer-f-size" className="text-[10px] font-bold text-slate-500 uppercase flex justify-between">
                  <span>Font Size</span>
                  <span className="text-slate-700 font-mono">{fontSize}px</span>
                </label>
                <input
                  id="designer-f-size"
                  type="range"
                  min="16"
                  max="110"
                  step="1"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1.5 font-sans">
                <label htmlFor="designer-l-spacing" className="text-[10px] font-bold text-slate-500 uppercase flex justify-between">
                  <span>Letter Space</span>
                  <span className="text-slate-700 font-mono">{letterSpacing}px</span>
                </label>
                <input
                  id="designer-l-spacing"
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Text color picker */}
              <div className="space-y-1.5">
                <label htmlFor="designer-text-color" className="text-[10px] font-bold text-slate-500 uppercase">
                  Text Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="designer-text-color"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 overflow-hidden shrink-0"
                  />
                  <input
                    id="designer-text-color-hex"
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono px-2 py-1 rounded-lg"
                  />
                </div>
              </div>

              {/* Text Alignments */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase">
                  Text Alignment
                </label>
                <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                  {(["left", "center", "right"] as const).map((pos) => (
                    <button
                      id={`align-opt-${pos}`}
                      key={pos}
                      type="button"
                      onClick={() => setAlign(pos)}
                      className={`flex-1 text-[10px] font-bold py-1 px-2 rounded-lg capitalize transition cursor-pointer ${
                        align === pos ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: BACKGROUND GRAPHICS SETUP */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Palette className="w-4.5 h-4.5 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Background Customizer
              </h3>
            </div>

            {/* Type presets */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">
                Style Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["solid", "gradient-linear", "gradient-radial", "image"] as const).map((type) => (
                  <button
                    id={`bgstyle-btn-${type}`}
                    key={type}
                    type="button"
                    onClick={() => setBackgroundType(type)}
                    className={`text-[10px] font-bold py-2 px-1 rounded-xl border transition cursor-pointer text-center whitespace-nowrap truncate ${
                      backgroundType === type
                        ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                        : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {type === "solid" ? "Solid" : type === "gradient-linear" ? "Linear" : type === "gradient-radial" ? "Radial" : "Image 🖼️"}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Customizer Panel */}
            {backgroundType === "image" && (
              <div className="space-y-4 pt-1 animate-fadeIn">
                {/* Drag and Drop Zone / File selector */}
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center transition flex flex-col items-center justify-center gap-2 cursor-pointer ${
                    isDragging 
                      ? "border-indigo-500 bg-indigo-50/50" 
                      : "border-slate-250 bg-slate-50 hover:bg-slate-100/70"
                  }`}
                  onClick={() => document.getElementById("canvas-background-file-input")?.click()}
                >
                  <input
                    id="canvas-background-file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Upload className="w-4.5 h-4.5 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-slate-700 block max-w-[200px] truncate mx-auto">
                      {bgFileName ? bgFileName : "Drag Background Image here"}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">
                      {bgFileName ? "Click to upload a different image" : "or Click to browse computer"}
                    </span>
                  </div>
                </div>

                {bgImage && (
                  <div className="space-y-3 bg-slate-50 border border-slate-150 p-3 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="text-[10px] font-bold text-slate-700">Image Config</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleClearBgImage}
                        className="text-[9px] font-bold text-rose-500 hover:text-rose-700 px-2 py-0.5 bg-rose-50 hover:bg-rose-100 rounded-md transition duration-150 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>

                    {/* Fit mode selector */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">Fit Alignment</span>
                      <div className="flex bg-slate-200/65 p-0.5 rounded-lg gap-0.5">
                        {(["cover", "contain", "stretch"] as const).map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setBgImageFit(mode)}
                            className={`flex-1 text-[9px] font-bold py-1 rounded capitalize transition cursor-pointer ${
                              bgImageFit === mode ? "bg-white text-slate-800 shadow-2xs" : "text-slate-500 hover:text-slate-700"
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Blur level */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                        <span>Background Blur</span>
                        <span className="text-slate-700 font-mono">{bgImageBlur}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="25"
                        step="1"
                        value={bgImageBlur}
                        onChange={(e) => setBgImageBlur(Number(e.target.value))}
                        className="w-full accent-indigo-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Overlay level */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                        <span>Luminosity Dimmer</span>
                        <span className="text-slate-700 font-mono">{Math.round(bgImageOverlayOpacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="0.9"
                        step="0.05"
                        value={bgImageOverlayOpacity}
                        onChange={(e) => setBgImageOverlayOpacity(Number(e.target.value))}
                        className="w-full accent-indigo-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Overlay contrast background */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">Overlay Theme</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {(["black", "white"] as const).map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setBgImageOverlayColor(color)}
                            className={`py-1 text-center rounded text-[9px] font-bold border transition capitalize cursor-pointer ${
                              bgImageOverlayColor === color
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {color === "black" ? "Dark Theme" : "Light Theme"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {backgroundType !== "image" && (
              <>
                {/* Gradient details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="bg-primary-picker" className="text-[10px] font-bold text-slate-500 uppercase">
                      {backgroundType === "solid" ? "Solid Color" : "Stop Color A"}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="bg-primary-picker"
                        type="color"
                        value={bgColorStart}
                        onChange={(e) => setBgColorStart(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 overflow-hidden shrink-0"
                      />
                      <input
                        id="bg-primary-text-hex"
                        type="text"
                        value={bgColorStart}
                        onChange={(e) => setBgColorStart(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono px-2 py-1 rounded-lg"
                      />
                    </div>
                  </div>

                  {backgroundType !== "solid" && (
                    <div className="space-y-1.5 animate-fadeIn">
                      <label htmlFor="bg-secondary-picker" className="text-[10px] font-bold text-slate-500 uppercase">
                        Stop Color B
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          id="bg-secondary-picker"
                          type="color"
                          value={bgColorEnd}
                          onChange={(e) => setBgColorEnd(e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 overflow-hidden shrink-0"
                        />
                        <input
                          id="bg-secondary-text-hex"
                          type="text"
                          value={bgColorEnd}
                          onChange={(e) => setBgColorEnd(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono px-2 py-1 rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Gradient Angle Slider */}
                {backgroundType === "gradient-linear" && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <label htmlFor="grad-orient-angle" className="text-[10px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>Linear Direction Angle</span>
                      <span className="text-slate-700 font-mono">{gradientAngle}°</span>
                    </label>
                    <input
                      id="grad-orient-angle"
                      type="range"
                      min="0"
                      max="360"
                      step="5"
                      value={gradientAngle}
                      onChange={(e) => setGradientAngle(Number(e.target.value))}
                      className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* SECTION: DROP SHADOW CONTROLS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sliders className="w-4.5 h-4.5 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Typography Drop Shadows
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="shadow-size-blur" className="text-[10px] font-bold text-slate-500 uppercase flex justify-between">
                  <span>Blur Radius</span>
                  <span className="text-slate-700 font-mono">{shadowBlur}px</span>
                </label>
                <input
                  id="shadow-size-blur"
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={shadowBlur}
                  onChange={(e) => setShadowBlur(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="shadow-offset-xy" className="text-[10px] font-bold text-slate-500 uppercase flex justify-between">
                  <span>Offset (X & Y)</span>
                  <span className="text-slate-700 font-mono">{shadowOffsetX}px</span>
                </label>
                <input
                  id="shadow-offset-xy"
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  value={shadowOffsetX}
                  onChange={(e) => {
                     setShadowOffsetX(Number(e.target.value));
                     setShadowOffsetY(Number(e.target.value));
                  }}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="designer-sh-color" className="text-[10px] font-bold text-slate-500 uppercase">
                  Shadow Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="designer-sh-color"
                    type="color"
                    value={shadowColor.startsWith("rgba") ? "#000000" : shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 overflow-hidden shrink-0"
                  />
                  <input
                    id="designer-sh-color-hex"
                    type="text"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono px-2 py-1 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1.5 font-sans">
                <label className="text-[10px] font-bold text-slate-500 uppercase">
                  Decoration Framing
                </label>
                <button
                  id="toggle-decor-borders"
                  type="button"
                  onClick={() => setDecorBorder(!decorBorder)}
                  className={`w-full py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    decorBorder
                      ? "bg-indigo-50 text-indigo-600 border-indigo-200 font-bold"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {decorBorder ? "✨ Frame Active" : "No Decorative Border"}
                </button>
              </div>
            </div>
          </div>

          {/* CANVAS SIZE SELECTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Grid className="w-4.5 h-4.5 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Artwork Sizing Details
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "square", name: "1:1 Square", notes: "Instagram Box" },
                { id: "story", name: "9:16 Story", notes: "TikTok / Reel" },
                { id: "banner", name: "16:9 Banner", notes: "Blog / Cover" }
              ] as const).map((style) => (
                <button
                  id={`sizing-option-${style.id}`}
                  key={style.id}
                  type="button"
                  onClick={() => setAspectRatio(style.id)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between h-20 cursor-pointer ${
                    aspectRatio === style.id
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider block">
                    {style.name}
                  </span>
                  <span className={`text-[9px] block ${aspectRatio === style.id ? "text-white/80" : "text-slate-400"}`}>
                    {style.notes}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* DETAILED ACCORDION FAQ SECTION */}
      <div id="graphic-canvas-faq-block" className="mt-8 bg-gradient-to-br from-white to-slate-50/20 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3.5 border-b border-indigo-100">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <HelpCircle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono">
              Artwork Designer & Graphic Canvas FAQ
            </h3>
            <p className="text-[10px] text-gray-400 font-bold mt-0.5">
              Learn how high-resolution PNG exports, aspect ratio alignment, and real-time font rendering systems work together.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Can I use downloaded graphic cards across commercial social media profiles?",
              a: "Yes, absolutely! The downloaded cards are exported as standard, portable high-resolution PNG images. You are free to use them on your Instagram, TikTok, Facebook, or Twitch bios, posts, print materials, or branding banners without any watermarks or royalties."
            },
            {
              q: "Why are Google Fonts loaded in real-time? Can I use my own system fonts?",
              a: "To ensure a standard rendering pipeline across all screens, we load premium web fonts directly from Google Fonts. This guarantees your design will be rendered perfectly on our high-resolution canvas regardless of which local font packages are installed on your device."
            },
            {
              q: "What is the difference between Square, Story, and Banner canvas presets?",
              a: "These choices cater directly to standard media layouts. The Square (1:1) layout is ideal for Instagram posts, the Story (9:16) layout fits TikTok and Instagram Stories, and the Banner (16:9) matches YouTube covers, Twitter headers, or blog preview cards."
            },
            {
              q: "How are custom double-stop color gradients applied?",
              a: "We use high-fidelity HTML5 Canvas gradient brushes! When you choose Linear Gradient, we compute the angle of propagation across the canvas vector, and interpolate linearly from Stop Color A to Stop Color B. Radial Gradient emits outwards in concentric circles from the center."
            },
            {
              q: "Does the canvas exporter collect or compress my layout configurations?",
              a: "We collect zero configuration data. The entire rendering, scaling, shadow drawing, and output generation is done completely locally inside your browser's virtual machine. Your designs remain 100% private and execute with zero latency."
            }
          ].map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-xl transition duration-150 overflow-hidden ${
                  isOpen ? "bg-white border-indigo-300 shadow-3xs" : "bg-white/80 border-gray-150 hover:bg-white hover:border-indigo-100"
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
    </div>
  );
}
