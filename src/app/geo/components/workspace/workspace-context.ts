import { ShapeUI } from "../../render/shapes/shape-ui";
import { Shape, ShapeType } from "../../core/shapes/shape";
import { PointUI } from "../../render/shapes/point-ui";
import { Point } from "../../core/shapes/point/point";
import { LineUI } from "../../render/shapes/line-ui";
import { Line } from "../../core/shapes/line/line";

export interface IPoint {
  x: number;
  y: number;
}

export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class WorkspaceContext {
  creation: Map<ShapeType, (shape: Shape) => ShapeUI> = new Map<ShapeType, (shape: Shape) => ShapeUI>();
  shapes: ShapeUI[] = [];

  constructor() {
    this.creation.set(ShapeType.POINT, shape => new PointUI(shape as Point));
    this.creation.set(ShapeType.LINE, shape => new LineUI(shape as Line));
  }

  addShape(shape: Shape): void {
    const { type } = shape.getMeta();
    const creation = this.creation.get(type);

    if (!creation) throw new Error('Not found UI for shape');

    this.shapes.push(creation(shape));
  }

  deleteShape(toDelete: ShapeUI): void {
    this.shapes = this.shapes.filter(shape => shape !== toDelete);
  }

  getTitle(shape: ShapeUI) {
    let name = 'anon';
    const nameControl = shape.getMeta().controls.find(control => control.title === 'Name');

    if (nameControl) {
      name = nameControl.getValue();
    }

    return `${name}{${shape.getMeta().title}}`;
  }
}
