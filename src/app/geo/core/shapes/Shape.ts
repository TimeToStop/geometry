export enum ShapeType {
  POINT,
  LINE
}

export interface IControl {
  isReadOnly: boolean;
  title: string;

  getValue: () => string;

  isValid?: (value: string) => boolean;
  setValue?: (value: string) => void;
}

export interface IShapeDependency {
  title: string;
  type: ShapeType;

  getValue(): Shape;
  setValue(value: Shape): void;
}

export interface IShapeInfo {
  title: string;
  controls: IControl[];
  deps: IShapeDependency[];
}

export interface IMetaInfo {
  id: number;
  type: ShapeType;
  title: string;
  controls: IControl[];
  deps: IShapeDependency[];
  onChange: (callback: () => void) => (() => void)
}

enum RecountState {
  READY,
  RECOUNTING
}

let idGen = 0;

export abstract class Shape {
  private unique: number = 0;
  private readonly id: number = ++idGen;
  private readonly type: ShapeType;
  private state: RecountState = RecountState.READY;
  private callbacks: Map<number, () => void> = new Map<number, () => void>();
  private unsubscribes: Map<Shape, () => void> = new Map<Shape, () => void>();

  constructor(type: ShapeType) {
    this.type = type;
  }

  protected abstract calculate(): void;
  protected abstract meta(): IShapeInfo;

  getMeta(): IMetaInfo {
    const info = this.meta();

    return { ... info, id: this.id, type: this.type, onChange: callback => this.onChanges(callback) };
  }

  recount(): void {
    if (this.state !== RecountState.READY) throw new Error('Circular dependency detected');

    this.state = RecountState.RECOUNTING;

    this.calculate();
    this.callbacks.forEach(call => call());

    this.state = RecountState.READY;
  }

  setUpDependency(shape: Shape, prev?: Shape): void {
    if (prev && this.unsubscribes.has(prev)) {
      const unsubscribe = this.unsubscribes.get(prev) as () => void;
      this.unsubscribes.delete(prev);
      unsubscribe();
    }

    const call = shape.onChanges(
      () => {
        this.recount();
      }
    );

    this.unsubscribes.set(shape, call);
  }

  onChanges(call: () => void): () => void {
    const id = ++this.unique;
    this.callbacks.set(id, call);

    return () => {
      if (this.callbacks.has(id)) {
        this.callbacks.delete(id);
      }
    };
  }

  getId(): number {
    return this.id;
  }

  destroy(): void {
    this.callbacks.clear();
    this.unsubscribes.forEach(call => call());
  }
}
