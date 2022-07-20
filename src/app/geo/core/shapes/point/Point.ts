import { IMeta, IShape } from "../IShape";

export abstract class Point implements IShape {
  private _x: number = 0;
  private _y: number = 0;
  private _isAnon: boolean = true;
  private _name: string = '';

  protected readonly notify: () => void;

  constructor(notify: () => void) {
    this.notify = notify;
  }

  abstract calculate(): void;
  abstract meta(): IMeta;

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
    this.notify();
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
