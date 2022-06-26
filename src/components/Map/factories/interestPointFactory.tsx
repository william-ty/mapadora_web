import { Element } from "../../../model/Element";
import { InterestPoint } from "../../../model/InterestPoint";
import { Point } from "../../../model/Point";
import { elementFactory } from "./elementFactory";
import { pointFactory } from "./pointFactory";

export const interestPointFactory = [
  new InterestPoint({
    id: 1,
    element: elementFactory[0],
    point: pointFactory[0],
    order: 1,
  }),
  new InterestPoint({
    id: 2,
    element: elementFactory[1],
    point: pointFactory[1],
    order: 2,
  }),
  new InterestPoint({
    id: 3,
    element: elementFactory[2],
    point: pointFactory[2],
    order: 3,
  }),
  new InterestPoint({
    id: 4,
    element: elementFactory[3],
    point: pointFactory[3],
    order: 4,
  }),
  new InterestPoint({
    id: 5,
    element: elementFactory[4],
    point: pointFactory[4],
    order: 5,
  }),
  new InterestPoint({
    id: 6,
    element: elementFactory[5],
    point: pointFactory[5],
    order: 1,
  }),
  new InterestPoint({
    id: 7,
    element: elementFactory[6],
    point: pointFactory[6],
    order: 7,
  }),
  new InterestPoint({
    id: 8,
    element: elementFactory[7],
    point: pointFactory[7],
    order: 8,
  }),
];
