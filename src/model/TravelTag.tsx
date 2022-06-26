import { type } from "@testing-library/user-event/dist/type";

export class TravelTag {
  static routeName = "traveltag";

  id?: number;
  name: string;

  constructor({ id = undefined, name = "" }
    : {
      id?: number;
      name: string;
    }) {

    this.id = id;
    this.name = name;
  }
}

