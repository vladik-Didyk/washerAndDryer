// Makes the WebP and smaller versions of every photo in public/photos/<folder>/, with
// ImageMagick 7 (`magick`). Run it after adding or replacing a photo, and commit what it writes:
//   pnpm photos            makes the versions that are missing
//   pnpm photos --force    remakes all of them (after replacing a photo under the same name)
//
// For public/photos/types/stackable-1.jpg (1000px wide) it writes stackable-1.webp, and
// stackable-1-240w.jpg/.webp and stackable-1-600w.jpg/.webp. The build itself doesn't need
// ImageMagick: it uses whatever versions are there (scripts/photo-sizes.mjs), and a photo
// without them is still shown, from the JPEG alone.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { VERSION_PATTERN, jpegSize } from "./photo-sizes.mjs";

const photosDir = fileURLToPath(new URL("../public/photos", import.meta.url));
const force = process.argv.includes("--force");

// Widths of the smaller versions, per folder. Machine photos: thumbnails and cards. Hero:
// steps from phones to wide screens (the 1920px original is the largest).
const WIDTHS = {
  types: [240, 600],
  hero: [480, 720, 960, 1440],
};
const WEBP = ["-quality", "76", "-define", "webp:method=6"];
const JPEG = ["-quality", "80", "-sampling-factor", "4:2:0", "-interlace", "JPEG"];

const written = [];
function make(source, target, resize, format) {
  if (!force && fs.existsSync(target)) return;
  execFileSync("magick", [source, "-strip", ...resize, ...format, target], { stdio: "inherit" });
  written.push(`${path.relative(photosDir, target)} (${Math.round(fs.statSync(target).size / 1024)} KB)`);
}

for (const folder of fs.readdirSync(photosDir, { withFileTypes: true })) {
  if (!folder.isDirectory()) continue;
  const dir = path.join(photosDir, folder.name);
  for (const name of fs.readdirSync(dir).sort()) {
    if (!name.endsWith(".jpg") || VERSION_PATTERN.test(name)) continue;
    const source = path.join(dir, name);
    const size = jpegSize(fs.readFileSync(source));
    if (!size) {
      console.warn(`Skipped ${folder.name}/${name}: not a readable JPEG.`);
      continue;
    }
    const stem = path.join(dir, name.slice(0, -".jpg".length));
    make(source, `${stem}.webp`, [], WEBP);
    for (const width of WIDTHS[folder.name] ?? []) {
      if (width >= size.width) continue;
      make(source, `${stem}-${width}w.jpg`, ["-resize", `${width}x`], JPEG);
      make(source, `${stem}-${width}w.webp`, ["-resize", `${width}x`], WEBP);
    }
  }
}

console.log(written.length ? `Wrote:\n  ${written.join("\n  ")}` : "Every version is already there.");
