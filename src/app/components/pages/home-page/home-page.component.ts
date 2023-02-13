import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {JobService} from "../../service/job.service";
import {Job} from "../../model/job";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit{
  jobs: Job[] = [];

  constructor(private jobService: JobService,
              private elementRef: ElementRef) {
    this.findAll();
  };

  ngAfterViewInit() {
    // var s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = "../../assets/libs/choices.js/public/assets/scripts/choices.min.js";
    // this.elementRef.nativeElement.appendChild(s);
    //
    // var s6 = document.createElement("script");
    // s6.type = "text/javascript";
    // s6.src = "../../assets/libs/bootstrap/js/bootstrap.bundle.min.js";
    // this.elementRef.nativeElement.appendChild(s6);
    // var s7 = document.createElement("script");
    // s7.type = "text/javascript";
    // s7.src = "https://unicons.iconscout.com/release/v4.0.0/script/monochrome/bundle.js";
    // this.elementRef.nativeElement.appendChild(s7);
    //
    // var s1 = document.createElement("script");
    // s1.type = "text/javascript";
    // s1.src = "../../assets/libs/swiper/swiper-bundle.min.js";
    // this.elementRef.nativeElement.appendChild(s1);
    //
    // var s2 = document.createElement("script");
    // s2.type = "text/javascript";
    // s2.src = "../../assets/js/pages/job-list.init.js";
    // this.elementRef.nativeElement.appendChild(s2);
    //
    // var s3 = document.createElement("script");
    // s3.type = "text/javascript";
    // s3.src = "../../assets/js/pages/index.init.js";
    // this.elementRef.nativeElement.appendChild(s3);
    //
    // var s4 = document.createElement("script");
    // s4.type = "text/javascript";
    // s4.src = "../../assets/js/app.js";
    // this.elementRef.nativeElement.appendChild(s4);
    //
    // var s5 = document.createElement("script");
    // s5.type = "text/javascript";
    // s5.src = "../../assets/js/pages/switcher.init.js";
    // this.elementRef.nativeElement.appendChild(s5);
  }

  findAll() {
    return this.jobService.findAll().subscribe((data) => {
      this.jobs = data;
      console.log(data)
    })
  }
}
