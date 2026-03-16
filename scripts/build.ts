import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

// 1. Clean and recreate dist
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/icons", { recursive: true });

// 2. Build TypeScript sources
const result = await Bun.build({
  entrypoints: [
    "src/service-worker.ts",
    "src/content-youtube.ts",
    "src/offscreen.ts",
  ],
  outdir: "dist",
  target: "browser",
  format: "esm",
  splitting: false,
  minify: true,
  naming: "[name].js",
});

if (!result.success) {
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

console.log(`Built ${result.outputs.length} files to dist/`);

// 3. Copy public/ → dist/
function copyDir(src: string, dest: string) {
  const entries = readdirSync(src);
  for (const entry of entries) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const stat = statSync(srcPath);
    if (stat.isDirectory()) {
      mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      cpSync(srcPath, destPath);
    }
  }
}

copyDir("public", "dist");
console.log("Copied public/ → dist/");
