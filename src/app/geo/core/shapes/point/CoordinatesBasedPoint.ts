import { Point } from "./Point";
import { ANON } from "../IShape";

export class CoordinatesBasedPoint extends Point {
  constructor(notify: () => void) {
    super(notify, 'Point');
  }

  calculate(): void {
    // do nothing
  }

  defaultName(): string {
    return ANON;
  }
}
