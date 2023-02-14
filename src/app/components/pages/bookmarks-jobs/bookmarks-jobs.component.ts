import {Component, OnInit} from '@angular/core';
import {JobService} from "../../service/job.service";
import {Job} from "../../model/job";
import {MessageService} from 'primeng/api';
import {PrimeNGConfig} from 'primeng/api';


@Component({
  selector: 'app-bookmarks-jobs',
  templateUrl: './bookmarks-jobs.component.html',
  styleUrls: ['./bookmarks-jobs.component.css'],
  providers: [MessageService]
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
    this.primengConfig.ripple = true;
  }


  constructor(private jobService: JobService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) {
  }

  findAll() {
    return this.jobService.findAll().subscribe((data) => {
      this.jobs = data;
    })
  }

  delete(id: number) {
    return this.jobService.deleteJob(id).subscribe(() => {
      this.findAll();
      this.showSuccess()
    })
  }

  getJobId(id: number) {
    this.jobId = id;
  }

  showSuccess() {
    this.messageService.add({severity:'info', summary: 'Success', detail: 'Message Content'});
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
