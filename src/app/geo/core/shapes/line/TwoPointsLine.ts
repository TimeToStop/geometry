import { Line } from "./Line";
import { Point } from "../point/Point";
import {IMetaInfo, IShapeInfo, Shape, ShapeType} from "../Shape";

export class TwoPointsLine extends Line {
  private _p1: Point;
  private _p2: Point;

  set p1(value: Point) {
    this.setUpDependency(value, this._p1);
    this._p1 = value;
    this.recount();
  }

  set p2(value: Point) {
    this.setUpDependency(value, this._p2);
    this._p2 = value;
    this.recount();
  }

  get p1(): Point {
    return this._p1;
  }

  get p2(): Point {
    return this._p2;
  }

  calculate(): void {
    if (!this.p1 || !this.p2) return;

    const x1 = this.p1.getX(), y1 = this.p1.getY();
    const x2 = this.p2.getX(), y2 = this.p2.getY();

    this.a = y2 - y1;
    this.b = x1 - x2;
    this.c = x2 * y1 - x1 * y2;

    if (!this.isAnon()) return;

    if (this.p1.isAnon() || this.p2.isAnon()) return;

    this.name = this.p1.getName() + this.p2.getName();
  }


  meta(): IShapeInfo {
    return {
      title: "Line",
      controls: [
        {
          isReadOnly: false,
          title: 'Name',
          isValid: (value: string) => value.length !== 0,
          setValue: (value: string) => this.setName(value),
          getValue: () => this.getName()
        },
        {
          isReadOnly: true,
          title: 'Equation',
          getValue: () => `${this.getA()} * x + ${this.getB()} * y + ${this.getC()} = 0`
        }
      ],
      deps: [
        {
          title: 'P1',
          type: ShapeType.POINT,
          getValue: () => this.p1,
          setValue: (value: Shape) => {
            if (value.getMeta().type !== ShapeType.POINT) throw new Error('Expected type Point');

            this.p1 = value as Point;
          }
        },
        {
          title: 'P2',
          type: ShapeType.POINT,
          getValue: () => this.p2,
          setValue: (value: Shape) => {
            if (value.getMeta().type !== ShapeType.POINT) throw new Error('Expected type Point');

            this.p2 = value as Point;
          }
        }
      ]
    };
  }
}
