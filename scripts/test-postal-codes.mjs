// `pnpm test`: runs the postal-code checker (src/content/areas.js) over sample inputs, prints
// each answer, and exits with code 1 if any answer isn't the expected one.
import { checkPostalCode } from "../src/content/areas.js";

const TEXT_US =
  "Not sure from the postal code. Text us your address at (437) 907-6955 and we'll confirm.";
const INVALID = "Enter a valid Canadian postal code, like M5V 2T6.";

const samples = [
  ["M5V 2T6", "Yes, we deliver in Toronto."],
  ["m2n6k1", "Yes, we deliver in Toronto."],
  ["L5B 1M2", "Yes, we deliver in Mississauga."],
  ["L6Y 0A1", "Yes, we deliver in Brampton."],
  ["L4K 2Z2", "Yes, we deliver in Vaughan."],
  ["L3R 9Z1", "Yes, we deliver in Markham."],
  ["L4B 3P4", "Yes, we deliver in Richmond Hill."],
  ["K1A 0B1", TEXT_US],
  ["12345", INVALID],
  // Edge cases: spacing and a hyphen, the FSA alone, letters never used, empty input.
  ["  l5b-1m2 ", "Yes, we deliver in Mississauga."],
  ["M5V", "Yes, we deliver in Toronto."],
  ["L0J 1C0", TEXT_US],
  ["D5V 2T6", INVALID],
  ["", INVALID],
];

let failed = 0;
for (const [input, expected] of samples) {
  const { message } = checkPostalCode(input);
  const ok = message === expected;
  if (!ok) failed += 1;
  console.log(`${ok ? "ok  " : "FAIL"} ${JSON.stringify(input).padEnd(13)} -> ${message}`);
  if (!ok) console.log(`     expected: ${expected}`);
}

console.log(failed ? `\n${failed} of ${samples.length} failed` : `\nAll ${samples.length} passed`);
process.exit(failed ? 1 : 0);
