import { IShape } from "./IShape";

enum RecountState {
  READY,
  RECOUNTING
}

export class ShapeContainer {
  private state: RecountState;
  private shape: IShape;
  private readonly deps: ShapeContainer[];
  private readonly callbacks: (() => void)[] = [];

  constructor(deps: ShapeContainer[]) {
    this.state = RecountState.READY;
    this.deps = deps;
    this.deps.forEach(dep => dep.onRecountReady(() => this.shape.calculate()));
  }

  setShape(shape: IShape): void {
    this.shape = shape;
  }

  recount(): void {
    if (this.state !== RecountState.READY) throw new Error('Circular dependency detected');

    this.state = RecountState.RECOUNTING;

    this.shape.calculate();
    this.callbacks.forEach(call => call());

    this.state = RecountState.READY;
  }

  onRecountReady(call: () => void) {
    this.callbacks.push(call);
  }
}
