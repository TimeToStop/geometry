import { ShapeUI } from "../../render/shapes/ShapeUI";

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
  shapes: ShapeUI[];
}
