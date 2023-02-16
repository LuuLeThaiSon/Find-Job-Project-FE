import {Component} from '@angular/core';
import {CompanyService} from "../components/service/company.service";
import {Company} from "../components/model/company";
import {CommonService} from "../components/service/common.service";

@Component({
  selector: 'app-top-companies',
  templateUrl: './top-companies.component.html',
  styleUrls: ['./top-companies.component.css']
})
export class TopCompaniesComponent {
  companies: Company[] = [];

  constructor(private companyService: CompanyService,
              private commonService:CommonService) {
  }

  ngOnInit() {
    this.commonService.scrollTopWindow(0,300)
    this.companyService.findTopCompanies().subscribe(res=>{
      this.companies = res;
    })
  }

}
