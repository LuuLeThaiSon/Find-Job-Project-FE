import { Component } from '@angular/core';
import {Job} from "../../model/job";
import {JobService} from "../../service/job.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent {
  p: number = 1;
  jobId!: number;
  jobs: Job[] = [];
  constructor(private jobService: JobService) {
    this.findAll()
  }
  findAll() {
    return this.jobService.findAll().subscribe((data) => {
      this.jobs = data;
    })
  }
}
