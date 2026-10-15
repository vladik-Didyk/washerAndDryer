// Finds the machine photos that exist in public/photos/types/ and reads their pixel size,
// so the build can use a photo (with correct width/height) or fall back to the drawing.
import fs from "node:fs";
import path from "node:path";

// Width and height from a JPEG's SOF marker. Returns null if the file isn't a readable JPEG.
function jpegSize(buffer) {
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

// Returns { "photos/types/stackable.jpg": { width, height }, ... } for files that exist.
export function findMachinePhotos(publicDir) {
  const dir = path.join(publicDir, "photos", "types");
  const found = {};
  if (!fs.existsSync(dir)) return found;
  for (const name of fs.readdirSync(dir)) {
    if (!name.toLowerCase().endsWith(".jpg")) continue;
    const size = jpegSize(fs.readFileSync(path.join(dir, name)));
    if (size) found[`photos/types/${name}`] = size;
    else console.warn(`[photos] ${name} is not a readable JPEG; the drawing is used instead.`);
  }
  return found;
}
