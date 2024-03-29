import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { WorkspaceContext } from "../workspace/workspace-context";
import { ShapeUI } from "../../render/shapes/shape-ui";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";

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
      this.shapeFilter.setValue(this.context.getTitle(this.lastSelectedShape));
    }
  }

  filter(value: string): ShapeUI[] {
    const list = this.context.shapes.map(shape => { return { title: this.context.getTitle(shape), shape } });

    if (!value) {
      return list.map(element => element.shape);
    }

    return list.filter(option => option.title.includes(value)).map(option => option.shape);
  }

  onSelected(shape: ShapeUI): void {
    this.lastSelectedShape = shape;
    this.shapeSelected.emit(shape);
  }
}
