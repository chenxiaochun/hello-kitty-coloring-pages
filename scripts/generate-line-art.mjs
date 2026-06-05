import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/assets/coloring-pages");

const STROKE = "#5C4A5A";
const STROKE_LIGHT = "#8A7A88";
const ACCENT = "#E84C6F";

function wrap(id, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect width="800" height="800" fill="#FFFBF7"/>
  ${body}
</svg>`;
}

/** Original kawaii cat character (not licensed Sanrio artwork). */
function kitty(x, y, scale = 1, flip = false) {
  const s = scale;
  const t = flip ? `translate(${x + 120 * s}, ${y}) scale(-1, 1)` : `translate(${x}, ${y})`;
  return `<g transform="${t} scale(${s})">
    <ellipse cx="60" cy="95" rx="48" ry="42" fill="none" stroke="${STROKE}" stroke-width="3.5"/>
    <path d="M18 72 C8 38, 32 28, 48 58" fill="none" stroke="${STROKE}" stroke-width="3.5"/>
    <path d="M102 72 C112 38, 88 28, 72 58" fill="none" stroke="${STROKE}" stroke-width="3.5"/>
    <circle cx="42" cy="88" r="5" fill="${STROKE}"/>
    <circle cx="78" cy="88" r="5" fill="${STROKE}"/>
    <ellipse cx="60" cy="102" rx="5" ry="4" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M38 108 Q60 118 82 108" fill="none" stroke="${STROKE}" stroke-width="2"/>
    <path d="M28 100 L12 98 M32 106 L14 112 M88 100 L104 98 M84 106 L102 112" stroke="${STROKE}" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="48" cy="38" rx="18" ry="12" fill="none" stroke="${ACCENT}" stroke-width="3"/>
    <circle cx="48" cy="38" r="5" fill="none" stroke="${ACCENT}" stroke-width="2"/>
    <ellipse cx="60" cy="145" rx="32" ry="28" fill="none" stroke="${STROKE}" stroke-width="3"/>
    <path d="M42 138 L38 175 M78 138 L82 175" stroke="${STROKE}" stroke-width="3" stroke-linecap="round"/>
  </g>`;
}

const pages = {
  "birthday-kitty": `
    ${kitty(280, 220, 1.35)}
    <rect x="310" y="480" width="180" height="55" rx="12" fill="none" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="400" cy="470" rx="95" ry="35" fill="none" stroke="${STROKE}" stroke-width="3"/>
    <path d="M355 470 L345 420 M400 455 L400 395 M445 470 L455 420" stroke="${STROKE_LIGHT}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="370" cy="410" r="8" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
    <circle cx="430" cy="400" r="8" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
    <path d="M120 120 C120 60, 160 40, 180 100" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2.5"/>
    <ellipse cx="175" cy="95" rx="35" ry="45" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2.5"/>
    <path d="M620 130 C640 70, 680 80, 670 140" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2.5"/>
    <ellipse cx="665" cy="115" rx="30" ry="40" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2.5"/>
    <text x="400" y="620" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="none" stroke="${STROKE_LIGHT}" stroke-width="1.5">Happy Birthday!</text>
  `,
  "garden-party": `
    ${kitty(300, 200, 1.2)}
    <path d="M80 580 Q400 520 720 580" fill="none" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="150" cy="560" r="22" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
    <circle cx="150" cy="560" r="8" fill="none" stroke="${ACCENT}" stroke-width="2"/>
    <circle cx="250" cy="540" r="18" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2.5"/>
    <circle cx="550" cy="550" r="20" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
    <circle cx="650" cy="530" r="16" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2.5"/>
    <path d="M130 560 L130 500 M250 540 L250 490 M550 550 L550 495 M650 530 L650 485" stroke="${STROKE_LIGHT}" stroke-width="2"/>
    <ellipse cx="680" cy="420" rx="55" ry="70" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M655 420 Q680 360 705 420" fill="none" stroke="${STROKE}" stroke-width="2"/>
    <rect x="120" y="380" width="90" height="120" rx="8" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M165 380 L165 340" stroke="${STROKE}" stroke-width="2.5"/>
  `,
  "best-friends": `
    ${kitty(180, 240, 1.15)}
    ${kitty(460, 240, 1.15, true)}
    <path d="M320 400 Q400 440 480 400" fill="none" stroke="${ACCENT}" stroke-width="3" stroke-dasharray="8 6"/>
    <ellipse cx="400" cy="520" rx="120" ry="25" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
    <circle cx="400" cy="380" r="12" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
    <circle cx="385" cy="365" r="6" fill="none" stroke="${ACCENT}" stroke-width="2"/>
    <circle cx="415" cy="365" r="6" fill="none" stroke="${ACCENT}" stroke-width="2"/>
  `,
  "spring-picnic": `
    ${kitty(310, 210, 1.2)}
    <path d="M140 520 L660 520 L620 600 L180 600 Z" fill="none" stroke="${STROKE}" stroke-width="3"/>
    <path d="M140 520 Q400 480 660 520" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <rect x="520" y="430" width="80" height="60" rx="6" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M540 430 L560 390 L600 390 L620 430" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <circle cx="200" cy="500" r="28" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
    <circle cx="240" cy="490" r="22" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
    <ellipse cx="150" cy="350" rx="40" ry="50" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
  `,
  "hello-holiday": `
    ${kitty(290, 230, 1.25)}
    <polygon points="400,80 420,150 500,150 435,195 455,265 400,220 345,265 365,195 300,150 380,150" fill="none" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="200" cy="180" r="6" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
    <circle cx="250" cy="140" r="4" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
    <circle cx="600" cy="160" r="5" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
    <circle cx="650" cy="200" r="4" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
    <rect x="330" y="500" width="140" height="90" rx="10" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M360 500 L360 460 M440 500 L440 460" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="400" cy="545" rx="50" ry="20" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
  `,
  "tea-time": `
    ${kitty(280, 200, 1.2)}
    <ellipse cx="520" cy="520" rx="100" ry="25" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M460 520 L470 460 L570 460 L580 520" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="525" cy="455" rx="55" ry="18" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M575 470 C600 440, 630 450, 620 480" fill="none" stroke="${STROKE}" stroke-width="2"/>
    <rect x="200" y="480" width="55" height="40" rx="6" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
    <circle cx="227" cy="475" r="22" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
    <path d="M150 400 Q180 360 210 400" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
  `,
  "playground-fun": `
    ${kitty(340, 280, 1.1)}
    <path d="M120 520 L280 520 L240 320 L160 320 Z" fill="none" stroke="${STROKE}" stroke-width="3"/>
    <line x1="200" y1="320" x2="200" y2="520" stroke="${STROKE}" stroke-width="2.5"/>
    <circle cx="520" cy="380" r="80" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <line x1="520" y1="300" x2="520" y2="520" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="520" cy="300" rx="90" ry="20" fill="none" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="650" cy="200" r="35" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
    <path d="M650 235 L650 280" stroke="${STROKE_LIGHT}" stroke-width="2"/>
  `,
  "starlight-dream": `
    ${kitty(300, 280, 1.15)}
    <path d="M150 200 Q400 120 650 200 Q550 280 400 260 Q250 280 150 200" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2.5"/>
    <circle cx="400" cy="180" r="35" fill="none" stroke="${STROKE_LIGHT}" stroke-width="2"/>
    <polygon points="200,150 205,165 220,165 208,175 213,190 200,180 187,190 192,175 180,165 195,165" fill="none" stroke="${STROKE}" stroke-width="2"/>
    <polygon points="600,130 604,142 616,142 606,150 610,162 600,154 590,162 594,150 584,142 596,142" fill="none" stroke="${STROKE}" stroke-width="2"/>
    <polygon points="320,100 323,110 333,110 325,116 328,126 320,120 312,126 315,116 307,110 317,110" fill="none" stroke="${STROKE_LIGHT}" stroke-width="1.5"/>
    <circle cx="500" cy="90" r="3" fill="none" stroke="${STROKE_LIGHT}" stroke-width="1.5"/>
    <circle cx="550" cy="220" r="4" fill="none" stroke="${STROKE_LIGHT}" stroke-width="1.5"/>
  `,
};

await mkdir(OUT_DIR, { recursive: true });

for (const [id, body] of Object.entries(pages)) {
  const dir = path.join(OUT_DIR, id);
  await mkdir(dir, { recursive: true });
  const svg = wrap(id, body);
  await writeFile(path.join(dir, "line-art.svg"), svg, "utf8");
  console.log(`Created ${id}/line-art.svg`);
}

console.log("Done.");
