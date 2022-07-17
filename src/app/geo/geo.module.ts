import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderEngineComponent } from './components/render-engine/render-engine.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

@NgModule({
  declarations: [
    RenderEngineComponent,
    WorkspaceComponent
  ],
  exports: [
    WorkspaceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GeoModule { }
