import { GraphNode } from "./GraphNode";

export class Graph {
  constructor(private adjList: Map<GraphNode, Array<GraphNode>>) {}

  public deepcopy(): Graph {
    const newList: Map<GraphNode, Array<GraphNode>> = new Map();
    this.adjList.forEach(
      (
        neighbors: Array<GraphNode>,
        vtx: GraphNode,
        map: Map<GraphNode, Array<GraphNode>>
      ) => {
        const neighborsList: Array<GraphNode> = [];
        for (const node of neighbors) {
          neighborsList.push(node.deepcopy());
        }
        newList.set(vtx.deepcopy(), neighborsList);
      }
    );
    return new Graph(newList);
  }

  private getAdjList(): Map<GraphNode, Array<GraphNode>> {
    return this.adjList;
  }

  public replace_vertex(
    old: GraphNode,
    newRoot: GraphNode,
    graph: Graph
  ): Graph {
    const newAdjList: Map<GraphNode, Array<GraphNode>> = new Map();

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
        map: Map<GraphNode, Array<GraphNode>>
      ) => {
        if (vtx !== old) {
          newAdjList.set(vtx, neighbors);
        }
      }
    );

    // Add all new nodes to adjacency list
    graph
      .getAdjList()
      .forEach(
        (
          neighbors: GraphNode[],
          vtx: GraphNode,
          map: Map<GraphNode, Array<GraphNode>>
        ) => {
          if (vtx === newRoot) {
            // Add all non-root nodes to root neighbors
            const newNeighbors: Array<GraphNode> =
              oldNeighbors.concat(neighbors);
            newAdjList.set(vtx, newNeighbors);
          } else {
            newAdjList.set(vtx, neighbors);
          }
        }
      );

    return new Graph(newAdjList);
  }
}
