import {Component, EventEmitter, Input, Output} from '@angular/core';
import { WorkspaceContext } from "../workspace/workspace-context";
import { ShapeUI } from "../../render/shapes/ShapeUI";
import { MatDialog } from "@angular/material/dialog";
import { CreateShapeDialogComponent, ICreateShapeDialogData } from "../create-shape-dialog/create-shape-dialog.component";
import {IMetaInfo} from "../../core/shapes/Shape";


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

  selectedShape: ShapeUI;
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
}
