import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { WorkspaceContext } from "../workspace/workspace-context";
import { ShapeUI } from "../../render/shapes/ShapeUI";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";


@Component({
  selector: 'geo-workspace-viewer',
  templateUrl: './workspace-viewer.component.html',
  styleUrls: ['./workspace-viewer.component.css']
})
export class WorkspaceViewerComponent implements OnInit {
  @Input()
  context: WorkspaceContext;

  @Output()
  contextChanged = new EventEmitter<WorkspaceContext>();

  @Output()
  shapeSelected = new EventEmitter<ShapeUI>();

  shapeFilter = new FormControl<string>('');
  filteredShapes: Observable<ShapeUI[]>;

  ngOnInit(): void {
    this.filteredShapes = this.shapeFilter.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '')),
    );
  }

  filter(value: string): ShapeUI[] {
    const list = this.context.shapes.map(shape => { return { title: this.getTitle(shape), shape } });

    if (!value) {
      return list.map(element => element.shape);
    }

    return list.filter(option => option.title.includes(value)).map(option => option.shape);
  }

  getTitle(shape: ShapeUI) {
    return `${shape.getName()}{${shape.getTitle()}}`;
  }

  onSelected($event: MatAutocompleteSelectedEvent) {
    const shape = this.context.shapes.find(shape => this.getTitle(shape) === $event.option.value);

    if (shape) {
      this.shapeSelected.emit(shape);
    }
  }
}
