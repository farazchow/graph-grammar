export class GraphNode {
  private static types: Map<string, ImageBitmap | undefined>;
  private _type: string;

  constructor(type: string) {
    this._type = type;
  }

  public get label() {
    return this._type;
  }

  public get image() {
    return GraphNode.types.get(this._type);
  }

  public deepcopy() {
    return new GraphNode(this._type);
  }
}
