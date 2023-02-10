import {Company} from "./company";

export interface Category {
  id: number;
  name: string;
  companies: Company[];
}
