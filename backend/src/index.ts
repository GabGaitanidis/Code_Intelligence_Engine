import { fetchRepo } from "./fetcher";
import { walkerRepo } from "./fetcher/repoWalker";
import { buildGraph } from "./graph";
import { parser } from "./parser";

async function main() {
  const repoPath = await fetchRepo(
    "https://github.com/GabGaitanidis/Code_Intelligence_Engine.git",
  );
  console.log("repoPath:", repoPath);

  const files = await walkerRepo(repoPath);
  console.log("files found:", files.length);
  console.log(files);

  const parsed = await Promise.all(files.map((f) => parser(f)));
  console.log("parsed:", JSON.stringify(parsed, null, 2));

  const graph = buildGraph(parsed);
  console.log(JSON.stringify(graph.export(), null, 2));
}

main();
