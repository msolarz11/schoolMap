import { GraphNode } from "./GraphNode.js";

export class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(name) {
    this.nodes.set(name, new GraphNode(name));
  }

  addEdge(start, end, weight) {
    const startNode = this.nodes.get(start);
    const endNode = this.nodes.get(end);
    if (startNode && endNode) {
      startNode.addNeighbor(endNode, weight);
      endNode.addNeighbor(startNode, weight);
    }
  }
}
