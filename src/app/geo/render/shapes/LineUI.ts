import { ShapeUI } from "./ShapeUI";
import { IRenderEngine } from "../IRenderEngine";
import { IPoint, IRect } from "../../components/workspace/workspace-context";
import { Line } from "../../core/shapes/line/Line";

export class LineUI extends ShapeUI {
  private readonly width: number = 2;
  private line: Line;

  constructor(line: Line) {
    super();
    this.line = line;
  }

  contains(point: IPoint, scale: (pixels: number) => number): boolean {
    const a = this.line.a, b = this.line.b, c = this.line.c;
    const w = scale(this.width);

    return Math.abs(a * point.x + b * point.y + c) / Math.sqrt(a * a + b * b) <= w;
  }

  draw(engine: IRenderEngine, viewport: IRect, toPixels: (point: IPoint) => IPoint): void {
    const a = this.line.a, b = this.line.b, c = this.line.c;
    const lx = viewport.x, rx = viewport.x + viewport.width;
    const ly = - (a * lx + c) / b, ry = - (a * rx + c) / b;
    const { x: lxp, y: lyp } = toPixels({ x: lx, y: ly });
    const { x: rxp, y: ryp } = toPixels({ x: rx, y: ry });

    engine.line({ p1: { x: lxp, y: lyp }, p2: { x: rxp, y: ryp } }, { color: this.isSelected ? this.selectedColor : this.color });
  }

  move(diff: IPoint): void {
    // no implementation here for now
    // points based line does not move
  }
}
