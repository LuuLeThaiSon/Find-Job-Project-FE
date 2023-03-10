import {NotifyType} from "./notify-type";
import {Candidate} from "./candidate";
import {Company} from "./company";
import {Job} from "./job";

export class Notify {
  id?: string;
  notifyType?: NotifyType;
  candidate?: Candidate;
  company?: Company;
  job?: Job;
  dateTime?: Date;
  status?: Boolean;


  constructor() {
  }
}
