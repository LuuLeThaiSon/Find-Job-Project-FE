import {Company} from "./company";
import {Locations} from "./locations";
import {Category} from "./category";

export interface Job {
  id: number;
  title: string;
  code: string;
  position: string;
  salaryMin: number;
  salaryMax: number;
  expYear: number;
  type: boolean;
  expiredDate: number;
  description: string;
  quantity: number;
  gender: number;
  status: boolean;
  location: Locations;
  company: Company;
  category:Category;
}
