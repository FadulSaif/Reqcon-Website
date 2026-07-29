import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(__dirname, '../dist');

async function getHtmlFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getHtmlFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function run() {
  try {
    const htmlFiles = await getHtmlFiles(distDir);
    console.log(`Processing ${htmlFiles.length} HTML files for FOUC prevention...`);

    const regex = /<script id="_R_">import\("([^"]+)"\)<\/script>/g;

    let modifiedCount = 0;
    for (const filePath of htmlFiles) {
      const content = await readFile(filePath, 'utf8');
      if (regex.test(content)) {
        // Reset regex index because of global flag
        regex.lastIndex = 0;
        const newContent = content.replace(regex, (match, entryPath) => {
          return `<script id="_R_">(function(){var l=document.querySelector('link[rel="stylesheet"]'),e=function(){import("${entryPath}")};if(l&&!l.sheet){l.addEventListener('load',e);l.addEventListener('error',e)}else{e()}})()</script>`;
        });
        await writeFile(filePath, newContent, 'utf8');
        modifiedCount++;
      }
    }
    console.log(`Successfully patched ${modifiedCount} HTML files.`);
  } catch (error) {
    console.error('Failed to run post-build script:', error);
    process.exit(1);
  }
}

run();
