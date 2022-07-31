import { IRenderEllipse, IRenderEngine, IRenderLine, IRenderOptions, IRenderRect } from "./irender-engine";

export class CanvasRenderEngine implements IRenderEngine {
  private readonly defaultOptions = {
    color: '#000000'
  } as IRenderOptions;
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  fillRect(rect: IRenderRect, options?: IRenderOptions): void {
    options = this.getOptions(options);

    this.context.fillStyle = options.color;
    this.context.fillRect(rect.p.x, rect.p.y, rect.width, rect.height);
  }

  fillEllipse(ellipse: IRenderEllipse, options?: IRenderOptions): void {
    options = this.getOptions(options);

    this.context.fillStyle = options.color;
    this.context.beginPath();
    this.context.ellipse(ellipse.x, ellipse.y, ellipse.rx, ellipse.ry, 0, 0, 2 * Math.PI, true);
    this.context.fill();
   }

  rect(rect: IRenderRect, options?: IRenderOptions): void {
    options = this.getOptions(options);

    this.context.strokeStyle = options.color;
    this.context.strokeRect(rect.p.x, rect.p.y, rect.width, rect.height);
  }

  line(line: IRenderLine, options?: IRenderOptions): void {
    options = this.getOptions(options);

    this.context.strokeStyle = options.color;
    this.context.beginPath();
    this.context.moveTo(line.p1.x, line.p1.y);
    this.context.lineTo(line.p2.x,  line.p2.y);
    this.context.stroke();
  }

  clear(options?: IRenderOptions): void {
    options = this.getOptions(options);
    const w = this.context.canvas.width, h = this.context.canvas.height;

    this.fillRect({ p: { x: 0, y: 0}, width: w, height: h }, { color: options.color });
  }

  private getOptions(options?: IRenderOptions): IRenderOptions {
    const full = { } as IRenderOptions;

    if (!options) {
      return { ... this.defaultOptions };
    }

    Object.keys(this.defaultOptions).forEach((key) => {
        full[key as keyof IRenderOptions] = options[key as keyof IRenderOptions] || this.defaultOptions[key as keyof IRenderOptions];
    });

    return full;
  }
}
