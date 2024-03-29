import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkspaceContext } from "../workspace/workspace-context";
import { ShapeUI } from "../../render/shapes/shape-ui";
import { MatDialog } from "@angular/material/dialog";
import { CreateShapeDialogComponent, ICreateShapeDialogData } from "../create-shape-dialog/create-shape-dialog.component";
import { IMetaInfo } from "../../core/shapes/shape";

@Component({
  selector: 'geo-workspace-viewer',
  templateUrl: './workspace-viewer.component.html',
  styleUrls: ['./workspace-viewer.component.css']
})
export class WorkspaceViewerComponent {
  @Input()
  context: WorkspaceContext;

  @Output()
  contextChanged = new EventEmitter<void>();

  selectedShape: ShapeUI | null;
  selectedMetaInfo: IMetaInfo;

  constructor(private dialog: MatDialog) {
  }

  shapeSelected(shape: ShapeUI): void {
    this.selectedShape = shape;
    this.selectedMetaInfo = shape.getMeta();
  }

  addShape(): void {
    const dialog = this.dialog.open<CreateShapeDialogComponent>(CreateShapeDialogComponent, {
      width: '600px',
      restoreFocus: false,
      data: {
        context: this.context
      }
    });
    dialog.afterClosed().subscribe((data: ICreateShapeDialogData) => {
      const { isCreated, shape } = data;

      if (isCreated && shape) {
        this.context.addShape(shape);
        this.contextChanged.emit();
      }
    });
  }

  deleteShape(): void {
    if (this.selectedShape) {
      this.context.deleteShape(this.selectedShape);
      this.selectedShape = null;
      this.contextChanged.emit();
    }
  }
}
