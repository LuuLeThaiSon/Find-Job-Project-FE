import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>("http://localhost:8080/categories");
  }
  findOne(id: number): Observable<Category> {
    return this.http.get<Category>("http://localhost:8080/categories/" + id);
  }
}
