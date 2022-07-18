import { IShape } from "../IShape";

export abstract class Point extends IShape {
  private _x: number = 0;
  private _y: number = 0;

  private readonly notify: () => void;

  constructor(notify: () => void, title: string) {
    super(title);
    this.notify = notify;
  }

  set x(value: number) {
    this._x = value;
    this.notify();
  }

  set y(value: number) {
    this._y = value;
    this.notify();
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y
  }

  protected setXNoNotify(x: number): void {
    this._x = x;
  }

  protected setYNoNotify(y: number): void {
    this._y = y;
  }
}
