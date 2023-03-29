import {ElementRef, Injectable, ViewChild} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {ApplyJob} from "../model/apply-job";
import {finalize, Observable} from "rxjs";

import {Job} from "../model/job";
import {JobService} from "./job.service";
import {environments} from "../../../environment/enviroments";

const apiUrl = environments.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ApplyJobService {

  constructor(private http: HttpClient,
              private jobService: JobService) {
  }

  save(applyJob: ApplyJob): Observable<ApplyJob> {
    return this.http.post<ApplyJob>(`${apiUrl}/apply`, applyJob);
  }

  checkApplyJob(id: number, jobs: Job[]): Observable<boolean[]> {
    return this.http.post<boolean[]>(`${apiUrl}/apply/test/` + id, jobs);
  }

  checkApplyAccept(id: number, jobs: Job[]): Observable<boolean[]> {
    return this.http.post<boolean[]>(`${apiUrl}/apply/checkApplyAccept/` + id, jobs);
  }

  findAllApplyJobByCandidateId(id: number): Observable<ApplyJob[]> {
    return this.http.get<ApplyJob[]>(`${apiUrl}/apply/candidate/` + id)
  }

  removeApplyJob(id: number | undefined) {
    return this.http.delete(`${apiUrl}/apply/` + id)
  }

  removeApplyJobCandidate(id: number | undefined, id1: number| undefined) {
    return this.http.delete(`${apiUrl}/apply/delete/` + id + "&" + id1)
  }

  findAllApplyJobByJob(id: number | undefined): Observable<ApplyJob[]> {
    return this.http.get<ApplyJob[]>(`${apiUrl}/apply/candidate/job/` + id)
  }

  rejectApplyJob(id: number) {
    return this.http.delete(`${apiUrl}/apply/` + id)
  }

  acceptJob(applyJob: ApplyJob): Observable<ApplyJob> {
    return this.http.put<ApplyJob>(`${apiUrl}/apply/` + applyJob.id, applyJob);
  }

  findOne(id: number): Observable<ApplyJob> {
    return this.http.get<ApplyJob>(`${apiUrl}/apply/` + id);
  }
}
