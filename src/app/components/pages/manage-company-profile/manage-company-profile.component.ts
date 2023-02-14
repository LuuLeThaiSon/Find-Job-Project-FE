import { Component } from '@angular/core';
import {Company} from "../../model/company";
import {Job} from "../../model/job";
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "../../service/company.service";
import {JobService} from "../../service/job.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-manage-company-profile',
  templateUrl: './manage-company-profile.component.html',
  styleUrls: ['./manage-company-profile.component.css']
})
export class ManageCompanyProfileComponent {
  company!: Company;
  companyId!: number;
  jobs!:Job[];
  ggMap!:any;

  constructor(private activatedRoute: ActivatedRoute,
              private companyService: CompanyService,
              private jobService: JobService,
              private sanitized: DomSanitizer) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.companyId = params['id'];
      this.findCompanyById(this.companyId);
      this.findAllJobsByCompany(this.companyId);
    });
  }

  findCompanyById(id: number) {
    this.companyService.findCompany(id).subscribe(res => {
      this.company = res;
      this.ggMap = this.sanitized.bypassSecurityTrustHtml(res.googleMap);
      this.ggMap.setAttribute("style:width","100%")
    })
  }

  findAllJobsByCompany(id:number) {
    this.jobService.findAllJobsByCompany(id).subscribe(res => {
      this.jobs = res;
    })
  }

}
