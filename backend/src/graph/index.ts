import { DirectedGraph } from "graphology";
interface ParsedFile {
  file: string;
  imports: string[];
}

export function buildGraph(parsed: ParsedFile[]): DirectedGraph {
  const graph = new DirectedGraph();

  for (const { file } of parsed) {
    graph.addNode(file);
  }

  for (const { file, imports } of parsed) {
    for (const dep of imports) {
      if (graph.hasNode(dep) && !graph.hasEdge(file, dep)) {
        graph.addEdge(file, dep);
      }
    }
  }

  return graph;
}
