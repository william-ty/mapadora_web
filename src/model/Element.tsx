import { type } from "@testing-library/user-event/dist/type";

export class Element {
  id?: number;
  name: string;
  description: string;
  predicted_date: Date;
  id_travel:number;

  constructor({ id = undefined, name = "", description = "", predicted_date = new Date(), id_travel=0 }
  : {
    id?: number;
  name: string;
  description: string;
  predicted_date: Date;
  id_travel:number;
  }) {

    this.id = id;
    this.name = name;
    this.description = description;
    this.predicted_date = predicted_date;
    this.id_travel = id_travel;
  }
}

