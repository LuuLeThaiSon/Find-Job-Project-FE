import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  city!: string;
  constructor(private http: HttpClient) {
  }
  ip!:string;
  url = "";

  ngOnInit() {{
    this.getGeoLocationData();
  }}

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
}
