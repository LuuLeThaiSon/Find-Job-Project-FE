import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Job} from "../../model/job";
import {JobService} from "../../service/job.service";
import {Locations} from "../../model/locations";
import {LocationsService} from "../../service/locations.service";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup} from "@angular/forms";
import {ApplyJob} from "../../model/apply-job";
import {ApplyJobService} from "../../service/apply-job.service";
import {finalize} from "rxjs";
import {NotifyService} from "../../service/notify.service";
import {Notify} from "../../model/notify";
import {NotifyType} from "../../model/notify-type";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  locationText: string = 'Location';
  categoryText: string = 'Category';
  locations: Locations[] = [];
  categories: Category[] = [];
  p: number = 1;
  jobId!: number;
  jobs: Job[] = [];
  user!:any;
  role!:number;
  searchText = "";
  applyForm!: FormGroup;
  applyJob: ApplyJob = new ApplyJob();
  jobApply!: Job;
  cvFileName: any;
  alertApply: boolean = true;
  checkApplyJob: Boolean[] = [];
  checkApplyAccept: Boolean[] = [];
  message!: string;
  checkUpload: boolean = false;
  notify = new Notify();
  notifyType: NotifyType[] = [];

  ngOnInit(): void {

    // @ts-ignore
    if (sessionStorage.getItem("user")==null) {
      this.user = null;
      this.role = 0;
    } else {
      // @ts-ignore
      this.user = JSON.parse(sessionStorage.getItem("user")) as any;
      this.role = this.user.role.id;
    }

    this.applyForm = new FormGroup({
      message: new FormControl('')
    });

    this.findAllByStatusIsTrueAndAndExpiredDate();
    this.findAllLocations();
    this.findAllCategories();
    this.notifyService.findAllTye().subscribe(data => {
      this.notifyType = data;
    })
  }

  constructor(private jobService: JobService,
              private locationsService: LocationsService,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private applyJobService: ApplyJobService,
              private notifyService: NotifyService) {

  }

  findAll() {
    this.jobService.findAll().subscribe((data) => {
      this.jobs = data;
    })
  }

  findAllByStatusIsTrueAndAndExpiredDate() {
    return this.jobService.findAllByStatusIsTrueAndAndExpiredDate().subscribe((data) => {
      this.jobs = data;
      if(this.role == 0) {
        return;
      } else {
        this.applyJobService.checkApplyJob(this.user.id, data).subscribe((data1) => {
          this.checkApplyJob = data1.reverse();
          console.log(this.checkApplyJob, 'data1')
        })
        this.applyJobService.checkApplyAccept(this.user.id, data).subscribe((data2) => {
          this.checkApplyAccept = data2.reverse();
          console.log(this.checkApplyAccept, 'data2')
        })
      }
    })
  }

  findAllLocations() {
    return this.locationsService.findAll().subscribe((data) => {
      this.locations = data;
    })
  }

  findAllCategories() {
    return this.categoryService.findAll().subscribe((data) => {
      this.categories = data;
    })
  }


  applyJobId(job: Job) {
    this.jobApply = job;
  }

  apply() {
    this.checkUpload = true;
    this.applyJob.candidate = this.user;
    this.applyJob.job = this.jobApply;
    this.applyJob.message = this.message;
    const cvPath = `cv/${this.cvFileName.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(cvPath);
    this.storage.upload(cvPath, this.cvFileName).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.applyJob.cv = url;
          this.applyJobService.save(this.applyJob).subscribe(() => {
            this.findAllByStatusIsTrueAndAndExpiredDate();
            this.btnModal.nativeElement.click();
            this.applyForm.reset();
            this.applyForm.reset();
            this.alertApply = false;
            setTimeout(() => {
              this.alertApply = true;
            }, 3000)
            this.sendNotify(1,this.jobApply)
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

  submitCV(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.cvFileName = event.target.files[0]
    }
  }

  // @ts-ignore
  @ViewChild('btnModal') btnModal: ElementRef;
  decline: any;

  scrollTop() {
    window.scrollTo(0, 300)
  }

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
}
