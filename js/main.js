import { Graph } from "./Graph.js";
import { PriorityQueue } from "./PriorityQueue.js";

const map = L.map("map", {
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false,
  touchZoom: false,
  dragging: false,
}).setView([0.5, 0.5], 1);

const imageBounds = [
  [0, 0],
  [1, 1],
];

L.imageOverlay("./img/warsztaty_2.png", imageBounds).addTo(map);

function aStar(graph, start, goal) {
  function heuristic(nodeA, nodeB) {
    return 0;
  }

  let openList = new PriorityQueue();
  openList.enqueue(start, 0);

  let gCosts = new Map();
  let fCosts = new Map();
  let cameFrom = new Map();

  for (let node of graph.nodes.values()) {
    gCosts.set(node.name, Infinity);
    fCosts.set(node.name, Infinity);
  }
  gCosts.set(start.name, 0);
  fCosts.set(start.name, heuristic(start, goal));

  while (!openList.isEmpty()) {
    let current = openList.dequeue().element;

    if (current.name === goal.name) {
      return reconstructPath(cameFrom, current);
    }

    for (let neighbor of current.neighbors) {
      let tentativeGCost = gCosts.get(current.name) + neighbor.weight;

      if (tentativeGCost < gCosts.get(neighbor.node.name)) {
        cameFrom.set(neighbor.node.name, current);
        gCosts.set(neighbor.node.name, tentativeGCost);
        fCosts.set(
          neighbor.node.name,
          tentativeGCost + heuristic(neighbor.node, goal)
        );

        if (!openList.contains(neighbor.node)) {
          openList.enqueue(neighbor.node, fCosts.get(neighbor.node.name));
        }
      }
    }
  }

  return null;
}

function reconstructPath(cameFrom, current) {
  let totalPath = [current.name];
  while (cameFrom.has(current.name)) {
    current = cameFrom.get(current.name);
    totalPath.push(current.name);
  }
  return totalPath.reverse();
}
let schoolGraph = new Graph();
schoolGraph.addNode("Klasa_501");
schoolGraph.addNode("Klasa_502");
schoolGraph.addNode("Klasa_503");
schoolGraph.addNode("Klasa_504");
schoolGraph.addNode("Klasa_505");
schoolGraph.addNode("Klasa_506");
schoolGraph.addNode("Klasa_507");
schoolGraph.addNode("Klasa_508");
schoolGraph.addNode("Klasa_509");
schoolGraph.addNode("Klasa_510");
schoolGraph.addNode("Klasa_511");
schoolGraph.addNode("Klasa_512");
schoolGraph.addNode("Klasa_513");
schoolGraph.addNode("Klasa_514");
schoolGraph.addNode("Klasa_515");
schoolGraph.addNode("Magazyn");
schoolGraph.addNode("Schody_1");
schoolGraph.addNode("Schody_2");

schoolGraph.addEdge("Klasa_501", "Klasa_502", 2);
schoolGraph.addEdge("Klasa_502", "Klasa_503", 4);
schoolGraph.addEdge("Klasa_503", "Klasa_504", 14);
schoolGraph.addEdge("Klasa_504", "Klasa_505", 3);
schoolGraph.addEdge("Klasa_504", "Schody_1", 5);
schoolGraph.addEdge("Schody_1", "Klasa_505", 5);
schoolGraph.addEdge("Klasa_505", "Klasa_506", 7);
schoolGraph.addEdge("Klasa_506", "Klasa_507", 3);
schoolGraph.addEdge("Klasa_507", "Klasa_508", 2);
schoolGraph.addEdge("Klasa_508", "Klasa_509", 6);
schoolGraph.addEdge("Klasa_509", "Klasa_510", 7);
schoolGraph.addEdge("Klasa_510", "Klasa_511", 5);
schoolGraph.addEdge("Klasa_511", "Klasa_512", 8);
schoolGraph.addEdge("Klasa_512", "Klasa_513", 5);
schoolGraph.addEdge("Klasa_513", "Schody_2", 1);
schoolGraph.addEdge("Schody_2", "Klasa_514", 3);
schoolGraph.addEdge("Klasa_514", "Klasa_515", 7);

const locations = [
  { name: "Klasa_501", loc: [0.68, 0.175] },
  { name: "Klasa_502", loc: [0.725, 0.175] },
  { name: "Klasa_503", loc: [0.795, 0.175] },
  { name: "Klasa_504", loc: [0.795, 0.585] },
  { name: "Schody_1", loc: [0.795, 0.695] },
  { name: "Klasa_505", loc: [0.795, 0.825] },
  { name: "Klasa_506", loc: [0.635, 0.825] },
  { name: "Klasa_507", loc: [0.54, 0.825] },
  { name: "Klasa_508", loc: [0.475, 0.825] },
  { name: "Klasa_509", loc: [0.36, 0.825] },
  { name: "Klasa_510", loc: [0.215, 0.825] },
  { name: "Klasa_511", loc: [0.215, 0.675] },
  { name: "Klasa_512", loc: [0.215, 0.41] },
  { name: "Klasa_513", loc: [0.215, 0.255] },
  { name: "Schody_2", loc: [0.215, 0.235] },
  { name: "Klasa_514", loc: [0.215, 0.175] },
  { name: "Klasa_515", loc: [0.365, 0.175] },
];
let polyline = null;
locations.forEach((location) => {
  let startOption = document.createElement("option");
  startOption.value = location.name;
  startOption.textContent = location.name;
  document.querySelector(".startSelect").appendChild(startOption);

  let goalOption = document.createElement("option");
  goalOption.value = location.name;
  goalOption.textContent = location.name;
  document.querySelector(".goalSelect").appendChild(goalOption);
});

const initialZoom = 1;

document.querySelector(".pathButton").addEventListener("click", () => {
  let startNodeName = document.querySelector(".startSelect").value;
  let goalNodeName = document.querySelector(".goalSelect").value;

  let startNode = schoolGraph.nodes.get(startNodeName);
  let goalNode = schoolGraph.nodes.get(goalNodeName);
  let path = aStar(schoolGraph, startNode, goalNode);

  document.querySelector(".res").innerHTML = path.join(" → ");

  console.log(path);

  const pathLocations = locations.filter((item) => path.includes(item.name));
  const pathCoords = pathLocations.map((item) => item.loc);

  if (polyline) {
    map.removeLayer(polyline);
  }

  polyline = L.polyline(pathCoords, {
    color: "blue",
    weight: 4,
    opacity: 0.7,
    smoothFactor: 1,
  }).addTo(map);


  const currentCenter = map.getCenter();
  const currentZoom = map.getZoom();
  setTimeout(() => {
    map.setView(initialCenter, initialZoom, {
      animate: false,
    });
  }, 100);
});

map.fitBounds(imageBounds);
