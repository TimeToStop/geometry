import {IMeta, IShape} from "../IShape";

export abstract class Line implements IShape {
  private _a: number = 0;
  private _b: number = 0;
  private _c: number = 0;
  private _isAnon: boolean = true;
  private _name: string = '';

  private readonly notify: () => void;

  constructor(notify: () => void) {
    this.notify = notify;
  }

  abstract calculate(): void;
  abstract meta(): IMeta;

  protected set a(value: number) {
    this._a = value;
  }

  protected set b(value: number) {
    this._b = value;
  }

  protected set c(value: number) {
    this._c = value;
  }

  protected set name(value: string) {
    this._name = value;
  }

  setName(name: string): void {
    this._isAnon = false;
    this.name = name;
    this.notify();
  }

  getA(): number {
    return this._a;
  }

  getB(): number {
    return this._b
  }

  getC(): number {
    return this._c;
  }

  isAnon(): boolean {
    return this._isAnon;
  }

  getName(): string {
    return this._name;
  }
}
