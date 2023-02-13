import {Component, OnInit} from '@angular/core';
import {Job} from "../../model/job";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {JobService} from "../../service/job.service";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent {
  job!: Job;
  jobId!: number;
  jobs: Job[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private jobService: JobService) {
    this.activatedRoute.params.subscribe(params => {
      this.jobId = params['id'];
      this.findOne(this.jobId);
    })
    this.findALl()
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

  onTop() {
    window.scrollTo(0, 600);
  }
}
