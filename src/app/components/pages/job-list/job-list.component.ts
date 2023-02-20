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
import {CommonService} from "../../service/common.service";
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
  notify = new Notify();
  notifyType: NotifyType[] = [];

  ngOnInit(): void {
    this.commonService.scrollTopWindow(0, 300);

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

    this.notifyService.findAllTye().subscribe(data => {
      this.notifyType = data;
    })

    this.filterJobs = new FormGroup({
      salary: new FormControl('allsalary'),
      years: new FormControl('allyears'),
      types: new FormControl('alltypes'),
      gender: new FormControl('any'),
    })

    this.searchJobs = new FormGroup({
      text: new FormControl(),
      location: new FormGroup({
        l_id: new FormControl('all_l')
      }),
      category: new FormGroup({
        c_id: new FormControl('all_c')
      })
    })

  }

  constructor(private jobService: JobService,
              private locationsService: LocationsService,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private applyJobService: ApplyJobService,
              private notifyService: NotifyService,
              private commonService: CommonService) {

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
    this.loading = false;
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
            this.sendNotify(1, this.jobApply)
          })
          this.loading = true;
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
    window.scrollTo(0, 300)
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

  filterSalary(salary: string) {
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
        return obj.salaryMax >= 200 && obj.salaryMax <= 500;
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

  filterExpYears(years: string) {
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
        return obj.expYear > 0 && obj.expYear <= 3;
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

  filterJobTypes(types: string) {
    if (types == "alltypes") {
      this.displayJobs = this.displayJobs.filter((obj) => {
        return obj.type == true || obj.type == false
      })
    }
    if (types == "full") {
      this.displayJobs = this.displayJobs.filter((obj) => {
        return obj.type == true
      })
    }
    if (types == "part") {
      this.displayJobs = this.displayJobs.filter((obj) => {
        return !obj.type
      })
    }
  }

  filterJobGender(gender: string) {
    if (gender == "any") {
      this.displayJobs = this.displayJobs.filter((obj) => {
        return obj.gender == 3 || obj.gender == 2 || obj.gender == 1
      })
    }
    if (gender == "male") {
      this.displayJobs = this.displayJobs.filter((obj) => {
        return obj.gender == 1
      })
    }
    if (gender == "female") {
      this.displayJobs = this.displayJobs.filter((obj) => {
        return obj.gender == 2
      })
    }
  }

  @ViewChild('formJobSalary') formFilterJob: ElementRef | undefined;

  //send notifications
  sendNotify(nt: number, job: Job) {
    for (let i = 0; i < this.notifyType.length; i++) {
      if (this.notifyType[i].id == nt) {
        this.notify.notifyType = this.notifyType[i];
        this.notify.job = job;
        this.notify.company = job.company;
        this.notify.candidate = this.user;
        this.notifyService.sendNotify(this.notify).subscribe(() => {
          this.ngOnInit()
        });
      }
    }
  }

  //loading screen
  loading = true;


  searchJobs!: FormGroup
  // @ts-ignore
  searchJobsMethod() {

    window.scrollTo(0, 300)
    this.formSearchJobs?.nativeElement.submit();
    let text = this.searchJobs.get('text')?.value;
    let location = this.searchJobs.get('location')?.value;
    let category = this.searchJobs.get('category')?.value;


    if(text != null && location.l_id == "all_l" && category.c_id == "all_c") {
      return this.jobService.findJobsByTitleContainingOrCompanyName(text).subscribe((data) => {
        this.displayJobs = data;

      })
    }

    if(text == null && location.l_id != "all_l" && category.c_id == "all_c") {
      return this.jobService.findJobsByLocationId(location.l_id).subscribe((data) => {
        this.displayJobs = data;

      })
    }

    if(text == null && location.l_id == "all_l" && category.c_id != "all_c") {
      return this.jobService.findJobsByCategoryId(category.c_id).subscribe((data) => {
        this.displayJobs = data;
      })
    }

    if(text != null && location.l_id != "all_l" && category.c_id == "all_c") {
      return this.jobService.findJobsByTitleContainingAndLocationId(text, location.l_id).subscribe((data) => {
        this.displayJobs = data;
      })
    }

    if(text != null && location.l_id == "all_l" && category.c_id != "all_c") {
      return this.jobService.findJobsByTitleContainingAndCategoryId(text, category.c_id).subscribe((data) => {
        this.displayJobs = data;
      })
    }

    if(text == null && location.l_id != "all_l" && category.c_id != "all_c") {
      return this.jobService.findJobsByLocationIdAndCategoryId(location.l_id, category.c_id).subscribe((data) => {
        this.displayJobs = data;
      })
    }

    if(text != null && location.l_id != "all_l" && category.c_id != "all_c") {
      return this.jobService.findJobsByTitleAndLocationAndCompany(text,location.l_id,category.c_id).subscribe((data) => {
        this.displayJobs = data;
      })
    }
    this.displayJobs = this.jobs;


  }
  @ViewChild('formJob') formSearchJobs: ElementRef | undefined;
}
