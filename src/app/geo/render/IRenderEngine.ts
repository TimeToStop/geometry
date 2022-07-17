export interface IRenderOptions {
  color: string;
}

export interface IRenderEllipse {
  x: number;
  y: number;
  rx: number;
  ry: number;
}

export interface IRenderPoint {
  x: number;
  y: number;
}

export interface IRenderLine {
  p1: IRenderPoint;
  p2: IRenderPoint;
}

export interface IRenderRect {
  p: IRenderPoint;
  width: number;
  height: number;
}

export interface IRenderEngine {
  fillRect(rect: IRenderRect, options?: IRenderOptions): void;
  fillEllipse(ellipse: IRenderEllipse, options?: IRenderOptions): void;
  rect(rect: IRenderRect, options?: IRenderOptions): void;
  line(line: IRenderLine, options?: IRenderOptions): void;
  clear(): void;
}
