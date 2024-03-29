import {Component} from '@angular/core';
import {CompanyService} from "../../service/company.service";
import {Company} from "../../model/company";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent {
  companies: CountJobs[] = [];
  p: number = 1;
  itemsPerPage: number = 100;
  constructor(private companyService: CompanyService) {
    this.findAll()
  }
  findAll() {
    this.companyService.findAll().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.companyService.countQuantityJob(data[i].id).subscribe((data1) => {
          this.companies.push(new CountJobs(data1.length, data[i]));
        });
      }
    })
  }

  scrollTop() {
    window.scrollTo(0,300)
  }
}

export class CountJobs {
  count?: number;
  company?: Company;

  constructor(a: number, b: Company) {
    this.count = a;
    this.company = b;
  }
}
