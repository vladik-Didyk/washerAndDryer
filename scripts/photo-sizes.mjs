// Finds the photos in public/photos/<folder>/ and reads their pixel sizes, so the build can use
// a photo (with correct width/height) or fall back to the drawing. It also lists the WebP and
// smaller versions that scripts/make-photo-versions.mjs made, for srcset.
//
// A photo is a JPEG such as public/photos/types/stackable-1.jpg. Its versions sit next to it:
// stackable-1.webp (same size), stackable-1-600w.jpg and stackable-1-600w.webp (600px wide).
import fs from "node:fs";
import path from "node:path";

// "<name>-<width>w.jpg" or ".webp": a smaller version, not a photo of its own.
export const VERSION_PATTERN = /-(\d+)w\.(jpg|webp)$/;

// Width and height from a JPEG's SOF marker. Returns null if the file isn't a readable JPEG.
export function jpegSize(buffer) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    if (marker === 0xff) {
      offset += 1; // padding byte
      continue;
    }
    const length = buffer.readUInt16BE(offset + 2);
    const isFrame =
      marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  return null;
}

// Every photo in public/photos/<folder>/ (the JPEGs that aren't versions), as
// { "photos/types/stackable-1.jpg": { width, height, webp, widths }, ... }.
// `webp`: a same-size WebP exists. `widths`: the smaller versions present in both formats.
export function findPhotos(publicDir) {
  const root = path.join(publicDir, "photos");
  const found = {};
  if (!fs.existsSync(root)) return found;
  const folders = fs.readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  for (const folder of folders) {
    const dir = path.join(root, folder.name);
    const files = new Set(fs.readdirSync(dir));
    for (const name of [...files].sort()) {
      if (!name.endsWith(".jpg") || VERSION_PATTERN.test(name)) continue;
      const size = jpegSize(fs.readFileSync(path.join(dir, name)));
      if (!size) {
        console.warn(`[photos] ${folder.name}/${name} is not a readable JPEG; it is left out.`);
        continue;
      }
      const stem = name.slice(0, -".jpg".length);
      const widths = [...files]
        .filter((file) => file.startsWith(`${stem}-`) && file.endsWith("w.jpg"))
        .map((file) => file.slice(stem.length + 1, -"w.jpg".length))
        .filter((width) => /^\d+$/.test(width))
        .map(Number)
        .filter((width) => width < size.width && files.has(`${stem}-${width}w.webp`))
        .sort((a, b) => a - b);
      found[`photos/${folder.name}/${name}`] = {
        ...size,
        webp: files.has(`${stem}.webp`),
        widths,
      };
    }
  }
  return found;
}
