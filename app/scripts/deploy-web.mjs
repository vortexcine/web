import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const distDir = path.join(appRoot, 'dist');
const webDir = path.join(repoRoot, 'web');
const rootIndex = path.join(repoRoot, 'index.html');
const distIndex = path.join(distDir, 'index.html');
const legacyRootDirs = [
  path.join(repoRoot, 'assets'),
  path.join(repoRoot, 'images'),
];

if (!existsSync(distDir)) {
  throw new Error('No existe dist/. Ejecuta primero la build.');
}

if (existsSync(webDir)) {
  for (const entry of readdirSync(webDir)) {
    rmSync(path.join(webDir, entry), { recursive: true, force: true });
  }
} else {
  mkdirSync(webDir, { recursive: true });
}

cpSync(distDir, webDir, { recursive: true });
cpSync(distIndex, rootIndex);

for (const dir of legacyRootDirs) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
  }
}

console.log('Deploy listo: web/ y index.html sincronizados desde app/dist');
