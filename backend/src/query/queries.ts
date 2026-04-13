import { getGraph } from "../graph/store";

export function dependsOn(file: string) {
  const graph = getGraph();

  return graph.outNeighbors(file);
}

export function dependedBy(file: string) {
  const graph = getGraph();

  return graph.inNeighbors(file);
}
