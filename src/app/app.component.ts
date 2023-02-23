import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {CategoryService} from "./components/service/category.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'find-job-FE';
  constructor(private elementRef:ElementRef) {
  };

  ngAfterViewInit() {
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

    var s8 = document.createElement("script");
    s8.type = "text/javascript";
    s8.src = "../../assets/js/pages/area-filter-range.init.js";
    this.elementRef.nativeElement.appendChild(s8);

    var s9 = document.createElement("script");
    s9.type = "text/javascript";
    s9.src = "../../assets/js/pages/blog-details.init.js";
    this.elementRef.nativeElement.appendChild(s9);

    var s10 = document.createElement("script");
    s10.type = "text/javascript";
    s10.src = "../../assets/js/pages/candidate.init.js";
    this.elementRef.nativeElement.appendChild(s10);

    var s11 = document.createElement("script");
    s11.type = "text/javascript";
    s11.src = "../../assets/js/pages/checkbox.init.js";
    this.elementRef.nativeElement.appendChild(s11);

    var s12 = document.createElement("script");
    s12.type = "text/javascript";
    s12.src = "../../assets/js/pages/coming-soon.init.js";
    this.elementRef.nativeElement.appendChild(s12);

    var s13 = document.createElement("script");
    s13.type = "text/javascript";
    s13.src = "../../assets/js/pages/componets.init.js";
    this.elementRef.nativeElement.appendChild(s13);

    var s14 = document.createElement("script");
    s14.type = "text/javascript";
    s14.src = "../../assets/js/pages/contact.js";
    this.elementRef.nativeElement.appendChild(s14);

    var s15 = document.createElement("script");
    s15.type = "text/javascript";
    s15.src = "../../assets/js/pages/index.js";
    this.elementRef.nativeElement.appendChild(s15);

    var s16 = document.createElement("script");
    s16.type = "text/javascript";
    s16.src = "../../assets/js/pages/job-grid.init.js";
    this.elementRef.nativeElement.appendChild(s16);

    var s17 = document.createElement("script");
    s17.type = "text/javascript";
    s17.src = "../../assets/js/pages/lightbox.init.js";
    this.elementRef.nativeElement.appendChild(s17);

    //google Map
    // var s18 = document.createElement("script");
    // s18.type = "text/javascript";
    // s18.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCVud1tqiqM5yeJgZQfU5bGKrlb1L-nrHs&libraries=places&language=en";
    // this.elementRef.nativeElement.appendChild(s18);

  }
}
