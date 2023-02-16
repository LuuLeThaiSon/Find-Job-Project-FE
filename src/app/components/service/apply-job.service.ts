import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HttpClient} from "@angular/common/http";
import {ApplyJob} from "../model/apply-job";
import {finalize, Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Job} from "../model/job";
import {JobService} from "./job.service";

@Injectable({
  providedIn: 'root'
})
export class ApplyJobService {

  constructor(private http:HttpClient,
              private storage: AngularFireStorage,
              private jobService: JobService) {
  }

  save(applyJob: ApplyJob): Observable<ApplyJob> {
    return this.http.post<ApplyJob>("http://localhost:8080/apply", applyJob);
  }
  applySave(cvFileName: any, applyJob: ApplyJob, applyForm: FormGroup, user: any, jobApply: Job) {
    const cvPath = `cv/${cvFileName.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(cvPath);
    this.storage.upload(cvPath, cvFileName).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          applyJob = applyForm.value;
          applyJob.candidate = user;
          applyJob.job = jobApply;
          applyJob.cv = url;
          this.save(applyJob).subscribe(() => {
            this.jobService.findAll();
          })
        });
      })
    ).subscribe(() => {
      window.scrollTo(0, 300);
      applyForm.reset();
    })
  }



}
