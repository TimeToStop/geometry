import { IRenderEngine } from "../IRenderEngine";
import { IPoint, IRect } from "../../components/workspace/workspace-context";

export abstract class ShapeUI {
  protected isSelected = false;
  protected color = 'blue';
  protected selectedColor = 'red';

  abstract contains(point: IPoint, scale: (pixels: number) => number): boolean;
  abstract draw(engine: IRenderEngine, viewport: IRect, toPixels: (point: IPoint) => IPoint): void;
  abstract move(diff: IPoint): void;

  setSelection(isSelected: boolean): void {
    this.isSelected = isSelected;
  }
}
