import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Job} from "../../model/job";
import {JobService} from "../../service/job.service";
import {Locations} from "../../model/locations";
import {LocationsService} from "../../service/locations.service";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplyJob} from "../../model/apply-job";
import {ApplyJobService} from "../../service/apply-job.service";
import {finalize} from "rxjs";

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


  ngOnInit(): void {

    // @ts-ignore
    if (sessionStorage.getItem("user") == null) {
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

    this.filterJobs = new FormGroup({
      salary: new FormControl('allsalary'),
      years: new FormControl('allyears'),
      types: new FormControl('alltypes'),
      gender: new FormControl('any'),
    })

  }

  constructor(private jobService: JobService,
              private locationsService: LocationsService,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private applyJobService: ApplyJobService) {

  }

  findAll() {
    this.jobService.findAll().subscribe((data) => {
      this.jobs = data;
    })
  }

  findAllByStatusIsTrueAndAndExpiredDate() {
    return this.jobService.findAllByStatusIsTrueAndAndExpiredDate().subscribe((data) => {
      this.jobs = data;
      this.displayJobs = data;
      if (this.role == 0) {
        return;
      } else {
        this.applyJobService.checkApplyJob(this.user.id, data).subscribe((data1) => {
          this.checkApplyJob = data1;
          console.log(this.checkApplyJob, 'data1')
        })
        this.applyJobService.checkApplyAccept(this.user.id, data).subscribe((data2) => {
          this.checkApplyAccept = data2;
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

  // filterOnMultipleConditions
  displayJobs: Job[] = [];

  filterJobs!: FormGroup;

  scrollTop() {
    window.scrollTo(0, 300)
  }

  filterJobsMethod(event: any) {
    this.formFilterJob?.nativeElement.submit();
    let salary = this.filterJobs.get('salary')?.value;
    let years = this.filterJobs.get('years')?.value;
    let types = this.filterJobs.get('types')?.value;
    let gender = this.filterJobs.get('gender')?.value;
    this.displayJobs = this.jobs;

    this.filterSalary(salary);
    this.filterExpYears(years);
    this.filterJobTypes(types);
    this.filterJobGender(gender);

    console.log(this.displayJobs)
  }

  filterSalary(salary:string){
    if (salary == "allsalary") {
      this.displayJobs = this.jobs.filter((obj) => {
        return obj.salaryMax >= 0;
      })
    }
    if (salary == "less200") {
      this.displayJobs = this.jobs.filter((obj) => {
        return obj.salaryMax < 200;
      })
    }
    if (salary == "200-500") {
      this.displayJobs = this.jobs.filter((obj) => {
        return obj.salaryMax >= 200 && obj.salaryMax<= 500;
      })
    }
    if (salary == "500-800") {
      this.displayJobs = this.jobs.filter((obj) => {
        return obj.salaryMax >= 500 && obj.salaryMax <= 800;
      })
    }
    if (salary == "more800") {
      this.displayJobs = this.jobs.filter((obj) => {
        return obj.salaryMax > 800;
      })
    }
  }
  filterExpYears(years : string) {
    if (years == "allyears") {
      this.displayJobs = this.displayJobs.filter((obj) => {
        return obj.expYear >= 0;
      })
    }
    if (years == "0") {
      this.displayJobs = this.displayJobs.filter((obj) => {
        return obj.expYear == 0;
      })
    }
    if (years == "0-3") {
      this.displayJobs = this.displayJobs.filter((obj) => {
        return obj.expYear >= 0 && obj.expYear <= 3;
      })
    }
    if (years == "3-6") {
      this.displayJobs = this.displayJobs.filter((obj) => {
        return obj.expYear >= 3 && obj.expYear <= 6;

      })
    }
    if (years == "more6") {
      this.displayJobs = this.displayJobs.filter((obj) => {
        return obj.expYear > 6;
      })
    }
  }
  filterJobTypes(types:string) {
    if (types == "alltypes") {
      this.displayJobs = this.displayJobs.filter((obj)=>{
        return obj.type == true || obj.type == false
      })
    }
    if(types == "full"){
      this.displayJobs = this.displayJobs.filter((obj)=>{
        return obj.type == true
      })
    }
    if(types == "part") {
      this.displayJobs = this.displayJobs.filter((obj)=>{
        return !obj.type
      })
    }
  }
  filterJobGender(gender:string){
    if(gender == "any") {
      this.displayJobs = this.displayJobs.filter((obj)=> {
        return obj.gender == 3||obj.gender == 2||obj.gender == 1
      })
    }
    if(gender == "male") {
      this.displayJobs = this.displayJobs.filter((obj)=> {
        return obj.gender == 1
      })
    }
    if(gender == "female") {
      this.displayJobs = this.displayJobs.filter((obj)=> {
        return obj.gender == 2
      })
    }
  }

  @ViewChild('formJobSalary') formFilterJob: ElementRef | undefined;


}
