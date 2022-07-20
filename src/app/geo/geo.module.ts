import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RenderEngineComponent } from './components/render-engine/render-engine.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { WorkspaceViewerComponent } from './components/workspace-viewer/workspace-viewer.component';
import { MaterialModule } from "../material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShapeSelectComponent } from './components/shape-select/shape-select.component';
import { ShapeInspectorComponent } from './components/shape-inspector/shape-inspector.component';

@NgModule({
  declarations: [
    RenderEngineComponent,
    WorkspaceComponent,
    WorkspaceViewerComponent,
    ShapeSelectComponent,
    ShapeInspectorComponent
  ],
  exports: [
    WorkspaceComponent,
    WorkspaceViewerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule
  ]
})
export class GeoModule { }
