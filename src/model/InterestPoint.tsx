import { Point } from "./Point";
import { Element } from "./Element";
import { elementFactory } from "../components/Map/factories/elementFactory";
import { pointFactory } from "../components/Map/factories/pointFactory";

export class InterestPoint {
  static routeName = "interestpoint";

  id?: number;
  element: Element;
  point: Point;
  order: number;
  id_step?: number;
  day?: number;

  constructor({
    id,
    element = elementFactory[0],
    point = pointFactory[0],
    order = 0,
    id_step,
    day,
  }: {
    id?: number;
    element: Element;
    point: Point;
    order: number;
    id_step?: number;
    day?: number;
  }) {
    this.id = id;
    this.element = element;
    this.point = point;
    this.order = order;
    this.id_step = id_step;
    this.day = day;
  }
}
