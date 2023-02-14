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
  findOne(id: number): Observable<Job> {
    return this.http.get<Job>("http://localhost:8080/jobs/" + id)
  }
  countJobsOfCompany(count: number) {

  }
  findCurrentOpeningJobsByCompany(id:number) {
    return this.http.get<Job[]>(`http://localhost:8080/jobs/current/opening/${id}`)
  }

  findAllJobsByCompany(id:number) {
    return this.http.get<Job[]>(`http://localhost:8080/jobs/company/${id}`)
  }

}
