import sharp from "sharp";
import { rename, rm, stat } from "node:fs/promises";

const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error("Usage: node scripts/optimize-mandala.mjs input output");

const temporary = `${output}.tmp.webp`;
let saved = false;
for (const dimension of [950, 850, 750, 680]) {
  for (const quality of [32, 28, 24, 20]) {
    await sharp(input).resize(dimension, dimension, { fit: "inside", withoutEnlargement: true }).grayscale().webp({ quality, effort: 6, smartSubsample: true }).toFile(temporary);
    const { size } = await stat(temporary);
    if (size <= 50_000 || (dimension === 680 && quality === 20)) {
      await rm(output, { force: true });
      await rename(temporary, output);
      console.log(`${output}|${size}|${dimension}px|q${quality}`);
      saved = true;
      break;
    }
  }
  if (saved) break;
}
