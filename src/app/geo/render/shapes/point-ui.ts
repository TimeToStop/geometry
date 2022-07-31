import { ShapeUI } from "./shape-ui";
import { Point } from "../../core/shapes/point/point";
import { IRenderEngine } from "../irender-engine";
import { IPoint, IRect } from "../../components/workspace/workspace-context";

export class PointUI extends ShapeUI {
  private readonly r: number = 5;
  private readonly point: Point;

  constructor(point: Point) {
    super(point);
    this.point = point;
  }

  contains(point: IPoint, scale: (pixels: number) => number): boolean {
    const r = scale(this.r);
    return (point.x - this.point.getX()) * (point.x - this.point.getX()) + (point.y - this.point.getY()) * (point.y - this.point.getY()) <= r * r;
  }

  draw(engine: IRenderEngine, viewport: IRect, toPixels: (point: IPoint) => IPoint): void {
    const { x, y } = toPixels({ x: this.point.getX(), y: this.point.getY() });

    engine.fillEllipse({ x, y, rx: this.r, ry: this.r }, { color: this.getColor() });
  }

  move(diff: IPoint): void {
    const info = this.getMeta();

    const x = info.controls.find(control => control.title === 'X');
    const y = info.controls.find(control => control.title === 'Y');

    if (x && y && x.setValue && y.setValue) {
      const xValue = Number(x.getValue()), yValue = Number(y.getValue());

      x.setValue((xValue + diff.x).toString());
      y.setValue((yValue + diff.y).toString());
    }
  }
}
