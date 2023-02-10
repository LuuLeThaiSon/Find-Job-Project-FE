import {Component} from '@angular/core';
import {JobService} from "../../service/job.service";
import {Job} from "../../model/job";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent{
  jobs: Job[] = [];
  constructor(private jobService: JobService) {
    this.findAll();
  };
  findAll() {
    return this.jobService.findAll().subscribe((data) => {
      this.jobs = data;
      console.log(data)
    })
  }
}
