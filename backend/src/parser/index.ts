import { createInterface } from "node:readline/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import fs from "fs/promises";

export async function parser(file: string) {
  const filePaths: string[] = [];
  const fileStream = createReadStream(file);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const match = line.match(/from\s+['"]([^'"]+)['"]/);
    if (!match) continue;

    const dependantFileName = match[1];
    const isRelative =
      dependantFileName.startsWith("./") || dependantFileName.startsWith("../");
    if (!isRelative) continue;
    const resolved = await resolveImport(path.dirname(file), dependantFileName);
    if (!resolved) continue;
    filePaths.push(resolved);
  }
  return {
    file,
    imports: filePaths,
  };
}

async function resolveImport(
  base: string,
  dep: string,
): Promise<string | null> {
  const extensions = [".ts", ".tsx", ".js", ".jsx"];

  for (const ext of extensions) {
    const full = path.resolve(base, dep + ext);
    try {
      await fs.access(full);
      return full;
    } catch {}
  }

  for (const ext of extensions) {
    const full = path.resolve(base, dep, "index" + ext);
    try {
      await fs.access(full);
      return full;
    } catch {}
  }

  return null;
}
