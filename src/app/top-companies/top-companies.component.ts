import {Component} from '@angular/core';
import {CompanyService} from "../components/service/company.service";
import {Company} from "../components/model/company";
import {CommonService} from "../components/service/common.service";
import {DomSanitizer} from "@angular/platform-browser";
import {JobService} from "../components/service/job.service";

@Component({
  selector: 'app-top-companies',
  templateUrl: './top-companies.component.html',
  styleUrls: ['./top-companies.component.css']
})
export class TopCompaniesComponent {
  companies: Company[] = [];
  description: any;
  sumQuantity: number[] = [];

  constructor(private companyService: CompanyService,
              private commonService: CommonService,
              private jobService: JobService) {
  }

  ngOnInit() {
    this.commonService.scrollTopWindow(0, 300)
    this.companyService.findTopCompanies().subscribe(res => {
      this.companies = res;
    })
  }

}
