import { createInterface } from "node:readline/promises";
import { createReadStream } from "node:fs";
import path from "node:path";

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
    const resolved = path.resolve(path.dirname(file), dependantFileName);
    filePaths.push(resolved);
  }
  return filePaths;
}
