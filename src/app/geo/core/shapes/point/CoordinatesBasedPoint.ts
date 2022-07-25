import { Point } from "./Point";
import {IMetaInfo, IShapeInfo, ShapeType} from "../Shape";

export class CoordinatesBasedPoint extends Point {

  calculate(): void {
    // do nothing
  }

  meta(): IShapeInfo {
    return {
      title: "Point",
      controls: [
        {
          isReadOnly: false,
          title: 'X',
          isValid: (value: string) => !isNaN(Number(value)),
          setValue: (value: string) => this.setX(Number(value)),
          getValue: () => this.getX().toString()
        },
        {
          isReadOnly: false,
          title: 'Y',
          isValid: (value: string) => !isNaN(Number(value)),
          setValue: (value: string) => this.setY(Number(value)),
          getValue: () => this.getY().toString()
        },
        {
          isReadOnly: false,
          title: 'Name',
          isValid: (value: string) => value.length !== 0,
          setValue: (value: string) => this.setName(value),
          getValue: () => this.getName()
        }
      ],
      deps: []
    };
  }

  setX(x: number): void {
    this.x = x;
    this.recount();
  }

  setY(y: number): void {
    this.y = y;
    this.recount();
  }

  setPoint(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.recount();
  }
}
