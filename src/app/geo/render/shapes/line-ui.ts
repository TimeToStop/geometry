import { ShapeUI } from "./shape-ui";
import { IRenderEngine } from "../irender-engine";
import { IPoint, IRect } from "../../components/workspace/workspace-context";
import { Line } from "../../core/shapes/line/line";

export class LineUI extends ShapeUI {
  private readonly width: number = 2;
  private readonly line: Line;

  constructor(line: Line) {
    super(line);
    this.line = line;
  }

  contains(point: IPoint, scale: (pixels: number) => number): boolean {
    const a = this.line.getA(), b = this.line.getB(), c = this.line.getC();
    const w = scale(this.width);

    return Math.abs(a * point.x + b * point.y + c) / Math.sqrt(a * a + b * b) <= w;
  }

  draw(engine: IRenderEngine, viewport: IRect, toPixels: (point: IPoint) => IPoint): void {
    const a = this.line.getA(), b = this.line.getB(), c = this.line.getC();
    const lx = viewport.x, rx = viewport.x + viewport.width;
    const ly = - (a * lx + c) / b, ry = - (a * rx + c) / b;
    const { x: lxp, y: lyp } = toPixels({ x: lx, y: ly });
    const { x: rxp, y: ryp } = toPixels({ x: rx, y: ry });

    engine.line({ p1: { x: lxp, y: lyp }, p2: { x: rxp, y: ryp } }, { color: this.getColor() });
  }

  move(diff: IPoint): void {
    // no implementation here for now
    // points based line does not move
  }
}
