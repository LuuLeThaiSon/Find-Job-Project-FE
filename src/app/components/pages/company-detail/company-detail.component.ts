import {Component, OnChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Company} from "../../model/company";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CompanyService} from "../../service/company.service";

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent{
  company!:Company;
  companyId!:number
  constructor(private activatedRoute: ActivatedRoute,
              private companyService: CompanyService) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.companyId = params['id'];
      this.companyService.findCompany(this.companyId).subscribe(res => {
        this.company = res;
        console.log(this.company)
      })
    });
  }

}
