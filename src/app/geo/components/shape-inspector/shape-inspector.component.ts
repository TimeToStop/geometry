import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { IMeta } from "../../core/shapes/IShape";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'geo-shape-inspector',
  templateUrl: './shape-inspector.component.html',
  styleUrls: ['./shape-inspector.component.css']
})
export class ShapeInspectorComponent implements OnChanges {

  @Input()
  info: IMeta;

  @Output()
  shapePropertyHasChanged = new EventEmitter<void>();

  form: FormGroup;

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
            this.shapePropertyHasChanged.emit();
          }
        }
      });
    }
  }
}
