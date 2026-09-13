import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("dist/client");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/sugar-blower-interactive";

async function rewriteAssetPaths(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteAssetPaths(filePath);
      continue;
    }
    if (!entry.name.endsWith(".html") && !entry.name.endsWith(".css")) continue;

    const source = await readFile(filePath, "utf8");
    const rewritten = source
      .replaceAll("/assets/", `${basePath}/assets/`)
      .replaceAll('href="/favicon.svg"', `href="${basePath}/favicon.svg"`);
    await writeFile(filePath, rewritten);
  }
}

await rewriteAssetPaths(outputDir);
