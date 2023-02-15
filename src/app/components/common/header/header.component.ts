import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Company} from "../../model/company";
import {Subject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit{
  city!: string;
  constructor(private http: HttpClient,
              private elementRef: ElementRef) {
  }
  ip!:string;
  user!:any;
  role!:any;

  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/libs/choices.js/public/assets/scripts/choices.min.js";
    this.elementRef.nativeElement.appendChild(s);

    var s7 = document.createElement("script");
    s7.type = "text/javascript";
    s7.src = "https://unicons.iconscout.com/release/v4.0.0/script/monochrome/bundle.js";
    this.elementRef.nativeElement.appendChild(s7);

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
  }


  ngOnInit() {{
    // this.getGeoLocationData();
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user")) as any;
    this.role = this.user.role.id;
  }}

  ngOnChanges() {
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user")) as any;
  }

  getIp() {
    this.http.get("https://api.ipify.org?format=json").subscribe((res:any) => {
      this.ip = res.ip;
      this.getGeoLocationData();
    })
  }

  getGeoLocationData() {{
    this.getIp();
    this.http.get(`https://ipinfo.io/${this.ip}?token=7ff38042377c00`).subscribe((res:any) => {
      this.city = res.city;
      }
    )
  }}

  signOut() {
    sessionStorage.clear()
  }
}

