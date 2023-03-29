import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category";
import {environments} from "../../../environment/enviroments";

const apiUrl = environments.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${apiUrl}/categories`);
  }
  findOne(id: number): Observable<Category> {
    return this.http.get<Category>(`${apiUrl}/categories/` + id);
  }
  findCategoriesByJobId(id:number):Observable<Category[]>{
    return this.http.get<Category[]>(`${apiUrl}/categories/job/${id}`)
  }

  findCategoriesByCompanyId(id:number):Observable<Category[]>{
    return this.http.get<Category[]>(`${apiUrl}/categories/company/${id}`)
  }
}
