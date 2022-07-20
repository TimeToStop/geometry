import { Point } from "./Point";
import { IMeta } from "../IShape";

export class CoordinatesBasedPoint extends Point {
  calculate(): void {
    // do nothing
  }

  meta(): IMeta {
    return {
      controls: [
        {
          isReadOnly: false,
          title: 'X',
          isValid: value => !isNaN(Number(value)),
          setValue: value => this.setX(Number(value)),
          getValue: () => this.getX().toString()
        },
        {
          isReadOnly: false,
          title: 'Y',
          isValid: value => !isNaN(Number(value)),
          setValue: value => this.setY(Number(value)),
          getValue: () => this.getY().toString()
        },
        {
          isReadOnly: false,
          title: 'Name',
          isValid: value => value.length !== 0,
          setValue: value => this.name = value,
          getValue: () => this.getName()
        }
      ],
      deps: [],
      title: "Point"
    };
  }

  setX(x: number): void {
    this.x = x;
    this.notify();
  }

  setY(y: number): void {
    this.y = y;
    this.notify();
  }

  setPoint(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.notify();
  }
}
