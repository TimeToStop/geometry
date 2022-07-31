import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IMetaInfo, Shape } from "../../core/shapes/shape";
import { CoordinatesBasedPoint } from "../../core/shapes/point/coordinates-based-point";
import { TwoPointsLine } from "../../core/shapes/line/two-points-line";
import { WorkspaceContext } from "../workspace/workspace-context";

export interface ICreateShapeDialogData {
  isCreated: boolean;
  shape?: Shape;
}

export interface ICreationType {
  title: string;
  create: () => Shape;
}

export interface ICreationShapeType {
  title: string;
  creations: ICreationType[];
}

export interface ICreateShapeDialogInput {
  context: WorkspaceContext;
}

@Component({
  selector: 'app-create-shape-dialog',
  templateUrl: './create-shape-dialog.component.html',
  styleUrls: ['./create-shape-dialog.component.css']
})
export class CreateShapeDialogComponent {

  context: WorkspaceContext;

  readonly types: ICreationShapeType[] = [
    {
      title: 'Point',
      creations: [
        {
          title: 'Coordinates Point',
          create: () => new CoordinatesBasedPoint()
        }
      ]
    },
    {
      title: 'Line',
      creations: [
        {
          title: 'Between Points',
          create: () => new TwoPointsLine()
        }
      ]
    }
  ];

  type: ICreationShapeType = this.types[0];
  creation: ICreationType = this.types[0].creations[0];
  shape: Shape = this.types[0].creations[0].create();
  info: IMetaInfo = this.shape.getMeta();

  constructor(private dialog: MatDialogRef<CreateShapeDialogComponent, ICreateShapeDialogData>,
              @Inject(MAT_DIALOG_DATA) data: ICreateShapeDialogInput
  ) {
    this.context = data.context;
  }

  addShape(): void {
    this.dialog.close({ isCreated: true, shape: this.shape });
  }

  closeDialog(): void {
    this.dialog.close({ isCreated: false });
  }

  setType(type: ICreationShapeType): void {
    this.type = type;
    this.creation = this.type.creations[0];
    this.shape = this.type.creations[0].create();
    this.info = this.shape.getMeta();
  }

  setCreation(creation: ICreationType): void {
    this.creation = creation;
    this.shape = this.creation.create();
    this.info = this.shape.getMeta();
  }
}
