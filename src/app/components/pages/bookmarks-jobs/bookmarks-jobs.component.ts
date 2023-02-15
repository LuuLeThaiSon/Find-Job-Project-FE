import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JobService} from "../../service/job.service";
import {Job} from "../../model/job";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {Locations} from "../../model/locations";
import {LocationsService} from "../../service/locations.service";
import {FormControl, FormGroup} from "@angular/forms";


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
  modalTitle: string ='Post new job';

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user")) as any;
    this.role = this.user.role.id;
    this.findAll();
    this.findAllCategory();
    this.findAllLocation();
    this.jobForm = new FormGroup({
      id: new FormControl,
      title: new FormControl,
      category: new FormGroup({
        id: new FormControl
      }),
      salaryMin: new FormControl,
      salaryMax: new FormControl,
      location: new FormGroup({
        id: new FormControl
      }),
      position: new FormControl,
      expYear: new FormControl,
      type: new FormControl,
      expiredDate: new FormControl,
      quantity: new FormControl,
      gender: new FormControl,
      description: new FormControl,
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
    this.jobForm.reset();
    this.modalTitle = 'Post new job';
  }

  scroll() {
    window.scrollTo(0, 300);
  }
}
