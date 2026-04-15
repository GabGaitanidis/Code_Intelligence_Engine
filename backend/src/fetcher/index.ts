import simpleGit from "simple-git";
import fs from "fs/promises";
import path from "path";
import { cleanupRepo } from "./cleanupRepo";

export async function fetchRepo(repoUrl: string): Promise<string> {
  const repoName = repoUrl.split("/").pop()?.replace(".git", "") ?? "repo";
  const clonePath = path.join(process.cwd(), "repos", repoName);

  try {
    await fs.access(clonePath);
  } catch {
    await simpleGit().clone(repoUrl, clonePath, ["--depth", "1"]);
  }

  return clonePath;
}
