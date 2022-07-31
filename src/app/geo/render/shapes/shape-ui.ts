import { IRenderEngine } from "../irender-engine";
import { IPoint, IRect } from "../../components/workspace/workspace-context";
import { IMetaInfo, Shape } from "../../core/shapes/shape";

export abstract class ShapeUI {
  private isSelected = false;
  private color = 'blue';
  private selectedColor = 'red';

  private readonly shape: Shape;

  constructor(shape: Shape) {
    this.shape = shape;
  }

  abstract contains(point: IPoint, scale: (pixels: number) => number): boolean;
  abstract draw(engine: IRenderEngine, viewport: IRect, toPixels: (point: IPoint) => IPoint): void;
  abstract move(diff: IPoint): void;

  getMeta(): IMetaInfo {
    return this.shape.getMeta();
  }

  getShape(): Shape {
    return this.shape;
  }

  setSelection(isSelected: boolean): void {
    this.isSelected = isSelected;
  }

  getColor(): string {
    return this.isSelected ? this.selectedColor : this.color;
  }
}
