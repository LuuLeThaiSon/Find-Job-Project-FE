import {Role} from "./role";

export interface Admin {
  id: number,
  email: string,
  password: string,
  avatar: string,
  role: Role
}
