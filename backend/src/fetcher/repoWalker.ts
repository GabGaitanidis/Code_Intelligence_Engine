import fs from "fs/promises";
import path from "path";

const IGNORE = ["node_modules", "dist", ".git", "build", "coverage"];
const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];

export async function walkRepo(repoPath: string) {
  const files: string[] = [];

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true }); // list of directories in dir

    for (const entry of entries) {
      if (IGNORE.includes(entry.name)) continue;

      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (EXTENSIONS.includes(path.extname(entry.name))) {
        files.push(fullPath);
      }
    }
  }

  await walk(repoPath);
  return files;
}
