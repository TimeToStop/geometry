import { ShapeContainer } from "./ShapeContainer";
import {CoordinatesBasedPoint} from "./point/CoordinatesBasedPoint";
import {Point} from "./point/Point";
import {TwoPointsLine} from "./line/TwoPointsLine";

export interface IGeoBuilderResult<T> {
  container: ShapeContainer;
  shape: T;
}

export class GeoBuilder {
  coordinatesPoint(): IGeoBuilderResult<CoordinatesBasedPoint> {
    const container = new ShapeContainer([]);
    const point = new CoordinatesBasedPoint(() => container.recount());
    container.setShape(point);
    // calculate does not have an effect
    return { container, shape: point };
  }

  twoPointsLine(p1: IGeoBuilderResult<Point>, p2: IGeoBuilderResult<Point>): IGeoBuilderResult<TwoPointsLine> {
    const container = new ShapeContainer([p1.container, p2.container]);
    const line = new TwoPointsLine(p1.shape, p2.shape, () => container.recount());
    container.setShape(line);
    line.calculate();
    return { container, shape: line };
  }
}
