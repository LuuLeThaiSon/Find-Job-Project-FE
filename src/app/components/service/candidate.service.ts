import { Injectable } from '@angular/core';
import {Company} from "../model/company";
import {Observable} from "rxjs";
import {environments} from "../../../environment/enviroments";
import {HttpClient} from "@angular/common/http";
import {Candidate} from "../model/candidate";

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
}
