import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { WorkspaceContext } from "../workspace/workspace-context";
import { ShapeUI } from "../../render/shapes/ShapeUI";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
  selector: 'geo-shape-select',
  templateUrl: './shape-select.component.html',
  styleUrls: ['./shape-select.component.css']
})
export class ShapeSelectComponent implements OnInit, OnChanges {

  @Input()
  context: WorkspaceContext;

  @Output()
  shapeSelected = new EventEmitter<ShapeUI>();

  shapeFilter = new FormControl<string>('');
  lastSelectedShape: ShapeUI;
  filteredShapes: Observable<ShapeUI[]>;

  ngOnInit(): void {
    this.filteredShapes = this.shapeFilter.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '')),
    );
  }

  ngOnChanges(): void {
    if (this.lastSelectedShape) {
      this.shapeFilter.setValue(this.getTitle(this.lastSelectedShape));
    }
  }

  filter(value: string): ShapeUI[] {
    const list = this.context.shapes.map(shape => { return { title: this.getTitle(shape), shape } });

    if (!value) {
      return list.map(element => element.shape);
    }

    return list.filter(option => option.title.includes(value)).map(option => option.shape);
  }

  getTitle(shape: ShapeUI) {
    let name = 'anon';
    const nameControl = shape.getMeta().controls.find(control => control.title === 'Name');

    if (nameControl) {
      name = nameControl.getValue();
    }

    return `${name}{${shape.getMeta().title}}`;
  }

  onSelected(shape: ShapeUI): void {
    this.lastSelectedShape = shape;
    this.shapeSelected.emit(shape);
  }
}
