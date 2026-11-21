import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const srcUrl = new URL('./entry.png', import.meta.url);
const dstPath = join(outDir, 'entry.png');
copyFileSync(srcUrl, dstPath);

const bytes = readFileSync(dstPath);
const size = statSync(dstPath).size;
const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
if (!isPng || size === 0 || size > 1048576) {
  throw new Error(`Invalid entry.png output (${size} bytes)`);
}

if (process.env.MAKEFUN_VERBOSE === '1') {
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  console.log(`entry.png written (${size} bytes, sha256=${sha256})`);
}
