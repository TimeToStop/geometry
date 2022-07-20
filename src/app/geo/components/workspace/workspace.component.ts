import {Component, HostListener, Input, OnChanges} from '@angular/core';
import { IRenderEngine } from "../../render/IRenderEngine";
import { IPoint, IRect, WorkspaceContext} from "./workspace-context";
import { ISize } from "../render-engine/render-engine.component";
import {ShapeUI} from "../../render/shapes/ShapeUI";

@Component({
  selector: 'geo-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnChanges {

  @Input()
  context: WorkspaceContext;

  private readonly LEFT_MOUSE_BUTTON = 0;

  private isDragging = false;
  private isLeftMouseButtonClicked = false;
  private mouseHasMovedBetweenClicks = false;

  private dragged: ShapeUI;

  private scale: number = 0.02;
  private currentSize: ISize = { width: 0, height: 0 };
  private start: IPoint = { x: 0, y: 0};
  private viewport: IRect;

  private renderEngine: IRenderEngine;

  ngOnChanges(): void {
    this.draw();
  }

  setRenderEngine(engine: IRenderEngine): void {
    this.renderEngine = engine;
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (event.button === this.LEFT_MOUSE_BUTTON) {
      this.isLeftMouseButtonClicked = true;
      this.mouseHasMovedBetweenClicks = false;

      const p = this.fromPixels({ x: event.clientX, y: event.clientY });

      const dragged = this.context.shapes.find(shape => shape.contains(p, (pixels) => this.scale * pixels));

      if (dragged) {
        this.isDragging = true;
        this.dragged = dragged;
      }
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isLeftMouseButtonClicked) {
      this.mouseHasMovedBetweenClicks = true;

      if (this.isDragging) {
        this.dragged.move({ x: event.movementX * this.scale, y: -event.movementY * this.scale });
      } else {
        this.start.x += event.movementX;
        this.start.y += event.movementY;
      }

      this.updateViewport();
      this.draw();
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (event.button === this.LEFT_MOUSE_BUTTON) {
        this.isLeftMouseButtonClicked = false;
        this.isDragging = false;

        if (!this.mouseHasMovedBetweenClicks) {
          const p = this.fromPixels({ x: event.clientX, y: event.clientY });

          this.context.shapes.forEach(shape => {
            const isSelected = shape.contains(p, (pixels) => this.scale * pixels);

            shape.setSelection(isSelected);
          });

          this.draw();
        }
    }
  }

  onResizeEvent(size: ISize) {
    this.start = { x: this.start.x + (size.width - this.currentSize.width) / 2, y: this.start.y + (size.height - this.currentSize.height) / 2 };
    this.currentSize = size;

    this.updateViewport();
    this.draw();
  }

  draw(): void {
    if (!this.renderEngine) return;

    this.renderEngine.clear({ color: '#F6F6F6' });
    this.context.shapes.forEach(shape => shape.draw(this.renderEngine, this.viewport, (point) => this.toPixels(point)));
  }

  updateViewport(): void {
    const leftTop = this.fromPixels({ x: 0, y: 0 });
    const rightBottom = this.fromPixels({ x: this.currentSize.width, y: this.currentSize.height });
    this.viewport = { x: leftTop.x, y: leftTop.y, width: rightBottom.x - leftTop.x, height: rightBottom.y - leftTop.y };
  }

  toPixels(p: IPoint): IPoint {
    return {
      x: this.start.x + p.x / this.scale,
      y: this.start.y - p.y / this.scale
    } as IPoint;
  }

  fromPixels(p: IPoint): IPoint {
    return {
      x: (p.x - this.start.x) * this.scale,
      y: -(p.y - this.start.y) * this.scale
    } as IPoint;
  }
}
