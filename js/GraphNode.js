export class GraphNode {
  constructor(name) {
    this.name = name;
    this.neighbors = [];
  }

  addNeighbor(node, weight) {
    this.neighbors.push({ node, weight });
  }
}
