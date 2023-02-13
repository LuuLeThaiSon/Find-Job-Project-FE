import {Component, ElementRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Company} from "../../model/company";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  city!: string;
  constructor(private http: HttpClient) {
  }
  ip!:string;
  user!:any;
  role!:any;


  ngOnInit() {{
    // this.getGeoLocationData();
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user")) as any;
    this.role = this.user.role.id;
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

  signOut() {
    sessionStorage.clear()
  }
}

