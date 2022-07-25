import { Component, OnInit } from '@angular/core';
import { WorkspaceContext } from "./geo/components/workspace/workspace-context";
import { PointUI } from "./geo/render/shapes/PointUI";
import { LineUI } from "./geo/render/shapes/LineUI";
import { CoordinatesBasedPoint } from "./geo/core/shapes/point/CoordinatesBasedPoint";
import { TwoPointsLine } from "./geo/core/shapes/line/TwoPointsLine";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  context = new WorkspaceContext();

  ngOnInit(): void {
    // const a = new CoordinatesBasedPoint();
    // const b = new CoordinatesBasedPoint();
    // a.setName('A');
    // b.setName('B');
    // b.setX(5);
    // b.setY(5);
    // const line = new TwoPointsLine();
    // line.p1 = a;
    // line.p2 = b;
    // this.context.shapes = [new PointUI(a), new PointUI(b), new LineUI(line)];
  }

  onContextChanged(): void {
    // TODO: refactor it, change event?
    const { shapes } = this.context;
    this.context = new WorkspaceContext();
    shapes.forEach(shape => this.context.addShape(shape.getShape()));
  }
}
