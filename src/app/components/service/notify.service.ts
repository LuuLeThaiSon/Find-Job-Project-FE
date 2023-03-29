import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notify} from "../model/notify";
import {NotifyType} from "../model/notify-type";
import {environments} from "../../../environment/enviroments";

const apiUrl = environments.apiUrl

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private http: HttpClient) { }

  findAllCompanyNotify(id: number): Observable<Notify[]> {
    return this.http.get<Notify[]>(`${apiUrl}/notify/company/${id}`);
  }
  findAllCandidateNotify(id: number): Observable<Notify[]> {
    return this.http.get<Notify[]>(`${apiUrl}/notify/candidate/${id}`);
  }

  countUnreadCandidateNotify(id: number): Observable<number> {
    return this.http.get<number>(`${apiUrl}/notify/count-unread/candidate/${id}`)
  }

  countUnreadCompanyNotify(id: number): Observable<number> {
    return this.http.get<number>(`${apiUrl}/notify/count-unread/company/${id}`)
  }

  readNotify(notify: Notify): Observable<Notify> {
    return this.http.put<Notify>(`${apiUrl}/notify/${notify.id}`, notify);
  }

  sendNotify(notify: Notify): Observable<Notify> {
    return this.http.post<Notify>(`${apiUrl}/notify`, notify);
  }

  findAllTye(): Observable<NotifyType[]> {
    return this.http.get<NotifyType[]>(`${apiUrl}/notify/type`)
  }
}
