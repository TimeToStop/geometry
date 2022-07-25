import { Shape, ShapeType } from "../Shape";

export abstract class Point extends Shape {
  private _x: number = 0;
  private _y: number = 0;
  private _isAnon: boolean = true;
  private _name: string = '';

  constructor() {
    super(ShapeType.POINT);
  }

  protected set x(value: number) {
    this._x = value;
  }

  protected set y(value: number) {
    this._y = value;
  }

  protected set name(value: string) {
    this._name = value;
  }

  setName(name: string): void {
    this._isAnon = false;
    this.name = name;
    this.recount();
  }

  getX(): number {
    return this._x;
  }

  getY(): number {
    return this._y
  }

  isAnon(): boolean {
    return this._isAnon;
  }

  getName(): string {
    return this._name;
  }
}
