import {Company} from "./company";

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
  location: Location;
  company: Company;
}
