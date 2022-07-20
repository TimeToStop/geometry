import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { WorkspaceContext } from "../workspace/workspace-context";
import {ShapeUI} from "../../render/shapes/ShapeUI";



@Component({
  selector: 'geo-workspace-viewer',
  templateUrl: './workspace-viewer.component.html',
  styleUrls: ['./workspace-viewer.component.css']
})
export class WorkspaceViewerComponent {
  @Input()
  context: WorkspaceContext;

  @Output()
  contextChanged = new EventEmitter<WorkspaceContext>();

  selectedShape: ShapeUI;

  shapeSelected(shape: ShapeUI): void {
    this.selectedShape = shape;
  }

  onChange(): void {
    this.context = { ... this.context };
    this.contextChanged.emit(this.context);
  }
}
