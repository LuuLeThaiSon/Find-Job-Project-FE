import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Job} from "../model/job";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient) { }

  findAll(): Observable<Job[]> {
    return this.http.get<Job[]>("http://localhost:8080/jobs")
  }
  findAllByStatusIsTrueAndAndExpiredDate(): Observable<Job[]> {
    return this.http.get<Job[]>("http://localhost:8080/jobs/status")
  }

  findOne(id: number): Observable<Job> {
    return this.http.get<Job>("http://localhost:8080/jobs/" + id)
  }

  findCurrentOpeningJobsByCompany(id:number) {
    return this.http.get<Job[]>(`http://localhost:8080/jobs/current/opening/${id}`)
  }

  findAllJobsByCompany(id:number) {
    return this.http.get<Job[]>(`http://localhost:8080/jobs/company/${id}`)
  }

  deleteJob(id: number) {
    return this.http.delete("http://localhost:8080/jobs/" + id)
  }

  blockJob(id: number, job: Job) {
    return this.http.put<Job>("http://localhost:8080/jobs/set/" + id, job);
  }

  create(job: Job): Observable<Job> {
    return this.http.post<Job>("http://localhost:8080/jobs", job)
  }

  findAllJobsByCandidate(id:number) {
    return this.http.get<Job[]>(`http://localhost:8080/jobs/candidate/${id}`)
  }
}
