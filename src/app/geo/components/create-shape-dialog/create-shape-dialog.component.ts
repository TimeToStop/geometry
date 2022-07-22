import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { IShape } from "../../core/shapes/IShape";
import {throwError} from "rxjs";

export interface ICreateShapeDialogData {
  isCreated: boolean;
  shape?: IShape;
}

export enum ShapeType {
  LINE,
  POINT
}

export interface IShapeType {
  title: string;
  value: ShapeType;
  creations: string[];
}

@Component({
  selector: 'app-create-shape-dialog',
  templateUrl: './create-shape-dialog.component.html',
  styleUrls: ['./create-shape-dialog.component.css']
})
export class CreateShapeDialogComponent {

  readonly types: IShapeType[] = [
    {
      title: 'Point',
      value: ShapeType.POINT,
      creations: [ 'Coordinates Point' ]
    },
    {
      title: 'Line',
      value: ShapeType.LINE,
      creations: [ 'Between Points' ]
    }
  ];

  creation: string = this.types[0].creations[0];
  type: IShapeType = this.types[0];

  constructor(private dialog: MatDialogRef<CreateShapeDialogComponent, ICreateShapeDialogData>) {
  }

  addShape(): void {
    this.dialog.close({ isCreated: true, shape: undefined });
  }

  closeDialog(): void {
    this.dialog.close({ isCreated: false });
  }

  setType(type: IShapeType): void {
    this.type = type;
    this.creation = this.type.creations[0];
  }

  setCreation(creation: string): void {
    this.creation = creation;
  }
}
