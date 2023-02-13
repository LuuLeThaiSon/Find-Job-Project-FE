import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../model/company";
import {environments} from "../../../environment/enviroments";
import {Role} from "../model/role";
import {Candidate} from "../model/candidate";
import {Job} from "../model/job";

const apiUrl = environments.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Company[]> {
    return this.httpClient.get<Company[]>("http://localhost:8080/companies")
  }

  findAllCompany(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${apiUrl}/companies`)
  }

  findAllRole(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${apiUrl}/companies/role`)
  }

  findAllCandidate(): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(`${apiUrl}/candidates`)
  }

  findCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${apiUrl}/companies/${id}`)
  }

  save(company: Company): Observable<any> {
    return this.httpClient.post<Company>(`${apiUrl}/companies`, company)
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${apiUrl}/companies/${id}`)
  }

  countQuantityJob(idCompany: number): Observable<Job[]> {
    return this.httpClient.get<Job[]>(`${apiUrl}/jobs/quantity/${idCompany}`)
  }

}
