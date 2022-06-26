import { Element } from "../../../model/Element";
import { Step } from "../../../model/Step";
import { Point } from "../../../model/Point";
import { elementFactory } from "./elementFactory";
import { pointFactory } from "./pointFactory";


export const stepFactory =

    [
        new Step({
            id: 1,
            element_step:
                elementFactory[8],
            point: pointFactory[8],
            order: 1,
            duration: 1
        }),
        new Step({
            id: 2,
            element_step:
                elementFactory[9],
            point: pointFactory[9],
            order: 2,
            duration: 1

        }),
        new Step({
            id: 3,
            element_step:
                elementFactory[10],
            point: pointFactory[10],
            order: 3,
            duration: 1

        }),
        new Step({
            id: 4,
            element_step:
                elementFactory[11],
            point: pointFactory[11],
            order: 4,
            duration: 1

        }),
        new Step({
            id: 5,
            element_step:
                elementFactory[12],
            point: pointFactory[12],
            order: 5,
            duration: 1

        }),
        new Step({
            id: 6,
            element_step:
                elementFactory[13],
            point: pointFactory[13],
            order: 1,
            duration: 1

        }),
        new Step({
            id: 7,
            element_step:
                elementFactory[14],
            point: pointFactory[14],
            order: 7,
            duration: 1

        }),
        new Step({
            id: 8,
            element_step:
                elementFactory[15],
            point: pointFactory[15],
            order: 8,
            duration: 1

        })

    ]

