import { IShape } from "../IShape";

export abstract class Line extends IShape {
  private _a: number = 0;
  private _b: number = 0;
  private _c: number = 0;

  private readonly notify: () => void;

  constructor(notify: () => void, title: string) {
    super(title);
    this.notify = notify;
  }

  set a(value: number) {
    this._a = value;
    this.notify();
  }

  set b(value: number) {
    this._b = value;
    this.notify();
  }

  set c(value: number) {
    this._c = value;
    this.notify();
  }

  get a(): number {
    return this._a;
  }

  get b(): number {
    return this._b
  }

  get c(): number {
    return this._c;
  }

  protected setANoNotify(a: number): void {
    this._a = a;
  }

  protected setBNoNotify(b: number): void {
    this._b = b;
  }

  protected setCNoNotify(c: number): void {
    this._c = c;
  }
}
