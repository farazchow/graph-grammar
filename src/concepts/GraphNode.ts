import { v4 as uuidv4 } from "uuid";

export class GraphNode {
  private static types: Map<string, ImageBitmap | undefined>;
  private _type: string;
  private _id;

  constructor(type: string) {
    this._type = type;
    this._id = uuidv4();
  }

  public get label(): string {
    return this._type;
  }

  public get image(): ImageBitmap | undefined {
    return GraphNode.types.get(this._type);
  }

  public isEqual(other: GraphNode): boolean {
    return this.label === other.label;
  }

  public deepcopy(): GraphNode {
    const n = new GraphNode(this._type);
    n._id = this._id;
    return n;
  }
}
