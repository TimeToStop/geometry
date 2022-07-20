export interface IControl {
  isReadOnly: boolean;
  title: string;

  isValid?: (value: string) => boolean;
  setValue?: (value: string) => void;

  getValue: () => string;
}

export interface IMeta {
  controls: IControl[];
  deps: IShape[];
  title: string;
}

export interface IShape {
  calculate(): void;
  meta(): IMeta;
}
