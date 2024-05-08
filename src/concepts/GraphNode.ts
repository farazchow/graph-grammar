import { v4 as uuidv4 } from "uuid";

export class GraphNode {
  private _type: string;
  private _id: string;

  constructor(type: string) {
    this._type = type;
    this._id = uuidv4();
  }

  public get id(): string {
    return this._id;
  }

  public get label(): string {
    return this._type;
  }

  public isEqual(other: GraphNode): boolean {
    return this.label === other.label;
  }

  public copy(): GraphNode {
    const n = new GraphNode(this._type);
    return n;
  }
}
