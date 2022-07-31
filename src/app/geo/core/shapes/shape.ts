import {GeoEvents} from "../events/events";

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
  onChange: (callback: (shape: Shape) => void) => (() => void);
  onDestroy: (callback: () => void) => (() => void);
}

enum State {
  READY,
  RECOUNTING,
  DESTROYED
}

export abstract class Shape {
  private static idGen: number = 0;

  private readonly id: number = ++Shape.idGen;
  private readonly type: ShapeType;
  private state: State = State.READY;
  private unsubscribes: Map<Shape, () => void> = new Map<Shape, () => void>();

  private readonly onChangeEvent: GeoEvents<Shape> = new GeoEvents<Shape>();
  private readonly onDestroyEvent: GeoEvents<void> = new GeoEvents<void>();

  constructor(type: ShapeType) {
    this.type = type;
  }

  protected abstract calculate(): void;
  protected abstract meta(): IShapeInfo;

  getMeta(): IMetaInfo {
    const info = this.meta();

    return {
      ... info,
      id: this.id,
      type: this.type,
      onChange: callback => this.onChanges(callback),
      onDestroy: callback => this.onDestroy(callback)
    };
  }

  recount(): void {
    if (this.state === State.DESTROYED) throw new Error('Recount called on destroyed shape');
    if (this.state === State.RECOUNTING) throw new Error('Circular dependency detected');

    this.state = State.RECOUNTING;

    this.calculate();
    this.onChangeEvent.emit(this);

    this.state = State.READY;
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

  onChanges(call: (shape: Shape) => void): () => void {
    return this.onChangeEvent.subscribe((shape: Shape) => call(shape));
  }

  onDestroy(call: () => void): () => void {
    return this.onDestroyEvent.subscribe(() => call());
  }

  getId(): number {
    return this.id;
  }

  destroy(): void {
    this.state = State.DESTROYED;
    this.unsubscribes.forEach((call: () => void, dep: Shape) => {
      call();
      dep.destroy();
    });
    this.onDestroyEvent.emit();
  }
}
