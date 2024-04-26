import { JSDoc } from "typescript";
import { GraphNode } from "./GraphNode";

const _ = require("lodash");

export class Graph {
  constructor(private adjList: Map<GraphNode, Array<GraphNode>>) {}

  private cpy(
    root: GraphNode | undefined = undefined
  ): Graph | [Graph, GraphNode] {
    const copyMap: Map<GraphNode, GraphNode> = new Map();
    let newRoot: GraphNode | undefined = undefined;

    this.adjList.forEach((_, vtx: GraphNode) => {
      copyMap.set(vtx, vtx.copy());
    });

    const newList: Map<GraphNode, GraphNode[]> = new Map();
    this.adjList.forEach((neighbors: GraphNode[], vtx: GraphNode) => {
      const neighborsList: GraphNode[] = [];

      // Add copy to neighbors
      for (const node of neighbors) {
        const cpy = copyMap.get(node);
        if (cpy === undefined) {
          throw new ReferenceError("Node copy not found!");
        }
        neighborsList.push(cpy);
      }

      const v = copyMap.get(vtx);
      if (v === undefined) {
        throw new ReferenceError("Node copy not found!");
      }
      newList.set(v, neighborsList);

      if (root !== undefined && vtx === root) {
        newRoot = v;
      }
    });
    if (root !== undefined) {
      if (newRoot === undefined) {
        throw new Error("New root should be defined!");
      }
      return [new Graph(newList), newRoot];
    } else {
      return new Graph(newList);
    }
  }

  public copy(): Graph {
    return this.cpy() as Graph;
  }

  public copyWithRoot(root: GraphNode): [Graph, GraphNode] {
    return this.cpy(root) as [Graph, GraphNode];
  }

  public isEqual(other: Graph): boolean {
    const m1: Map<GraphNode, Set<GraphNode>> = new Map();
    const m2: Map<GraphNode, Set<GraphNode>> = new Map();

    this.adjList.forEach((neighbors: GraphNode[], vtx: GraphNode) => {
      m1.set(vtx, new Set(neighbors));
    });

    other.adjList.forEach((neighbors: GraphNode[], vtx: GraphNode) => {
      m2.set(vtx, new Set(neighbors));
    });

    return _.isEqualWith(m1, m2, (value1: any, value2: any, key: string) => {
      return key === "_id" ? true : undefined;
    });
  }

  private findAllVerticesWithLabel(label: string): Array<GraphNode> {
    const filteredVtxs: Array<GraphNode> = [];

    this.adjList.forEach((_, vtx: GraphNode) => {
      if (vtx.label === label) {
        filteredVtxs.push(vtx);
      }
    });

    return filteredVtxs;
  }

  private replaceVtx(old: GraphNode, newRoot: GraphNode, graph: Graph): Graph {
    const newAdjList: Map<GraphNode, GraphNode[]> = new Map();

    // TODO: replace node
    const oldNeighbors = this.adjList.get(old);

    if (oldNeighbors === undefined) {
      throw new Error("Old node not found!");
    }

    // Add all original nodes except for the one to replace
    this.adjList.forEach(
      (
        neighbors: GraphNode[],
        vtx: GraphNode,
        map: Map<GraphNode, GraphNode[]>
      ) => {
        if (vtx !== old) {
          const newNeighbors: GraphNode[] = [];
          neighbors.forEach((node: GraphNode) => {
            if (node !== old) {
              newNeighbors.push(node);
            } else {
              newNeighbors.push(newRoot);
            }
          });
          newAdjList.set(vtx, newNeighbors);
        }
      }
    );

    // Add all new nodes to adjacency list
    graph.adjList.forEach(
      (
        neighbors: GraphNode[],
        vtx: GraphNode,
        map: Map<GraphNode, GraphNode[]>
      ) => {
        if (vtx === newRoot) {
          // Add all non-root nodes to root neighbors
          const newNeighbors: GraphNode[] = [];

          oldNeighbors.forEach((node: GraphNode) => {
            newNeighbors.push(node);
          });

          neighbors.forEach((node: GraphNode) => {
            newNeighbors.push(node);
          });

          newAdjList.set(vtx, newNeighbors);
        } else {
          newAdjList.set(vtx, neighbors);
        }
      }
    );

    return new Graph(newAdjList);
  }

  public replaceVertex(
    old: GraphNode,
    newRoot: GraphNode,
    subgraph: Graph
  ): Graph {
    const [g, v] = this.copyWithRoot(old);
    const [sg, rt] = subgraph.copyWithRoot(newRoot);
    if (rt === undefined || v === undefined) {
      throw new Error("new root should not be undefined!");
    }
    return g.replaceVtx(v, rt, sg);
  }

  public replaceVerticesWithLabel(
    label: string,
    root: GraphNode,
    subgraph: Graph
  ) {
    let newGraph = this.copy();
    const vtxs = newGraph.findAllVerticesWithLabel(label);

    for (const vtx of vtxs) {
      const [sg, rt] = subgraph.copyWithRoot(root);
      if (rt === undefined) {
        throw new Error("new root should not be undefined!");
      }
      newGraph = newGraph.replaceVtx(vtx, rt, sg);
    }
    return newGraph;
  }

  public cytoscapeify() {
    const nodes: Array<any> = [];
    const seenNodes: Set<GraphNode> = new Set();
    const edges: Array<any> = [];

    this.adjList.forEach((neighbors: GraphNode[], vtx: GraphNode) => {
      if (vtx.image) {
        nodes.push({data: { id: vtx.id, label: vtx.label, img: vtx.image }});
      } else {
        nodes.push({data: { id: vtx.id, label: vtx.label }});
      }
      for (const n of neighbors) {
        if (!seenNodes.has(n)) {
          edges.push({data: { source: vtx.id, target: n.id }});
        }
      }
      seenNodes.add(vtx);
    })
    return {nodes, edges};
  }
}
