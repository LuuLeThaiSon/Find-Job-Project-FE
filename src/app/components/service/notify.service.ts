import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notify} from "../model/notify";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private http: HttpClient) { }

  findAllCompanyNotify(id: number): Observable<Notify[]> {
    return this.http.get<Notify[]>("http://localhost:8080/notify/company/" + id);
  }
  findAllCandidateNotify(id: number): Observable<Notify[]> {
    return this.http.get<Notify[]>("http://localhost:8080/notify/candidate/" + id);
  }

  countUnreadCandidateNotify(id: number): Observable<number> {
    return this.http.get<number>("http://localhost:8080/notify/count-unread/candidate/" + id)
  }

  countUnreadCompanyNotify(id: number): Observable<number> {
    return this.http.get<number>("http://localhost:8080/notify/count-unread/company/" + id)
  }

  readNotify(notify: Notify): Observable<Notify> {
    return this.http.put<Notify>("http://localhost:8080/notify/" + notify.id, notify);
  }
}
