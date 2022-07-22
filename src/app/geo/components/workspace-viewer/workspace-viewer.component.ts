import {Component, EventEmitter, Input, Output} from '@angular/core';
import { WorkspaceContext } from "../workspace/workspace-context";
import { ShapeUI } from "../../render/shapes/ShapeUI";
import { MatDialog } from "@angular/material/dialog";
import { CreateShapeDialogComponent, ICreateShapeDialogData } from "../create-shape-dialog/create-shape-dialog.component";


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

  constructor(private dialog: MatDialog) {
  }

  shapeSelected(shape: ShapeUI): void {
    this.selectedShape = shape;
  }

  onChange(): void {
    this.context = { ... this.context };
    this.contextChanged.emit(this.context);
  }

  addShape(): void {
    const dialog = this.dialog.open<CreateShapeDialogComponent>(CreateShapeDialogComponent, {
      width: '600px',
      restoreFocus: false
    });
    dialog.afterClosed().subscribe((data: ICreateShapeDialogData) => {
      console.log(data);
    });
  }
}
