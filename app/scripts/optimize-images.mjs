import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = path.resolve(process.cwd(), 'public', 'images');

const folderProfiles = [
  {
    test: /[\\/]team[\\/]/i,
    maxWidth: 1800,
    quality: 84,
  },
  {
    test: /[\\/]portfolio[\\/]/i,
    maxWidth: 2200,
    quality: 82,
  },
  {
    test: /./,
    maxWidth: 2000,
    quality: 82,
  },
];

const fileProfiles = {
  'Registro Paxlito en Vivo 1.webp': { maxWidth: 1700, quality: 76 },
  'Paisajismo 2.webp': { maxWidth: 1800, quality: 78 },
  'Equipo de Arte.webp': { maxWidth: 1700, quality: 78 },
};

const walk = (dir) => {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.webp') {
      files.push(fullPath);
    }
  }

  return files;
};

const getProfile = (filePath) => {
  const byName = fileProfiles[path.basename(filePath)];
  if (byName) {
    return byName;
  }

  for (const profile of folderProfiles) {
    if (profile.test.test(filePath)) {
      return profile;
    }
  }

  return folderProfiles[folderProfiles.length - 1];
};

const formatMb = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const writeWithRetry = async (filePath, buffer, attempts = 4) => {
  for (let i = 1; i <= attempts; i += 1) {
    try {
      writeFileSync(filePath, buffer);
      return;
    } catch (error) {
      if (i === attempts) {
        throw error;
      }
      await sleep(120 * i);
    }
  }
};

const main = async () => {
  const files = walk(rootDir);

  if (files.length === 0) {
    console.log('No se encontraron archivos .webp para optimizar.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  const failed = [];

  console.log(`Optimizando ${files.length} imagenes WebP...`);

  for (const filePath of files) {
    try {
      const before = statSync(filePath).size;
      const profile = getProfile(filePath);

      const sourceBuffer = readFileSync(filePath);
      const image = sharp(sourceBuffer, { failOn: 'none' });
      const metadata = await image.metadata();
      const shouldResize = typeof metadata.width === 'number' && metadata.width > profile.maxWidth;

      const pipeline = shouldResize
        ? image.resize({ width: profile.maxWidth, withoutEnlargement: true })
        : image;

      const outputBuffer = await pipeline.webp({
        quality: profile.quality,
        effort: 5,
        smartSubsample: true,
      }).toBuffer();

      await writeWithRetry(filePath, outputBuffer);

      const after = statSync(filePath).size;

      totalBefore += before;
      totalAfter += after;

      console.log(
        `${path.basename(filePath)}: ${formatMb(before)} MB -> ${formatMb(after)} MB (${Math.round(((before - after) / before) * 100)}%)`
      );
    } catch (error) {
      failed.push(path.basename(filePath));
      console.log(`${path.basename(filePath)}: omitida por bloqueo temporal (${error.code ?? 'ERROR'})`);
    }
  }

  console.log('---');
  console.log(`Total: ${formatMb(totalBefore)} MB -> ${formatMb(totalAfter)} MB`);
  console.log(`Ahorro total: ${Math.round(((totalBefore - totalAfter) / totalBefore) * 100)}%`);

  if (failed.length > 0) {
    console.log(`Archivos omitidos (${failed.length}): ${failed.join(', ')}`);
  }
};

main().catch((error) => {
  console.error('Error al optimizar imagenes:', error);
  process.exit(1);
});
