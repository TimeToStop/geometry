import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RenderEngineComponent } from './components/render-engine/render-engine.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { WorkspaceViewerComponent } from './components/workspace-viewer/workspace-viewer.component';
import { MaterialModule } from "../material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShapeSelectComponent } from './components/shape-select/shape-select.component';
import { CreateShapeDialogComponent } from './components/create-shape-dialog/create-shape-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ShapeSettingsComponent } from './components/shape-settings/shape-settings.component';

@NgModule({
  declarations: [
    RenderEngineComponent,
    WorkspaceComponent,
    WorkspaceViewerComponent,
    ShapeSelectComponent,
    CreateShapeDialogComponent,
    ShapeSettingsComponent
  ],
  exports: [
    WorkspaceComponent,
    WorkspaceViewerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MaterialModule,
    CommonModule
  ]
})
export class GeoModule { }
