import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { WorkspaceContext } from "../workspace/workspace-context";
import { IControl, IMetaInfo, IShapeDependency, Shape, ShapeType } from "../../core/shapes/Shape";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ShapeUI } from "../../render/shapes/ShapeUI";

export const createValidator = (control: IControl): typeof validator => {
  const validator: ValidatorFn = (field: AbstractControl): ValidationErrors | null => {
    const value = field.getRawValue() as string;

    if (control.isReadOnly || !control.isValid) return null;

    if (control.isValid(value)) return null;

    return { "invalid": true };
  };

  return validator;
}

@Component({
  selector: 'geo-shape-settings',
  templateUrl: './shape-settings.component.html',
  styleUrls: ['./shape-settings.component.css']
})
export class ShapeSettingsComponent implements OnChanges, OnDestroy {

  @Input()
  context: WorkspaceContext;

  @Input()
  info: IMetaInfo;

  @Output()
  onSettingChanged = new EventEmitter<void>();

  form: FormGroup;

  unsubscribe: () => void;
  controls: any;
  keys: string[];

  ngOnChanges(): void {
    this.controls = {};
    this.form = new FormGroup<any>({});
    this.info.controls.forEach(control => this.controls[control.title] = control.getValue());
    this.keys = Object.keys(this.controls);

    for (const controlName in this.controls) {
      const control = this.info.controls.find(control => control.title === controlName);

      if (!control) continue;

      this.form.addControl(controlName, new FormControl(this.controls[controlName], createValidator(control)));
      this.form.get(controlName)?.valueChanges.subscribe(() => {
        const value = this.form.get(controlName)?.value;

        if (value && !control.isReadOnly && control.setValue && control.isValid && control.isValid(value)) {
          control.setValue(value);
          this.onSettingChanged.emit();
        }
      });
    }

    if (this.unsubscribe) this.unsubscribe();

    this.unsubscribe = this.info.onChange(() => {
      this.keys.forEach(key => {
        const control = this.info.controls.find(control => control.title === key);

        if (control) {
          this.form.get(key)?.setValue(control.getValue(), { emitEvent: false });
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe();
  }

  isInvalid(): boolean {
    for (const controlName in this.form.controls) {
      const errors = this.form.get(controlName)?.errors;

      if (errors && errors['invalid']) {
        return true;
      }
    }

    return false;
  }

  getFilteredShapes(type: ShapeType, current: Shape): ShapeUI[] {
    const deps = this.info.deps.map(dep => dep.getValue());
    const filtered = this.context.shapes.filter(shape => shape.getMeta().type === type)
                              .filter(shape => !deps.includes(shape.getShape()));
    const ui = this.context.shapes.find(shape => shape.getShape() === current);

    if (ui) {
      filtered.push(ui);
    }

    return filtered;
  }

  getCurrentShapeTitle(dep: IShapeDependency): string {
    const shape = this.context.shapes.find(shape => dep.getValue() === shape.getShape());

    if (shape) {
      return this.context.getTitle(shape);
    }

    return 'not selected';
  }

  onSelectedDep(shape: ShapeUI, dep: IShapeDependency): void {
    dep.setValue(shape.getShape());
    this.onSettingChanged.emit();
  }
}
