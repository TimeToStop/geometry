import { Line } from "./Line";
import { Point } from "../point/Point";

export class TwoPointsLine extends Line {
  private p1: Point;
  private p2: Point;

  constructor(p1: Point, p2: Point, notify: () => void) {
    super(notify);

    this.p1 = p1;
    this.p2 = p2;
  }

  calculate(): void {
    const x1 = this.p1.x, y1 = this.p1.y;
    const x2 = this.p2.x, y2 = this.p2.y;

    this.setANoNotify(y2 - y1);
    this.setBNoNotify(x1 - x2);
    this.setCNoNotify(x2 * y1 - x1 * y2);
  }
}
