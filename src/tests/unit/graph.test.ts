import { GraphNode } from "../../concepts/GraphNode";
import { Graph } from "../../concepts/Graph";

const _ = require('lodash');

describe('test graph deepcopy', () => {
    test('a-b', () => {
      const adjList = new Map();
      const a = new GraphNode("a");
      const b = new GraphNode("b");
      adjList.set(a, new Set([a]));
      adjList.set(b, new Set([b]));
      const graph = new Graph(adjList);

      const deep = graph.deepcopy();
      expect(_.isEqual(graph, deep)).toBe(true);
    });
  });

  describe('test graph vertex replacement', () => {
    test('a-b [b => c-d] => a-c-d', () => {
      const adjList = new Map();

      const a = new GraphNode("a");
      const b = new GraphNode("b");

      adjList.set(a, new Set([b]));
      adjList.set(b, new Set([a]));

      const graph = new Graph(adjList);

      const mini = new Map();
      const c = new GraphNode("c");
      const d = new GraphNode("d");
      mini.set(c, new Set([d]));
      mini.set(d, new Set([c]));
      const subGraph = new Graph(mini);
      const newGraph = graph.replace_vertex(b, c, subGraph);

      const adj2 = new Map();
      const a2 = new GraphNode("a");
      const c2 = new GraphNode("c");
      const d2 = new GraphNode("d");
      adj2.set(a2, new Set([c2]));
      adj2.set(c2, new Set([a2,d2]));
      adj2.set(d2, new Set([c2]));
      const expected = new Graph(adj2);

      expect(newGraph.isEqual(expected)).toBe(true);
    //   expect(graph).toBe(0);
    });
  });