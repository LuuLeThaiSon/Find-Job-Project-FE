import { Component } from '@angular/core';
import {CompanyService} from "../../service/company.service";
import {Company} from "../../model/company";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent {
  companies: Company[] = [];
  p: number = 1;
  itemsPerPage: number = 9;
  constructor(private companyService: CompanyService) {
    this.findAll()
  }
  findAll() {
    this.companyService.findAllCompany().subscribe((data) => {
      this.companies = data;
      console.log(data)
    })
  }
}
