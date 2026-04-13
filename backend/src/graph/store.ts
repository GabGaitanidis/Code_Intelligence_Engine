import { DirectedGraph } from "graphology";

let graph: DirectedGraph | null = null;

export function setGraph(g: DirectedGraph) {
  graph = g;
}

export function getGraph(): DirectedGraph {
  if (!graph) throw new Error("Graph not initialized");
  return graph;
}
