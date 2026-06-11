/**
 * Unicode Alphanumeric Maps for Font Generation
 */

interface UnicodeStyle {
  id: string;
  name: string;
  category: "all" | "bold" | "cursive" | "gothic" | "aesthetic" | "symbol" | "decorated";
  description: string;
  uppercase: string[];
  lowercase: string[];
  digits?: string[];
  // If we require post-processing (e.g., adding combining characters)
  transform?: (text: string) => string;
}

const UPPERCASE_PLAIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const LOWERCASE_PLAIN = "abcdefghijklmnopqrstuvwxyz".split("");
const DIGITS_PLAIN = "0123456789".split("");

// Helper to split surrogate pairs to keep emojis and special glyphs correct
const splitChars = (str: string): string[] => {
  return Array.from(str);
};

export const UNICODE_STYLES: UnicodeStyle[] = [
  {
    id: "bold-serif",
    name: "Mathematical Bold Serif",
    category: "bold",
    description: "Strong, professional, and dense serif lettering",
    uppercase: splitChars("𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙"),
    lowercase: splitChars("𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳"),
    digits: splitChars("𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"),
  },
  {
    id: "italic-serif",
    name: "Mathematical Italic Serif",
    category: "all",
    description: "Elegant, flowing mathematical slant",
    uppercase: splitChars("𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍"),
    lowercase: splitChars("𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧"),
    digits: DIGITS_PLAIN, // standard digits
  },
  {
    id: "bold-italic-serif",
    name: "Mathematical Bold Italic Serif",
    category: "bold",
    description: "Slanted, dense mathematical style",
    uppercase: splitChars("𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁"),
    lowercase: splitChars("𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛"),
    digits: DIGITS_PLAIN,
  },
  {
    id: "bold-sans",
    name: "Sans-Serif Bold",
    category: "bold",
    description: "Modern, solid, and tech-forward weight",
    uppercase: splitChars("𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭"),
    lowercase: splitChars("𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇"),
    digits: splitChars("𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"),
  },
  {
    id: "italic-sans",
    name: "Sans-Serif Italic",
    category: "all",
    description: "Clean modern oblique typeface",
    uppercase: splitChars("𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡"),
    lowercase: splitChars("𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻"),
    digits: DIGITS_PLAIN,
  },
  {
    id: "bold-italic-sans",
    name: "Sans-Serif Bold Italic",
    category: "bold",
    description: "Heavy and punchy modern oblique",
    uppercase: splitChars("𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕"),
    lowercase: splitChars("𝙖𝙗𝙘𝙙𝙚𝙯𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯"),
    digits: DIGITS_PLAIN,
  },
  {
    id: "gothic-normal",
    name: "Classic Gothic",
    category: "gothic",
    description: "Renaissance / medieval fraktur typeface",
    uppercase: splitChars("𝔄𝔅ℭ𝔇𝔈𝔉𝔊𝔏ℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ"),
    lowercase: splitChars("𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷"),
    digits: DIGITS_PLAIN,
  },
  {
    id: "gothic-bold",
    name: "Bold Gothic / Fraktur",
    category: "gothic",
    description: "Heavy Renaissance dark blackletter style",
    uppercase: splitChars("𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅"),
    lowercase: splitChars("𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟"),
    digits: DIGITS_PLAIN,
  },
  {
    id: "cursive-bold",
    name: "Bold Script",
    category: "cursive",
    description: "Lavish and luxurious bold handwriting",
    uppercase: splitChars("𝓐𝓑𝓒𝓓𝓔F𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦X𝓨𝓩"),
    lowercase: splitChars("𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃"),
    digits: DIGITS_PLAIN,
  },
  {
    id: "cursive-normal",
    name: "Elegant Script",
    category: "cursive",
    description: "Handwritten calligraphic style",
    uppercase: splitChars("𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵"),
    lowercase: splitChars("𝒶𝒷𝒸𝒹 get𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏"),
    digits: DIGITS_PLAIN,
  },
  {
    id: "double-struck",
    name: "Double-Struck (Outline)",
    category: "all",
    description: "Open-face blackboard outline text",
    uppercase: splitChars("𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ"),
    lowercase: splitChars("𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫"),
    digits: splitChars("𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"),
  },
  {
    id: "monospace",
    name: "Teletype Monospace",
    category: "all",
    description: "Fixed-width typewriter coding font",
    uppercase: splitChars("𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉"),
    lowercase: splitChars("𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣"),
    digits: splitChars("𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"),
  },
  {
    id: "bubble-outline",
    name: "Circular Bubble Text",
    category: "aesthetic",
    description: "Playful bubble text in empty white circles",
    uppercase: splitChars("ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ"),
    lowercase: splitChars("ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ"),
    digits: splitChars("⓪①②③④⑤⑥⑦⑧⑨"),
  },
  {
    id: "bubble-filled",
    name: "Circular Black Badge",
    category: "aesthetic",
    description: "Inverse styled white text on solid circles",
    uppercase: splitChars("🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩"),
    lowercase: splitChars("🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩"),
    digits: splitChars("⓿❶❷❸❹❺❻❼❽❾"),
  },
  {
    id: "square-outline",
    name: "Square Outline Box",
    category: "aesthetic",
    description: "Enclosed inside clean white boxed outlines",
    uppercase: splitChars("🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄿🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅content🅇content🅏"),
    lowercase: splitChars("🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄿🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅content🅇content🅏"),
    digits: splitChars("0123456789"),
  },
  {
    id: "square-filled",
    name: "Square Black Badge",
    category: "aesthetic",
    description: "Solid filled rectangular block badges",
    uppercase: splitChars("🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅content🆇🆈🆏"),
    lowercase: splitChars("🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅content🆇🆈🆏"),
    digits: splitChars("0123456789"),
  },
  {
    id: "small-caps",
    name: "Small Capitals",
    category: "all",
    description: "Elegant petite small caps typography style",
    uppercase: splitChars("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    lowercase: splitChars("ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ"),
    digits: DIGITS_PLAIN,
  },
  {
    id: "parenthesized",
    name: "Parenthesized Letters",
    category: "aesthetic",
    description: "Enveloped inside double parenthesis pairs",
    uppercase: splitChars("⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵"),
    lowercase: splitChars("⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵"),
    digits: splitChars("⑴⑵⑶⑷⑸⑹⑺⑻⑼"),
  },
  {
    id: "vaporwave",
    name: "Vaporwave / Fullwidth",
    category: "aesthetic",
    description: "Wide spacing retro aesthetic typography style",
    uppercase: splitChars("ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ"),
    lowercase: splitChars("ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ"),
    digits: splitChars("０１２３４５６７８９"),
  },
  {
    id: "fancy-tail",
    name: "Curling Tail script",
    category: "aesthetic",
    description: "Flowing lower curled letters",
    uppercase: splitChars("𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓧𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩"),
    lowercase: splitChars("αв¢∂єƒgнιנкℓмησρqяѕтυνωχуz"),
    digits: DIGITS_PLAIN,
  },
  {
    id: "ancient",
    name: "Eldritch / Runes Mock",
    category: "aesthetic",
    description: "Runes and foreign characters mockup",
    uppercase: splitChars("ΛβCDΞFGHIJKLMИΘPQЯSTUVWXYZ"),
    lowercase: splitChars("αв¢∂єƒgнιјкℓмησρqяѕтυνωχуz"),
    digits: DIGITS_PLAIN,
  },
  {
    id: "underlined-single",
    name: "Aesthetic Underlined",
    category: "all",
    description: "Joined bottom underlined stream",
    uppercase: UPPERCASE_PLAIN,
    lowercase: LOWERCASE_PLAIN,
    transform: (text) => text.split("").map(c => c + "\u0332").join(""),
  },
  {
    id: "underlined-double",
    name: "Aesthetic Double Underlined",
    category: "all",
    description: "Double underline horizontal striate",
    uppercase: UPPERCASE_PLAIN,
    lowercase: LOWERCASE_PLAIN,
    transform: (text) => text.split("").map(c => c + "\u0333").join(""),
  },
  {
    id: "strikethrough",
    name: "Lined Strikethrough",
    category: "all",
    description: "Center line horizontal strikethrough",
    uppercase: UPPERCASE_PLAIN,
    lowercase: LOWERCASE_PLAIN,
    transform: (text) => text.split("").map(c => c + "\u0336").join(""),
  },
  {
    id: "slash-through",
    name: "Slashed Character String",
    category: "all",
    description: "Aesthetic slash diagonal lines",
    uppercase: UPPERCASE_PLAIN,
    lowercase: LOWERCASE_PLAIN,
    transform: (text) => text.split("").map(c => c + "\u0338").join(""),
  },
  {
    id: "sparkles",
    name: "Sparkles Accent",
    category: "decorated",
    description: "Twinkling star aesthetic flairs",
    uppercase: UPPERCASE_PLAIN,
    lowercase: LOWERCASE_PLAIN,
    transform: (text) => `✨ ༓ ${text} ༓ ✨`,
  },
  {
    id: "royal-wings",
    name: "Royal Golden Wings",
    category: "decorated",
    description: "Classic symmetrical wing borders",
    uppercase: UPPERCASE_PLAIN,
    lowercase: LOWERCASE_PLAIN,
    transform: (text) => `꧁༺ ${text} ༻꧂`,
  },
  {
    id: "fancy-bracket",
    name: "Japanese Bio Box",
    category: "decorated",
    description: "Clean aesthetic double bracket casing",
    uppercase: UPPERCASE_PLAIN,
    lowercase: LOWERCASE_PLAIN,
    transform: (text) => `【 ❀ ${text} ❀ 】`,
  },
  {
    id: "aesthetic-heart",
    name: "Cute Pink Hearts",
    category: "decorated",
    description: "Cluttered pink dynamic love hearts",
    uppercase: UPPERCASE_PLAIN,
    lowercase: LOWERCASE_PLAIN,
    transform: (text) => `💖 ₊˚.༄ ${text} ࿐ 💖`,
  },
  {
    id: "shining-stars",
    name: "Twinkle Star Grid",
    category: "decorated",
    description: "Decorative celestial constellations",
    uppercase: UPPERCASE_PLAIN,
    lowercase: LOWERCASE_PLAIN,
    transform: (text) => `★⋆.  🎀  ${text}  🎀  .⋆★`,
  },
  {
    id: "reverse-backwards",
    name: "Reversed Backwards Text",
    category: "aesthetic",
    description: "Backwards order and flipped alphabets",
    uppercase: UPPERCASE_PLAIN,
    lowercase: LOWERCASE_PLAIN,
    transform: (text) => {
      const flipMap: { [key: string]: string } = {
        a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ı", j: "ɾ", k: "ʞ", l: "l", m: "ɯ",
        n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
        A: "∀", B: "𐐒", C: "Ɔ", D: "◖", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W",
        N: "N", O: "O", P: "Ԁ", Q: "Ό", R: "ᵞ", S: "S", T: "┴", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
        "0": "0", "1": "⇂", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6"
      };
      return text.split("").reverse().map(c => flipMap[c] || c).join("");
    }
  },
  {
    id: "glitch-zalgo",
    name: "Glitch / Zalgo Core",
    category: "aesthetic",
    description: "Possessed chaotic digital error aesthetic",
    uppercase: UPPERCASE_PLAIN,
    lowercase: LOWERCASE_PLAIN,
    transform: (text) => {
      const zalgoUp = ["\u030d", "\u030e", "\u0304", "\u0305", "\u033f", "\u0311", "\u0306", "\u0310", "\u0352", "\u0357", "\u0351", "\u0307", "\u0308", "\u030a", "\u0342", "\u0343", "\u0344", "\u034a", "\u034b", "\u034c", "\u0303", "\u0302", "\u030c", "\u0350", "\u0300", "\u0301", "\u030b", "\u030f", "\u0312", "\u0313", "\u0314", "\u033d", "\u0309", "\u035c", "\u035b", "\u0346", "\u031a"];
      const zalgoDown = ["\u0316", "\u0317", "\u0318", "\u0319", "\u031c", "\u031d", "\u031e", "\u031f", "\u0320", "\u0324", "\u0325", "\u0326", "\u0329", "\u032a", "\u032b", "\u032c", "\u032d", "\u032e", "\u032f", "\u0330", "\u0331", "\u0332", "\u0333", "\u033a", "\u033b", "\u033c", "\u0345", "\u0347", "\u0348", "\u0349", "\u034d", "\u034e", "\u0353", "\u0354", "\u0355", "\u0356", "\u0359", "\u035a", "\u0323"];
      const zalgoMid = ["\u0315", "\u0334", "\u0335", "\u0336", "\u0337", "\u0338", "\u0358", "\u035e", "\u035f", "\u0360", "\u0361", "\u0362", "\u0332", "\u0338", "\u039c", "\u03bc", "\u0482"];

      return text.split("").map(c => {
        if (c === " ") return c;
        let res = c;
        // Limit clutter levels so the text remains copy-pasteable and legible
        for (let i = 0; i < 2; i++) {
          res += zalgoUp[Math.floor(Math.random() * zalgoUp.length)];
          res += zalgoDown[Math.floor(Math.random() * zalgoDown.length)];
        }
        res += zalgoMid[Math.floor(Math.random() * zalgoMid.length)];
        return res;
      }).join("");
    }
  }
];

export function convertText(text: string, styleId: string): string {
  if (!text) return "";
  const style = UNICODE_STYLES.find(s => s.id === styleId);
  if (!style) return text;

  // If there's an custom transform mapping
  if (style.transform) {
    return style.transform(text);
  }

  return text.split("").map(char => {
    // 1. Check uppercase
    const upIdx = UPPERCASE_PLAIN.indexOf(char);
    if (upIdx !== -1 && style.uppercase[upIdx]) {
      return style.uppercase[upIdx];
    }
    // 2. Check lowercase
    const lowIdx = LOWERCASE_PLAIN.indexOf(char);
    if (lowIdx !== -1 && style.lowercase[lowIdx]) {
      return style.lowercase[lowIdx];
    }
    // 3. Check digits
    const digIdx = DIGITS_PLAIN.indexOf(char);
    if (digIdx !== -1 && style.digits && style.digits[digIdx]) {
      return style.digits[digIdx];
    }
    // Return original if no match
    return char;
  }).join("");
}

export interface ExpandedStyle {
  id: string;
  name: string;
  category: "bold" | "cursive" | "gothic" | "aesthetic" | "decorated" | "hybrid" | "all";
  description: string;
  render: (text: string) => string;
}

export const DECORATORS_LIST = [
  { name: "Hearts", prefix: "˗ˏˋ ♡ ˎˊ˗ ꒰ ", suffix: " ꒱ ˗ˏˋ ♡ ˎˊ˗" },
  { name: "Sparkling Stars", prefix: "✨｡ﾟ•┈୨♡୧┈•ﾟ｡✨\n", suffix: "" },
  { name: "Elegant Border", prefix: "╭┈┈┈┈┈┈┈☕︎\n┆  ", suffix: "\n╰┈┈┈┈┈┈┈┈┈┈┈" },
  { name: "Aesthetic Flowers", prefix: "✿ ─► ", suffix: " ◄─ ✿" },
  { name: "Angel Wings", prefix: "ʚ˚̣̣̣͙ɞ ", suffix: " ʚ˚̣̣̣͙ɞ" },
  { name: "Star Banner", prefix: "✮ :･ﾟ  ", suffix: "  ﾟ･: ✮" },
  { name: "Bio Ribbon", prefix: "🎀 𝒩𝑒𝓌: 〖 ", suffix: " 〗 🎀" },
  { name: "Cyberpunk Edge", prefix: "⚡︎ ⟪ ", suffix: " ⟫ ⚡︎" },
];

export const THEME_WRAPPERS_LIST = [
  { name: "Fairy Tale", prefix: "🧚‍♀️ ✧.⁺ ", suffix: " ⁺.✧ 🧚‍♀️" },
  { name: "Soft Cafe", prefix: "☕︎ ꒰ ", suffix: " ꒱ ☕︎" },
  { name: "Vapor Neon", prefix: "📺 彡 ", suffix: " 彡 📺" },
  { name: "Cottagecore", prefix: "🐌 🌿 ", suffix: " 🌿 🐌" },
  { name: "Ethereal Moon", prefix: "🌙 ☄. *. ", suffix: " .* ☄ 🌙" },
  { name: "Sweet Lollipop", prefix: "🍭 🍬 ", suffix: " 🍬 🍭" },
  { name: "Ocean Wave", prefix: "🌊 🐚 ", suffix: " 🐚 🌊" },
  { name: "Autumn Leaf", prefix: "🍁 🍂 ", suffix: " 🍂 🍁" },
  { name: "Galaxy Voyage", prefix: "🚀 🛸 ", suffix: " 🛸 🚀" },
  { name: "Imperial Gold", prefix: "👑 ༺ ", suffix: " ༻ 👑" },
  { name: "Tokyo Street", prefix: "🗼 ❀ ", suffix: " ❀ 🗼" },
  { name: "Lucky Charm", prefix: "🍀 🌟 ", suffix: " 🌟 🍀" },
  { name: "Cute Kitty Logo", prefix: "🐾 🐱 ", suffix: " 🐱 🐾" },
  { name: "Cozy Hearth", prefix: "🔥 ✨ ", suffix: " ✨ 🔥" },
  { name: "Gothic Blade", prefix: "🩸 ⚔️ ", suffix: " ⚔️ 🩸" },
];

export const BRACKETS_LIST = [
  { name: "Japanese Double Box", prefix: "【 ", suffix: " 】" },
  { name: "Vintage French Corners", prefix: "『 ", suffix: " 』" },
  { name: "Thin Caps", prefix: "〔 ", suffix: " 〕" },
  { name: "Double Arrowheads", prefix: "《 ", suffix: " 》" },
  { name: "Gilded Braces", prefix: "⟪ ", suffix: " ⟫" },
  { name: "Fancy Script Caps", prefix: "〖 ", suffix: " 〗" },
  { name: "Japanese Ribbon Wings", prefix: "꧁༺ ", suffix: " ༻꧂" },
  { name: "Duo Parenthesized", prefix: "⒜ ", suffix: " ⒝" },
  { name: "Academic Squares", prefix: "⟦ ", suffix: " ⟧" },
  { name: "Angled Chevron", prefix: "⟨⟨ ", suffix: " ⟩⟩" }
];

export const ALL_EXPANDED_STYLES: ExpandedStyle[] = [];

// 1. Original 31 styles
UNICODE_STYLES.forEach((base) => {
  ALL_EXPANDED_STYLES.push({
    id: `base-${base.id}`,
    name: base.name,
    category: base.category === "all" ? "all" : (base.category as any),
    description: base.description,
    render: (text) => convertText(text, base.id)
  });
});

// 2. Deco combos
UNICODE_STYLES.forEach((base) => {
  DECORATORS_LIST.forEach((deco, dIdx) => {
    ALL_EXPANDED_STYLES.push({
      id: `deco-${base.id}-${dIdx}`,
      name: `${deco.name} ${base.name}`,
      category: "decorated",
      description: `Decorated with ${deco.name} ornaments`,
      render: (text) => {
        const transformedText = convertText(text, base.id);
        return `${deco.prefix}${transformedText}${deco.suffix}`;
      }
    });
  });
});

// 3. Theme wrappers combos
UNICODE_STYLES.forEach((base) => {
  THEME_WRAPPERS_LIST.forEach((theme, wIdx) => {
    ALL_EXPANDED_STYLES.push({
      id: `theme-${base.id}-${wIdx}`,
      name: `${theme.name} • ${base.name}`,
      category: "hybrid",
      description: `Atmospheric ${theme.name} design setup`,
      render: (text) => {
        const transformedText = convertText(text, base.id);
        return `${theme.prefix}${transformedText}${theme.suffix}`;
      }
    });
  });
});

// 4. Bracket combos
UNICODE_STYLES.forEach((base) => {
  BRACKETS_LIST.forEach((bracket, bIdx) => {
    ALL_EXPANDED_STYLES.push({
      id: `bracket-${base.id}-${bIdx}`,
      name: `${bracket.name} Enclosed ${base.name}`,
      category: "aesthetic",
      description: `Neatly parsed inside ${bracket.name} wrappers`,
      render: (text) => {
        const transformedText = convertText(text, base.id);
        return `${bracket.prefix}${transformedText}${bracket.suffix}`;
      }
    });
  });
});

export const DECORATORS = DECORATORS_LIST;

