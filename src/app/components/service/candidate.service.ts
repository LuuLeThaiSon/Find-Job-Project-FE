import { Injectable } from '@angular/core';
import {Company} from "../model/company";
import {Observable} from "rxjs";
import {environments} from "../../../environment/enviroments";
import {HttpClient} from "@angular/common/http";
import {Candidate} from "../model/candidate";
import {Job} from "../model/job";

const apiUrl = environments.apiUrl


@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private httpClient: HttpClient) { }

  saveCandidate(candidate: Candidate): Observable<any> {
    return this.httpClient.post<Candidate>(`${apiUrl}/candidates`, candidate)
  }

  updateCandidate(candidate:Candidate,id:number) : Observable<any> {
    return this.httpClient.put<Candidate>(`${apiUrl}/candidates/${candidate.id}`,candidate)
  }

  findOneCandidate(id: number): Observable<Candidate> {
    return this.httpClient.get<Candidate>("http://localhost:8080/candidates/" + id)
  }
}
