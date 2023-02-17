import {Component, ElementRef, ViewChild} from '@angular/core';
import {Job} from "../../model/job";
import {ActivatedRoute} from "@angular/router";
import {JobService} from "../../service/job.service";
import {CommonService} from "../../service/common.service";
import {ApplyJobService} from "../../service/apply-job.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {ApplyJob} from "../../model/apply-job";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent {
  job!: Job;
  jobId!: number;
  jobs: Job[] = [];
  user!: any;
  role!: number;
  flag: boolean = false;
  applyJobId!: number;
  applyJob: ApplyJob = new ApplyJob();
  jobApply!: Job;
  cvFileName: any;
  alertApply: boolean = true;
  checkApplyJob: Boolean[] = [];
  message!: string;
  checkUpload: boolean = false;
  decline: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private jobService: JobService,
              private commonService: CommonService,
              private applyJobService: ApplyJobService,
              private storage: AngularFireStorage) {
    this.activatedRoute.params.subscribe(params => {
      this.jobId = params['id'];
      this.findOne(this.jobId);
    })
    this.findALl()
  }

  ngOnInit() {
    this.commonService.scrollTopWindow(0, 300)
    if (sessionStorage.getItem("user") == null) {
      this.role = 0;
    } else {
      // @ts-ignore
      this.user = JSON.parse(sessionStorage.getItem("user")) as any;
      this.role = this.user.role.id;
    }
  }

  findALl() {
    return this.jobService.findAll().subscribe((data) => {
      this.jobs = data;
    })
  }

  findOne(id: number) {
    return this.jobService.findOne(id).subscribe((data) => {
      this.job = data;
      if(this.role == 0) {
        return
      } else {
        this.applyJobService.findAllApplyJobByCandidateId(this.user.id).subscribe((data1) => {
          for (let i = 0; i < data1.length; i++) {
            // @ts-ignore
            if (data1[i].job.id === this.job.id) {
              this.flag = true;
              // @ts-ignore
              this.applyJobId = data1[i].id;
            }
          }
        })
      }
    })
  }

  onTop(x: number, y: number) {
    window.scrollTo(x, y);
  }

  removeApplyJob() {
    this.applyJobService.removeApplyJob(this.applyJobId).subscribe(() => {
      this.decline = false;
      this.findALl();
      this.flag = false;
      setTimeout(() => {
        this.decline = true;
      }, 3000)
    });
  }

  submitCV(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.cvFileName = event.target.files[0]
    }
  }


  apply() {
    this.checkUpload = true;
    this.applyJob.candidate = this.user;
    this.applyJob.job = this.job;
    this.applyJob.message = this.message;
    const cvPath = `cv/${this.cvFileName.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(cvPath);
    this.storage.upload(cvPath, this.cvFileName).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.applyJob.cv = url;
          this.applyJobService.save(this.applyJob).subscribe(() => {
            this.findOne(this.jobId)
            this.btnModal.nativeElement.click();
            this.alertApply = false;
            setTimeout(() => {
              this.alertApply = true;
            }, 3000)
          })
          this.checkUpload = false;
        });
      })
    ).subscribe(() => {
      window.scrollTo(0, 300);
    })
    // @ts-ignore
    document.getElementById('cv').value = ''
  }

  // @ts-ignore
  @ViewChild('btnModal') btnModal: ElementRef;
}
