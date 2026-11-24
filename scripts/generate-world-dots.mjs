import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";

const require = createRequire(import.meta.url);
const landTopology = require("world-atlas/land-110m.json");
const landGeoJson = feature(landTopology, landTopology.objects.land);

// Projection bounds: Europe, Africa & Middle East with Egypt (31.24E, 30.04N) near center
const WIDTH = 1200;
const HEIGHT = 675;
const LON_MIN = -26;
const LON_MAX = 84; // 110 deg span
const LAT_MAX = 65;
const LAT_MIN = -8; // 73 deg span
const STEP = 12; // pixel grid spacing

const segments = [];
let dotCount = 0;

for (let y = STEP / 2; y < HEIGHT; y += STEP) {
  const lat = LAT_MAX - (y / HEIGHT) * (LAT_MAX - LAT_MIN);
  for (let x = STEP / 2; x < WIDTH; x += STEP) {
    const lon = LON_MIN + (x / WIDTH) * (LON_MAX - LON_MIN);
    if (geoContains(landGeoJson, [lon, lat])) {
      segments.push(`M${x} ${y}h.01`);
      dotCount++;
    }
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none"><path d="${segments.join("")}" stroke="#5b9bf8" stroke-width="3" stroke-linecap="round"/></svg>\n`;

const outPath = path.resolve(process.cwd(), "public", "world-dots.svg");
fs.writeFileSync(outPath, svg, "utf8");

const bytes = Buffer.byteLength(svg, "utf8");
console.log(
  `Generated ${outPath}: ${dotCount} land dots, ${(bytes / 1024).toFixed(2)} KB`
);
