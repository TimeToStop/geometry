import { ShapeUI } from "./ShapeUI";
import { Point } from "../../core/shapes/point/Point";
import { IRenderEngine } from "../IRenderEngine";
import { IPoint, IRect } from "../../components/workspace/workspace-context";

export class PointUI extends ShapeUI {
  private readonly r: number = 5;
  private point: Point;

  constructor(point: Point) {
    super();
    this.point = point;
  }

  contains(point: IPoint, scale: (pixels: number) => number): boolean {
    const r = scale(this.r);
    return (point.x - this.point.x) * (point.x - this.point.x) + (point.y - this.point.y) * (point.y - this.point.y) <= r * r;
  }

  draw(engine: IRenderEngine, viewport: IRect, toPixels: (point: IPoint) => IPoint): void {
    const { x, y } = toPixels({ x: this.point.x, y: this.point.y });

    engine.fillEllipse({ x, y, rx: this.r, ry: this.r }, { color: this.isSelected ? this.selectedColor : this.color });
  }

  move(diff: IPoint): void {
    this.point.x += diff.x;
    this.point.y += diff.y;
  }
}
