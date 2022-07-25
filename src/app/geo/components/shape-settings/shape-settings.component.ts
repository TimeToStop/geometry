import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import { WorkspaceContext } from "../workspace/workspace-context";
import { IMetaInfo, IShapeDependency, ShapeType } from "../../core/shapes/Shape";
import { FormControl, FormGroup } from "@angular/forms";
import { ShapeUI } from "../../render/shapes/ShapeUI";

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
      this.form.addControl(controlName, new FormControl(this.controls[controlName]));
      this.form.get(controlName)?.valueChanges.subscribe(() => {
        const value = this.form.get(controlName)?.value;
        if (value) {
          const control = this.info.controls.find(control => control.title === controlName);

          if (control && !control.isReadOnly && control.setValue) {
            control.setValue(value);
            this.onSettingChanged.emit();
          }
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

  getFilteredShapes(type: ShapeType): ShapeUI[] {
    return this.context.shapes.filter(shape => shape.getMeta().type === type);
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
