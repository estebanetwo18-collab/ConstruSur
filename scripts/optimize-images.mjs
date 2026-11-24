#!/usr/bin/env node
/**
 * Optimiza fotos para la web (WebP, máx. 1920 px de ancho).
 *
 * Uso:
 *   npm run images -- <carpeta-origen> [carpeta-destino=public/img]
 *
 * Mantiene la estructura de subcarpetas y el nombre del archivo
 * (cambia la extensión a .webp). Ejemplo:
 *   originales/proyectos/prime-cocina.png → public/img/proyectos/prime-cocina.webp
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [, , srcArg, outArg = "public/img"] = process.argv;
if (!srcArg) {
  console.error("Uso: npm run images -- <carpeta-origen> [carpeta-destino]");
  process.exit(1);
}

const MAX_WIDTH = 1920;
const QUALITY = 80;
const EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (EXT.test(entry.name)) out.push(full);
  }
  return out;
}

const files = await walk(srcArg);
for (const file of files) {
  const rel = path.relative(srcArg, file).replace(EXT, ".webp");
  const dest = path.join(outArg, rel);
  await mkdir(path.dirname(dest), { recursive: true });
  const before = (await stat(file)).size;
  const info = await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(dest);
  console.log(
    `${rel.padEnd(42)} ${(before / 1024).toFixed(0).padStart(6)} KB → ${(info.size / 1024).toFixed(0).padStart(5)} KB  (${info.width}×${info.height})`,
  );
}
console.log(`\n${files.length} imágenes optimizadas en ${outArg}`);
