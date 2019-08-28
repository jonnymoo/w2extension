// An object which represents a w2 file item (e.g. class, method etc)
export class W2Item {
  private _label: string;
  private _type: string;

  // Creates a new instance of w2 document
  constructor(label: string, type: string) {
    this._label = label;
    this._type = type;
  }

  public get label(): string {
    return this._label;
  }

  public get type(): string {
    return this._type;
  }
}
