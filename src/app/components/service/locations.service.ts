import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Locations} from "../model/locations";
import {environments} from "../../../environment/enviroments";

const apiUrl = environments.apiUrl

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<Locations[]> {
    return this.http.get<Locations[]>(`${apiUrl}/locations`)
  }
  findOne(id: number): Observable<Locations> {
    return this.http.get<Locations>(`${apiUrl}/locations/${id}`)
  }
}
