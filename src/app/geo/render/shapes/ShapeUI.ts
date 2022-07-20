import { IRenderEngine } from "../IRenderEngine";
import { IPoint, IRect } from "../../components/workspace/workspace-context";
import {IMeta, IShape} from "../../core/shapes/IShape";

export abstract class ShapeUI {
  private isSelected = false;
  private color = 'blue';
  private selectedColor = 'red';

  private shape: IShape;

  constructor(shape: IShape) {
    this.shape = shape;
  }

  abstract contains(point: IPoint, scale: (pixels: number) => number): boolean;
  abstract draw(engine: IRenderEngine, viewport: IRect, toPixels: (point: IPoint) => IPoint): void;
  abstract move(diff: IPoint): void;

  getMeta(): IMeta {
    return this.shape.meta();
  }

  setSelection(isSelected: boolean): void {
    this.isSelected = isSelected;
  }

  getColor(): string {
    return this.isSelected ? this.selectedColor : this.color;
  }
}
