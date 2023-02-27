import {Component, ElementRef, ViewChild} from '@angular/core';
import {Job} from "../../model/job";
import {ActivatedRoute} from "@angular/router";
import {JobService} from "../../service/job.service";
import {CommonService} from "../../service/common.service";
import {ApplyJobService} from "../../service/apply-job.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {ApplyJob} from "../../model/apply-job";
import {NotifyType} from "../../model/notify-type";
import {NotifyService} from "../../service/notify.service";
import {Notify} from "../../model/notify";
import {MessageService} from "primeng/api";
import {DomSanitizer} from "@angular/platform-browser";

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
  checkAccepted: boolean = false;
  applyJobId!: number;
  applyJob: ApplyJob = new ApplyJob();
  jobApply!: Job;
  cvFileName: any;
  alertApply: boolean = true;
  checkApplyJob: Boolean[] = [];
  checkUpload: boolean = false;
  decline: boolean = true;
  notifyType: NotifyType[] =[];
  notify = new Notify();

  constructor(private activatedRoute: ActivatedRoute,
              private jobService: JobService,
              private commonService: CommonService,
              private applyJobService: ApplyJobService,
              private storage: AngularFireStorage,
              private notifyService: NotifyService,
              private messageService: MessageService,
              private sanitized: DomSanitizer,) {
    this.activatedRoute.params.subscribe(params => {
      this.jobId = params['id'];
      this.findOne(this.jobId);
    })
    this.findALl()
    this.notifyService.findAllTye().subscribe(data => {
      this.notifyType = data;
    })
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
    return this.jobService.findAllByStatusIsTrueAndAndExpiredDate().subscribe((data) => {
      this.jobs = data;
    })
  }

  findOne(id: number) {
    return this.jobService.findOne(id).subscribe((data) => {
      this.job = data;
      this.description = this.sanitized.bypassSecurityTrustHtml(data.description);
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
              // @ts-ignore
              this.checkAccepted = data1[i].status;
            }
          }
        })
      }
    })
  }

  onTop(x: number, y: number) {
    window.scrollTo(x, y);
    this.ngOnInit()
  }

  removeApplyJob() {
    this.applyJobService.removeApplyJob(this.applyJobId).subscribe(() => {
      this.decline = false;
      this.findALl();
      this.flag = false;
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Cancel successfully'});
      this.sendNotify(2, this.job)
    });
  }

  submitCV(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.cvFileName = event.target.files[0]
    }
  }


  apply() {
    if (this.cvFileName == null) {
      return this.messageService.add({severity:'error', summary: 'Error', detail: 'Must be upload your CV'});

    }
    this.loading = false;
    this.checkUpload = true;
    this.applyJob.candidate = this.user;
    this.applyJob.job = this.job;
    const cvPath = `cv/${this.cvFileName.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(cvPath);
    this.storage.upload(cvPath, this.cvFileName).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.applyJob.cv = url;
          this.applyJobService.save(this.applyJob).subscribe(() => {
            this.findOne(this.jobId)
            this.btnModal.nativeElement.click();
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Apply successfully'});
            this.sendNotify(1, this.job);
          })
          this.loading = true;
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

  sendNotify(nt: number, job: Job) {
    for (let i = 0; i < this.notifyType.length; i++) {
      if (this.notifyType[i].id == nt) {
        this.notify.notifyType = this.notifyType[i];
        this.notify.job = job;
        this.notify.company = job.company;
        this.notify.candidate= this.user;
        this.notifyService.sendNotify(this.notify).subscribe(() => {
          this.ngOnInit()
        });
      }
    }
  }

  //loading screen
  loading = true;
  description: any;
}
