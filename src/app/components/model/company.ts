import {Role} from "./role";

export interface Company {
  id: number;
  name: string;
  shortName: string;
  code: string;
  email: string;
  password: string;
  avatar: string;
  description: string;
  address: string;
  numberOfEmployees: number;
  googleMap: string;
  tel: string;
  website: string;
  role: Role;
}