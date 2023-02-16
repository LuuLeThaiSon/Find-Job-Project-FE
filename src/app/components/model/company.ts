import {Role} from "./role";
import {EmailSender} from "./email-sender";

export interface Company {
  id: number;
  name: string;
  shortName: string;
  code: string;
  email: string;
  password: string | null;
  avatar: string;
  description: string;
  address: string;
  numberOfEmployees: number;
  googleMap: string;
  tel: string;
  website: string;
  role: Role;
  status: boolean;

}
