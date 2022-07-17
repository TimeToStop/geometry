import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IRenderEngine } from "../../render/IRenderEngine";
import { CanvasRenderEngine } from "../../render/CanvasRenderEngine";

export interface ISize {
  width: number;
  height: number;
}

@Component({
  selector: 'geo-render-engine',
  templateUrl: './render-engine.component.html',
  styleUrls: ['./render-engine.component.css']
})
export class RenderEngineComponent implements OnInit {
  @Output()
  resizeEvent = new EventEmitter<ISize>();

  @Output()
  renderEngineCreated = new EventEmitter<IRenderEngine>();

  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;

  private renderEngine: IRenderEngine;

  ngOnInit(): void {
    const context = this.canvas?.nativeElement?.getContext && this.canvas.nativeElement.getContext('2d');

    if (!context) throw new Error('Failed to get context from canvas');

    this.renderEngine = new CanvasRenderEngine(context);
    this.renderEngineCreated.emit(this.renderEngine);
    this.onResize();
  }

  onResize(): void {
    this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight;
    this.resizeEvent.emit({ width: this.canvas.nativeElement.width, height: this.canvas.nativeElement.height});
  }
}
