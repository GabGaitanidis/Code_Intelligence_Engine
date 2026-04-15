import { fetchRepo } from "./fetcher";
import { cleanupRepo } from "./fetcher/cleanupRepo";
import { walkRepo } from "./fetcher/repoWalker";
import { buildGraph } from "./graph";
import { setGraph } from "./graph/store";
import { parser } from "./parser";
import { dependedBy, dependsOn } from "./query/queries";

async function main() {
  const repoPath = await fetchRepo(
    "https://github.com/GabGaitanidis/API_Generator.git",
  );

  const files = await walkRepo(repoPath);

  const parsed = await Promise.all(files.map((f) => parser(f, repoPath)));
  console.log(parsed);
  const graph = buildGraph(parsed);
  setGraph(graph);
}

main();
