import { type } from "@testing-library/user-event/dist/type";

export class TravelReview {
  static routeName = "travelreview";

  id?: number;
  name: string;
  id_travel?: number;

  constructor({ id = undefined, name = "", id_travel = undefined }
    : {
      id?: number;
      name: string;
      id_travel?: number;
    }) {

    this.id = id;
    this.name = name;
    this.id_travel = id_travel;
  }
}

