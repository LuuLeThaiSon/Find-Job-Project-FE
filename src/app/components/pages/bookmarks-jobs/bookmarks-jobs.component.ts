import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JobService} from "../../service/job.service";
import {Job} from "../../model/job";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {Locations} from "../../model/locations";
import {LocationsService} from "../../service/locations.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplyJob} from "../../model/apply-job";
import {ApplyJobService} from "../../service/apply-job.service";
import {NotifyType} from "../../model/notify-type";
import {Notify} from "../../model/notify";
import {NotifyService} from "../../service/notify.service";
import {MessageService} from "primeng/api";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-bookmarks-jobs',
  templateUrl: './bookmarks-jobs.component.html',
  styleUrls: ['./bookmarks-jobs.component.css']
})
export class BookmarksJobsComponent implements OnInit {
  dateCurrent = new Date()
  minDate?: string;

  user!: any;
  role!: any;
  job: any = "";
  jobId!: number;
  jobs: Job[] = [];
  categories: Category[] = [];
  locations: Locations[] = [];
  p!: number;
  jobForm!: FormGroup;
  modalTitle: string = 'Post new job';
  salaryMin!: number;
  salaryMax!: number;
  salary: boolean = false;
  applyJobs: ApplyJob[] = [];
  applyJob!: ApplyJob;
  applyJobId!: number;

  notifyType: NotifyType[] = [];
  notify = new Notify();
  rejectJob!: Job | undefined;

  jobStatus!: Boolean;
//ckEditor
  public Editor = ClassicEditor;

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user")) as any;
    this.role = this.user.role.id;
    this.findAll();
    this.findAllCategory();
    this.findAllLocation();
    this.form();

    this.minDate = this.dateCurrent.toISOString().substring(0, 10);
  }

  form() {
    this.jobForm = new FormGroup({
      id: new FormControl,
      title: new FormControl('', Validators.required),
      category: new FormGroup({
        id: new FormControl(1)
      }, Validators.required),
      salaryMin: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(1)]),
      salaryMax: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(1)]),
      location: new FormGroup({
        id: new FormControl(1)
      }),
      position: new FormControl('', Validators.required),
      expYear: new FormControl('', Validators.required),
      type: new FormControl(true, Validators.required),
      expiredDate: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      gender: new FormControl('1', Validators.required),
      description: new FormControl('', Validators.required),
      company: new FormGroup({
        id: new FormControl
      })
    })
  }


  constructor(private jobService: JobService,
              private categoryService: CategoryService,
              private locationService: LocationsService,
              private applyjobService: ApplyJobService,
              private notifyService: NotifyService,
              private messageService: MessageService) {
    this.notifyService.findAllTye().subscribe(data => {
      this.notifyType = data;
    })
  }

  findAll() {
    return this.jobService.findAllJobsByCompany(this.user.id).subscribe((data) => {
      this.jobs = data;
    })
  }

  delete(id: number) {
    return this.jobService.deleteJob(id).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Delete', detail: 'Successfully!'});
      this.ngOnInit();
    })
  }

  getJobId(id: number) {
    this.jobId = id;
  }

  blockJob(job: Job) {
    return this.jobService.blockJob(job.id, job).subscribe(() => {
      if (job.status) {
        this.messageService.add({severity: 'success', summary: 'Block', detail: 'Successfully!'});
      } else {
        this.messageService.add({severity: 'success', summary: 'UnBlock', detail: 'Successfully!'});
      }
      this.findAll();

    })
  }

  getJob(j: Job) {
    this.job = j;
  }

  findAllCategory() {
    return this.categoryService.findAll().subscribe((data) => {
      this.categories = data;
    })
  }

  findAllLocation() {
    return this.locationService.findAll().subscribe((data) => {
      this.locations = data;
    })
  }

  create() {
    this.job = this.jobForm.value;
    this.job.company.id = this.user.id;
    if (+this.job.salaryMax < +this.job.salaryMin) {
      return
    }
    if (this.job.id == null) {
      this.jobService.create(this.job).subscribe(() => {
        this.findAll();
        this.btnModal.nativeElement.click();
        this.jobForm.reset();
        this.messageService.add({severity: 'success', summary: 'Create', detail: 'Successfully!'});
      });
    } else {
      this.job.status = this.jobStatus;
      this.jobService.update(this.job, this.job.id).subscribe(() => {
        this.findAll();
        this.btnModal.nativeElement.click();
        this.jobForm.reset();
        this.messageService.add({severity: 'success', summary: 'Update', detail: 'Successfully!'});
      });
    }

  }

  openModalEdit(job: Job) {
    this.jobForm.reset();
    this.job = job;
    this.jobStatus = this.job.status;
    this.jobForm.patchValue(this.job);
    this.modalTitle = 'Edit job';
  }

  // @ts-ignore
  @ViewChild('btnModal') btnModal: ElementRef;

  formatForm() {
    this.modalTitle = 'Post new job';
    this.form()
  }

  scroll() {
    window.scrollTo(0, 300);
  }

  validateSalary() {
    // @ts-ignore
    this.salaryMax = +document.getElementById('salaryMax').value
    if (this.salaryMax < this.salaryMin) {
      this.salary = true;
    } else {
      this.salary = false;
    }
  }

  getSalaryMin() {
    // @ts-ignore
    this.salaryMin = +document.getElementById('salaryMin').value;
  }

  findAllApplyJobByJob(id: number) {
    return this.applyjobService.findAllApplyJobByJob(id).subscribe((data) => {
      this.applyJobs = data;
    })
  }

  rejectApply(id: any) {
    this.applyjobService.findOne(id).subscribe(data => {
      this.rejectJob = data.job;
      this.applyjobService.removeApplyJob(id).subscribe(() => {
        this.findAllApplyJobByJob(id);
        // @ts-ignore
        document.getElementById(id).setAttribute("hidden", 'true');
        this.sendNotify(4, this.rejectJob)
        this.messageService.add({severity: 'success', summary: 'Reject', detail: 'Successfully!'});
      })
    })

  }


  acceptJob(applyJob: ApplyJob) {
    return this.applyjobService.acceptJob(applyJob).subscribe(() => {
      // @ts-ignore
      document.getElementById('accept' + applyJob.id).setAttribute("disabled", 'true');
      // @ts-ignore
      document.getElementById('reject' + applyJob.id).setAttribute("disabled", 'true');
      this.sendNotify(3, applyJob.job)
      this.messageService.add({severity: 'success', summary: 'Accept', detail: 'Successfully!'});

    })
  }

  getApplyJob(aj: ApplyJob) {
    this.applyJob = aj;
    // @ts-ignore
    this.applyJobId = +aj.id;
  }

  sendNotify(nt: number, job: Job | undefined) {
    for (let i = 0; i < this.notifyType.length; i++) {
      if (this.notifyType[i].id == nt) {
        this.notify.notifyType = this.notifyType[i];
        this.notify.job = job;
        // @ts-ignore
        this.notify.company = job.company;
        this.notify.candidate = this.applyJob.candidate;
        this.notifyService.sendNotify(this.notify).subscribe(() => {
          this.ngOnInit()
        });
      }
    }
  }

  candidateProfile() {
    this.profile.nativeElement.click();
  }

  // @ts-ignore
  @ViewChild('profile') profile: ElementRef;

  showInfo() {
    this.messageService.add({severity: 'success', summary: 'Info', detail: 'Message Content'});
  }
}
