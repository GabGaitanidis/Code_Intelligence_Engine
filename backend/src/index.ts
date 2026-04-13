import { fetchRepo } from "./fetcher";
import { walkerRepo } from "./fetcher/repoWalker";
import { buildGraph } from "./graph";
import { parser } from "./parser";

async function main() {
  const repoPath = await fetchRepo(
    "https://github.com/GabGaitanidis/Code_Intelligence_Engine.git",
  );

  const files = await walkerRepo(repoPath);

  const parsed = await Promise.all(files.map((f) => parser(f)));

  const graph = buildGraph(parsed);
  console.log(JSON.stringify(graph.export(), null, 2));
}

main();
