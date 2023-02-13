import {Role} from "./role";

export interface Candidate {
  id?: number;
  name: string;
  email: string;
  password: string;
  tel: string;
  role: Role;
  avatar:string;
}
