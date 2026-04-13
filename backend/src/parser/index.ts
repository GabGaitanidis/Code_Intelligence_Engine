import { createInterface } from "node:readline/promises";
import { createReadStream } from "node:fs";

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

    filePaths.push(dependantFileName);
  }
  return filePaths;
}
