import { GraphNode } from "./GraphNode";

const _ = require('lodash');

export class Graph {
  constructor(private adjList: Map<GraphNode, Set<GraphNode>>) {}

  public deepcopy(): Graph {
    const newList: Map<GraphNode, Set<GraphNode>> = new Map();
    this.adjList.forEach(
      (
        neighbors: Set<GraphNode>,
        vtx: GraphNode,
        map: Map<GraphNode, Set<GraphNode>>
      ) => {
        const neighborsList: Set<GraphNode> = new Set();
        neighbors.forEach((node: GraphNode) => {
            neighborsList.add(node.deepcopy());
        })
        newList.set(vtx.deepcopy(), neighborsList);
      }
    );
    return new Graph(newList);
  }


  public isEqual(other: Graph): boolean {
    return _.isEqualWith(this.adjList, other.adjList, (value1: any, value2: any, key: string) => {
        return key === "_id" ? true : undefined;
    });
  }

//   public isEqual(other: Graph): boolean {
//     let allEq = this.adjList.size === other.adjList.size;
//     if (allEq === false) {
//         return false;
//     }

//     this.adjList.forEach((neighbors: Set<GraphNode>, vtx: GraphNode) => {
//         for (const neighbor of neighbors) {
//             if (neighbor.isEqual()) {

//             }
//         }
//     })
//   }

  public replace_vertex(
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
                newNeighbors.add(node.deepcopy());
            } else {
                newNeighbors.add(newRoot.deepcopy());
            }
          })
          newAdjList.set(vtx.deepcopy(), newNeighbors);
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
                newNeighbors.add(node.deepcopy());
            })

            neighbors.forEach((node: GraphNode) => {
                newNeighbors.add(node.deepcopy());
            })

            newAdjList.set(vtx.deepcopy(), newNeighbors);
          } else {
            newAdjList.set(vtx.deepcopy(), neighbors);
          }
        }
      );

    return new Graph(newAdjList);
  }
}
