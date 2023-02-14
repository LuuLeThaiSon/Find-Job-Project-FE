import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Locations} from "../model/locations";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<Locations[]> {
    return this.http.get<Locations[]>("http://localhost:8080/locations")
  }
  findOne(id: number): Observable<Locations> {
    return this.http.get<Locations>("http://localhost:8080/locations/" + id)
  }
}
