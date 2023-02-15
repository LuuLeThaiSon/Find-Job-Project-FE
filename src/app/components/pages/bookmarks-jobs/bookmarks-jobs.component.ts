import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JobService} from "../../service/job.service";
import {Job} from "../../model/job";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {Locations} from "../../model/locations";
import {LocationsService} from "../../service/locations.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-bookmarks-jobs',
  templateUrl: './bookmarks-jobs.component.html',
  styleUrls: ['./bookmarks-jobs.component.css']
})
export class BookmarksJobsComponent implements OnInit {

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


  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user")) as any;
    this.role = this.user.role.id;
    this.findAll();
    this.findAllCategory();
    this.findAllLocation();
    this.form();
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
              private locationService: LocationsService) {
  }

  findAll() {
    return this.jobService.findAll().subscribe((data) => {
      this.jobs = data;
    })
  }

  delete(id: number) {
    return this.jobService.deleteJob(id).subscribe(() => {
      this.findAll();
    })
  }

  getJobId(id: number) {
    this.jobId = id;
  }

  blockJob(job: Job) {
    return this.jobService.blockJob(job.id, job).subscribe(() => {
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
    console.log(this.job, this.user.id);
    return this.jobService.create(this.job).subscribe(() => {
      this.findAll();
      this.btnModal.nativeElement.click();
      this.jobForm.reset();
    });
  }

  openModalEdit(job: Job) {
    this.jobForm.reset();
    this.job = job;
    console.log(this.job)
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
    console.log(this.salaryMin);
  }
}
