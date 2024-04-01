function parseGraphString(
  nodeMap: Map<string, number>,
  oldRoot: string,
  newRoot: string,
  probability: number,
  graphString: string
) {
  graphString = graphString.trim().slice(1, -1);
  const parsingList = graphString
    .split(/(?:\)\s?,\s?)|\(|\)/)
    .filter((value: string) => value !== "");

  console.log(parsingList);
  return [oldRoot, newRoot, probability];
}

const testString = "[(d_1, b_1), (b_1, c_1)]";
const oldRoot = "a";
const newRoot = "b";
const probability = 0.36;
let testNodeMap: Map<string, number> = new Map<string, number>([
  ["a", 3],
  ["b", 4],
]);
console.log(
  parseGraphString(testNodeMap, oldRoot, newRoot, probability, testString)
);

export {};
