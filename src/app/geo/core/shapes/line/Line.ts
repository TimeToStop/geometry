import {Shape, ShapeType} from "../Shape";

export abstract class Line extends Shape {
  private _a: number = 0;
  private _b: number = 0;
  private _c: number = 0;
  private _isAnon: boolean = true;
  private _name: string = '';

  constructor() {
    super(ShapeType.LINE);
  }

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
    this.recount();
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
