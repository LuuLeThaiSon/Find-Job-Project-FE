import {Component, OnInit} from '@angular/core';
import {JobService} from "../../service/job.service";
import {Job} from "../../model/job";


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
  p!: number;

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user")) as any;
    this.role = this.user.role.id;
    this.findAll();
  }


  constructor(private jobService: JobService) {
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
}
