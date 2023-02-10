import {Company} from "./company";
import {Locations} from "./locations";

export interface Job {
  id: number;
  title: string;
  code: string;
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
}
