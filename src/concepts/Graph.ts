import { GraphNode } from "./GraphNode";

const _ = require('lodash');

export class Graph {
  constructor(private adjList: Map<GraphNode, Set<GraphNode>>) {}

  public copy(root: GraphNode | undefined = undefined): [Graph, GraphNode | undefined] {

    const copyMap: Map<GraphNode, GraphNode> = new Map();
    let newRoot: GraphNode | undefined = undefined;

    this.adjList.forEach((_, vtx: GraphNode) => {
      copyMap.set(vtx, vtx.copy());
    })

    const newList: Map<GraphNode, Set<GraphNode>> = new Map();
    this.adjList.forEach(
      (
        neighbors: Set<GraphNode>,
        vtx: GraphNode,
      ) => {
        const neighborsList: Set<GraphNode> = new Set();
        neighbors.forEach((node: GraphNode) => {
            const cpy = copyMap.get(node);
            if (cpy === undefined) {
              throw new ReferenceError("Node copy not found!")
            }
            neighborsList.add(cpy);
        })
        const v = copyMap.get(vtx);
        if (v === undefined) {
          throw new ReferenceError("Node copy not found!")
        }
        newList.set(v, neighborsList);

        if (vtx === root) {
          newRoot = v;
        }
      }
    );
    return [new Graph(newList), newRoot];
  }

  public isEqual(other: Graph): boolean {
    return _.isEqualWith(this.adjList, other.adjList, (value1: any, value2: any, key: string) => {
        return key === "_id" ? true : undefined;
    });
  }

  private findAllVerticesWithLabel(label: string): Array<GraphNode> {
    const filteredVtxs: Array<GraphNode> = [];

    this.adjList.forEach((_, vtx: GraphNode) => {
      if (vtx.label === label) {
        filteredVtxs.push(vtx);
      }
    })

    return filteredVtxs;
  }

  public replaceVertex(
    old: GraphNode,
    newRoot: GraphNode,
    graph: Graph
  ): Graph {
    const newAdjList: Map<GraphNode, Set<GraphNode>> = new Map();

    // TODO: replace node
    const oldNeighbors = this.adjList.get(old);

    if (oldNeighbors === undefined) {
      throw new Error("Old node not found!");
    }

    // Add all original nodes except for the one to replace
    this.adjList.forEach(
      (
        neighbors: Set<GraphNode>,
        vtx: GraphNode,
        map: Map<GraphNode, Set<GraphNode>>
      ) => {
        if (vtx !== old) {
          const newNeighbors: Set<GraphNode> = new Set();
          neighbors.forEach((node: GraphNode) => {
            if (node !== old) {
                newNeighbors.add(node);
            } else {
                newNeighbors.add(newRoot);
            }
          })
          newAdjList.set(vtx, newNeighbors);
        }
      }
    );

    // Add all new nodes to adjacency list
    graph
      .adjList
      .forEach(
        (
          neighbors: Set<GraphNode>,
          vtx: GraphNode,
          map: Map<GraphNode, Set<GraphNode>>
        ) => {
          if (vtx === newRoot) {
            // Add all non-root nodes to root neighbors
            const newNeighbors: Set<GraphNode> = new Set();

            oldNeighbors.forEach((node: GraphNode) => {
                newNeighbors.add(node);
            })

            neighbors.forEach((node: GraphNode) => {
                newNeighbors.add(node);
            })

            newAdjList.set(vtx, newNeighbors);
          } else {
            newAdjList.set(vtx, neighbors);
          }
        }
      );

    return new Graph(newAdjList);
  }

  public replaceVerticesWithLabel(label: string, root: GraphNode, subgraph: Graph) {
    let [newGraph, _] = this.copy();
    const vtxs = newGraph.findAllVerticesWithLabel(label);

    for (const vtx of vtxs) {
      const [sg, rt] = subgraph.copy(root);
      if (rt === undefined) {
        throw new Error("new root should not be undefined!");
      }
      newGraph = newGraph.replaceVertex(vtx, rt, sg);
    }
    return newGraph;
  }
}
