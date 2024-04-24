import { GraphNode } from "../../concepts/GraphNode";
import { Graph } from "../../concepts/Graph";
import { Rule } from "../../concepts/Rule";

const _ = require('lodash');

describe('test graph deepcopy', () => {
    test('a-b', () => {
      const adjList = new Map();
      const a = new GraphNode("a");
      const b = new GraphNode("b");
      adjList.set(a, [b]);
      adjList.set(b, [a]);
      const graph = new Graph(adjList);

      const deep = graph.copy();
      expect(graph.isEqual(deep)).toBe(true);
    });
  });

  describe('test graph vertex replacement', () => {
    test('a-b [b => c-d] => a-c-d', () => {
      const adjList = new Map();

      const a = new GraphNode("a");
      const b = new GraphNode("b");

      adjList.set(a, [b]);
      adjList.set(b, [a]);

      const graph = new Graph(adjList);

      const mini = new Map();
      const c = new GraphNode("c");
      const d = new GraphNode("d");
      mini.set(c, [d]);
      mini.set(d, [c]);
      const subGraph = new Graph(mini);
      const newGraph = graph.replaceVertex(b, c, subGraph);

      const adj2 = new Map();
      const a2 = new GraphNode("a");
      const c2 = new GraphNode("c");
      const d2 = new GraphNode("d");
      adj2.set(a2, [c2]);
      adj2.set(c2, [a2, d2]);
      adj2.set(d2, [c2]);
      const expected = new Graph(adj2);

      expect(newGraph.isEqual(expected)).toBe(true);
    //   expect(graph).toBe(0);
    });
  });

  describe("test rule application", () => {
    test("b-a-b [b => c-d] => d-c-a-c-d", () => {

      const mini = new Map();
      const c = new GraphNode("c");
      const d = new GraphNode("d");
      mini.set(c, [d]);
      mini.set(d, [c]);
      const subGraph = new Graph(mini);

      const rule = new Rule("b", c, subGraph);

      const adjList = new Map();
      const b1 = new GraphNode("b");
      const a = new GraphNode("a");
      const b2 = new GraphNode("b");
      adjList.set(b1, [a]);
      adjList.set(a, [b1, b2]);
      adjList.set(b2, [a]);

      // console.log(adjList);

      const graph = new Graph(adjList);

      const newGraph = rule.applyAll(graph);

      const adj2 = new Map();
      const a2 = new GraphNode("a");
      const c2 = new GraphNode("c");
      const d2 = new GraphNode("d");
      const c3 = new GraphNode("c");
      const d3 = new GraphNode("d");
      adj2.set(d3, [c3]);
      adj2.set(c3, [d3, a2]);
      adj2.set(a2, [c2, c3]);
      adj2.set(c2, [a2,d2]);
      adj2.set(d2, [c2]);
      const expected = new Graph(adj2);

      console.log(newGraph);

      expect(newGraph.isEqual(expected)).toBe(true);
    })
  });