import { IRenderEngine } from "../IRenderEngine";
import { IPoint, IRect } from "../../components/workspace/workspace-context";
import { IShape } from "../../core/shapes/IShape";

export abstract class ShapeUI {
  protected isSelected = false;
  protected color = 'blue';
  protected selectedColor = 'red';

  private shape: IShape;

  constructor(shape: IShape) {
    this.shape = shape;
  }

  abstract contains(point: IPoint, scale: (pixels: number) => number): boolean;
  abstract draw(engine: IRenderEngine, viewport: IRect, toPixels: (point: IPoint) => IPoint): void;
  abstract move(diff: IPoint): void;

  getName(): string {
    return this.shape.getName();
  }

  getTitle(): string {
    return this.shape.getTitle();
  }

  setSelection(isSelected: boolean): void {
    this.isSelected = isSelected;
  }
}
