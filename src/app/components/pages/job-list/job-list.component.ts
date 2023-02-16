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
import {finalize} from "rxjs";
import {ApplyJobService} from "../../service/apply-job.service";

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
  user!: any;
  role!: number;
  applyForm!: FormGroup;
  applyJob!: ApplyJob;
  jobApply!: Job;
  cvFileName: any;
  alertApply: boolean = true;



  ngOnInit(): void {
    this.findAllByStatusIsTrueAndAndExpiredDate();
    this.findAllLocations();
    this.findAllCategories();
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user")) as any;
    console.log(this.user.tel)
    this.role = this.user.role.id;
  }

  constructor(private jobService: JobService,
              private locationsService: LocationsService,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private applyJobService: ApplyJobService) {
    this.applyForm = new FormGroup({
      message: new FormControl
    })

  }

  findAll() {
    return this.jobService.findAll().subscribe((data) => {
      this.jobs = data;
    })
  }

  findAllByStatusIsTrueAndAndExpiredDate() {
    return this.jobService.findAllByStatusIsTrueAndAndExpiredDate().subscribe((data) => {
      this.jobs = data;
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

  public searchByTitleJobOrCompanyName(key: string): void {
    const results: Job[] = [];
    for (const job of this.jobs) {
      if (job.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 || job.company.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(job)
      }
    }
    this.jobs = results;
    if (!key) {
      this.ngOnInit()
    }
  }

  applyJobId(job: Job) {
    this.jobApply = job;
  }

  apply() {
    this.applyJobService.applySave(this.cvFileName, this.applyJob, this.applyForm, this.user, this.jobApply);
    this.btnModal.nativeElement.click();
    this.applyForm.reset()
    // @ts-ignore
    document.getElementById('cv').value = ''
    this.alertApply = false;
    setTimeout(() => {
      this.alertApply = true;
    }, 3000)
  }

  submitCV(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.cvFileName = event.target.files[0]
    }
  }
  // @ts-ignore
  @ViewChild('btnModal') btnModal: ElementRef;
}
