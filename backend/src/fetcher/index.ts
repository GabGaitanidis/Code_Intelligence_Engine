import simpleGit from "simple-git";
import fs from "fs/promises";
import path from "path";

export async function fetchRepo(repoUrl: string): Promise<string> {
  const repoName = repoUrl.split("/").pop()?.replace(".git", "") ?? "repo";
  const clonePath = path.join(process.cwd(), "repos", repoName);

  await simpleGit().clone(repoUrl, clonePath);

  return clonePath;
}

export async function cleanupRepo(repoPath: string): Promise<void> {
  await fs.rm(repoPath, { recursive: true, force: true });
}
