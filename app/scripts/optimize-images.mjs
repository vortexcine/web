import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = path.resolve(process.cwd(), 'public', 'images');

const folderProfiles = [
  {
    test: /[\\/]stills[\\/]/i,
    maxWidth: 2400, quality: 93,
  },
  {
    test: /[\\/]team[\\/]/i,
    maxWidth: 1920, quality: 82,
  },
  {
    test: /[\\/]portfolio[\\/]/i,
    maxWidth: 1920, quality: 82,
  },
  {
    test: /./,
    maxWidth: 1920, quality: 82,
  },
];

const fileProfiles = {};

const normalizeKey = (name) =>
  path.basename(name, path.extname(name)).normalize('NFD').replace(/[^a-z0-9]/gi, '').toLowerCase();

const findOriginal = (webpPath) => {
  const dir = path.dirname(webpPath);
  const key = normalizeKey(webpPath);
  const match = readdirSync(dir).find(
    (f) => /\.(jpe?g|png)$/i.test(f) && normalizeKey(f) === key
  );
  return match ? path.join(dir, match) : null;
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

    if (
      entry.isFile() &&
      path.extname(entry.name).toLowerCase() === '.webp' &&
      !/-thumb(@2x)?\.webp$/i.test(entry.name)
    ) {
      files.push(fullPath);
    }
  }

  return files;
};

const isPortfolioImage = (filePath) => /[\\/]portfolio[\\/]/i.test(filePath);

const thumbProfile = { maxWidth: 400, quality: 80 };
const thumbProfile2x = { maxWidth: 800, quality: 80 };

const getThumbPaths = (filePath) => {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, '.webp');
  return {
    thumb: path.join(dir, `${base}-thumb.webp`),
    thumb2x: path.join(dir, `${base}-thumb@2x.webp`),
  };
};

const generateThumbnail = async (sourceBuffer, outPath, profile) => {
  const buffer = await sharp(sourceBuffer, { failOn: 'none' })
    .rotate()
    .resize({ width: profile.maxWidth, withoutEnlargement: true })
    .webp({ quality: profile.quality, effort: 5, smartSubsample: true })
    .toBuffer();
  await writeWithRetry(outPath, buffer);
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

      // Re-encode only from an original; re-compressing a WebP degrades it each run.
      const originalPath = findOriginal(filePath);
      const sourceBuffer = readFileSync(originalPath ?? filePath);

      if (originalPath) {
        const outputBuffer = await sharp(sourceBuffer, { failOn: 'none' })
          .rotate()
          .resize({ width: profile.maxWidth, withoutEnlargement: true })
          .webp({ quality: profile.quality, effort: 5, smartSubsample: true })
          .toBuffer();

        await writeWithRetry(filePath, outputBuffer);
      } else {
        console.log(`${path.basename(filePath)}: sin original, se conserva`);
      }

      const after = statSync(filePath).size;

      totalBefore += before;
      totalAfter += after;

      console.log(
        `${path.basename(filePath)}: ${formatMb(before)} MB -> ${formatMb(after)} MB (${Math.round(((before - after) / before) * 100)}%)`
      );

      if (isPortfolioImage(filePath)) {
        const { thumb, thumb2x } = getThumbPaths(filePath);
        await generateThumbnail(sourceBuffer, thumb, thumbProfile);
        await generateThumbnail(sourceBuffer, thumb2x, thumbProfile2x);
        console.log(`  -> thumbnails: ${path.basename(thumb)}, ${path.basename(thumb2x)}`);
      }
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

