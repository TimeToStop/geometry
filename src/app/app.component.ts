import {Component, OnInit} from '@angular/core';
import { WorkspaceContext } from "./geo/components/workspace/workspace-context";
import {PointUI} from "./geo/render/shapes/PointUI";
import {GeoBuilder} from "./geo/core/shapes/GeoBuilder";
import {LineUI} from "./geo/render/shapes/LineUI";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  context = new WorkspaceContext();

  ngOnInit(): void {
    const builder = new GeoBuilder();
    const a = builder.coordinatesPoint();
    const b = builder.coordinatesPoint();
    a.shape.setName('A');
    b.shape.setName('B');
    b.shape.setX(5);
    b.shape.setY(5);
    const line = builder.twoPointsLine(a, b);
    this.context.shapes = [new PointUI(a.shape), new PointUI(b.shape), new LineUI(line.shape)];
  }

  onContextChanged(context: WorkspaceContext): void {
    this.context = context;
  }
}
