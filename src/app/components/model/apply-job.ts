import {Job} from "./job";
import {Candidate} from "./candidate";

export class ApplyJob {
  id?: number;
  job?: Job;
  candidate?: Candidate;
  status?: boolean;
  message?: string;
  cv?: string;
}
