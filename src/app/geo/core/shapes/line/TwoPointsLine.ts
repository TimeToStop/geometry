import { Line } from "./Line";
import { Point } from "../point/Point";
import { IMeta } from "../IShape";

export class TwoPointsLine extends Line {
  private readonly p1: Point;
  private readonly p2: Point;

  constructor(p1: Point, p2: Point, notify: () => void) {
    super(notify);

    this.p1 = p1;
    this.p2 = p2;
  }

  calculate(): void {
    const x1 = this.p1.getX(), y1 = this.p1.getY();
    const x2 = this.p2.getX(), y2 = this.p2.getY();

    this.a = y2 - y1;
    this.b = x1 - x2;
    this.c = x2 * y1 - x1 * y2;

    if (!this.isAnon()) return;

    if (this.p1.isAnon() || this.p2.isAnon()) return;

    this.name = this.p1.getName() + this.p2.getName();
  }


  meta(): IMeta {
    return {
      controls: [
        {
          isReadOnly: false,
          title: 'Name',
          isValid: (value) => value.length !== 0,
          setValue: (value) => this.name = value,
          getValue: () => this.getName()
        },
        {
          isReadOnly: true,
          title: 'Equation',
          getValue: () => `${this.getA()} * x + ${this.getB()} * y + ${this.getC()} = 0`
        }
      ],
      deps: [ this.p1, this.p2 ],
      title: "Line"
    };
  }
}
