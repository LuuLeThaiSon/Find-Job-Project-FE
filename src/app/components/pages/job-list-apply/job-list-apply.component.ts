import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CandidateService} from "../../service/candidate.service";
import {CompanyService} from "../../service/company.service";
import {JobService} from "../../service/job.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {CategoryService} from "../../service/category.service";
import {CommonService} from "../../service/common.service";
import {Candidate} from "../../model/candidate";
import {Job} from "../../model/job";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HeaderComponent} from "../../common/header/header.component";
import {Company} from "../../model/company";
import {ApplyJobService} from "../../service/apply-job.service";
import {ApplyJob} from "../../model/apply-job";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-job-list-apply',
  templateUrl: './job-list-apply.component.html',
  styleUrls: ['./job-list-apply.component.css'],
  providers: [MessageService]

})
export class JobListApplyComponent {

  candidate!: Candidate;
  candidateId!: number;
  company!: Company
  jobs!: Job[];
  ggMap!: any;
  formCandidate!: FormGroup;
  imageFile: any;
  path!: string;
  pathName!: string;
  edited!: boolean;
  p: number = 1;
  role!: number;
  searchText = "";
  checkApplyJob: Boolean[] = [];
  jobApply!: Job;
  jobCandidate!: ApplyJob

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private candidateService: CandidateService,
              private companyService: CompanyService,
              private jobService: JobService,
              private sanitized: DomSanitizer,
              private storage: AngularFireStorage,
              private categoryService: CategoryService,
              private commonService: CommonService,
              private elementRef: ElementRef,
              private applyJobService: ApplyJobService,
              private messageService: MessageService) {
  }

  ngAfterViewInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/libs/choices.js/public/assets/scripts/choices.min.js";
    this.elementRef.nativeElement.appendChild(s);

    var s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "../../assets/libs/swiper/swiper-bundle.min.js";
    this.elementRef.nativeElement.appendChild(s1);

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "../../assets/js/pages/job-list.init.js";
    this.elementRef.nativeElement.appendChild(s2);

    var s3 = document.createElement("script");
    s3.type = "text/javascript";
    s3.src = "../../assets/js/pages/index.init.js";
    this.elementRef.nativeElement.appendChild(s3);

    var s4 = document.createElement("script");
    s4.type = "text/javascript";
    s4.src = "../../assets/js/app.js";
    this.elementRef.nativeElement.appendChild(s4);

    var s5 = document.createElement("script");
    s5.type = "text/javascript";
    s5.src = "../../assets/js/pages/switcher.init.js";
    this.elementRef.nativeElement.appendChild(s5);

    var s7 = document.createElement("script");
    s7.type = "text/javascript";
    s7.src = "https://unicons.iconscout.com/release/v4.0.0/script/monochrome/bundle.js";
    this.elementRef.nativeElement.appendChild(s7);
  }

  ngOnChanges() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/libs/choices.js/public/assets/scripts/choices.min.js";
    this.elementRef.nativeElement.appendChild(s);

    var s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "../../assets/libs/swiper/swiper-bundle.min.js";
    this.elementRef.nativeElement.appendChild(s1);

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "../../assets/js/pages/job-list.init.js";
    this.elementRef.nativeElement.appendChild(s2);

    var s3 = document.createElement("script");
    s3.type = "text/javascript";
    s3.src = "../../assets/js/pages/index.init.js";
    this.elementRef.nativeElement.appendChild(s3);

    var s4 = document.createElement("script");
    s4.type = "text/javascript";
    s4.src = "../../assets/js/app.js";
    this.elementRef.nativeElement.appendChild(s4);

    var s5 = document.createElement("script");
    s5.type = "text/javascript";
    s5.src = "../../assets/js/pages/switcher.init.js";
    this.elementRef.nativeElement.appendChild(s5);

    var s7 = document.createElement("script");
    s7.type = "text/javascript";
    s7.src = "https://unicons.iconscout.com/release/v4.0.0/script/monochrome/bundle.js";
    this.elementRef.nativeElement.appendChild(s7);
  }

  ngOnInit() {
    this.commonService.scrollTopWindow(0, 400);
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.candidateId = params['id'];
    });
    this.jobService.findAllJobsByCandidate(this.candidateId).subscribe(res => {
      this.jobs = res;
    })
  }


  @ViewChild(HeaderComponent)
  header: HeaderComponent | undefined;

  loading!: boolean;


  applyJobId(job: Job) {
    this.jobApply = job;
  }


  scrollTop() {
    window.scrollTo(0, 100)
  }

  // deleteJob(id: number, id1: number) {
  //   this.applyJobService.removeApplyJobCandidate(id, id1).subscribe(() => {
  //     this.showSuccess()
  //     this.ngOnInit()
  //   })
  // }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'success', detail: 'Delete Successfully!'})
  }

  getDeleteJob(job: Job) {
    this.applyJobId(job)
  }

  deleteJob(id: number, id1: number) {
    this.applyJobService.removeApplyJobCandidate(id, id1).subscribe(() => {
      this.showSuccess()
      this.ngOnInit()
    })
  }

  deleteJobId(id: number) {
    this.applyJobService.removeApplyJobCandidate(this.candidateId, id).subscribe(() => {
      this.showSuccess()
      this.ngOnInit()
    })
  }

  openCancelModal(id: number) {
    this.modalId = id;
    // @ts-ignore
    document.getElementById(`openCancelModal`).click();
  }

  modalId!: number;
}


