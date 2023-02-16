import {Component, OnInit} from '@angular/core';
import {Job} from "../../model/job";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {JobService} from "../../service/job.service";
import {CommonService} from "../../service/common.service";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent {
  job!: Job;
  jobId!: number;
  jobs: Job[] = [];
  role!:number;

  constructor(private activatedRoute: ActivatedRoute,
              private jobService: JobService,
              private commonService: CommonService) {
    this.activatedRoute.params.subscribe(params => {
      this.jobId = params['id'];
      this.findOne(this.jobId);
    })
    this.findALl()
  }

  ngOnInit() {
    this.commonService.scrollTopWindow(0,300)
    if(sessionStorage.getItem("user") == null) {
      this.role = 0;
    }else {
      // @ts-ignore
      this.role = JSON.parse(sessionStorage.getItem("user")).role.id;
      console.log(this.role)
    }
    console.log(this.role)
  }

  findALl() {
    return this.jobService.findAll().subscribe((data) => {
      this.jobs = data;
    })
  }
  findOne(id: number) {
    return this.jobService.findOne(id).subscribe((data) => {
      this.job = data;
    })
  }

  onTop(x: number, y: number) {
    window.scrollTo(x, y);
  }
}
