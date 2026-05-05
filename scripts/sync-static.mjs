import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");

const filesToCopy = [
  "BingSiteAuth.xml",
  "robots.txt",
  "sitemap.xml",
  "style.css",
  "main.js",
  "footer.html",
  "nav.html",
];

const directoriesToCopy = ["assets", "IMAGES"];

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function copyFile(relativePath) {
  const sourcePath = path.join(rootDir, relativePath);
  const destinationPath = path.join(publicDir, relativePath);
  await ensureDir(path.dirname(destinationPath));
  await fs.copyFile(sourcePath, destinationPath);
}

async function copyDirectory(relativePath) {
  const sourcePath = path.join(rootDir, relativePath);
  const destinationPath = path.join(publicDir, relativePath);
  await fs.rm(destinationPath, { recursive: true, force: true });
  await ensureDir(path.dirname(destinationPath));
  await fs.cp(sourcePath, destinationPath, { recursive: true });
}

await ensureDir(publicDir);
await Promise.all(filesToCopy.map(copyFile));
await Promise.all(directoriesToCopy.map(copyDirectory));
