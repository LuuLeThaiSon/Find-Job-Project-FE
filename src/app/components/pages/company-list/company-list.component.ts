import {Component} from '@angular/core';
import {CompanyService} from "../../service/company.service";
import {Company} from "../../model/company";
import {JobCount} from "../../model/jobCount";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent {
  companies: Company[] = [];
  company!: Company;
  jobCounts: Company[] = [];
  job!: JobCount;
  p: number = 1;
  itemsPerPage: number = 9;
  a!: number

  constructor(private companyService: CompanyService) {
    this.findAll()
  }

  findAll() {
    this.companyService.findAll().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.jobCounts = data

        // this.companyService.countQuantityJob(3).subscribe((value) => {
        //   for (let i = 0; i < value.length; i++) {
        //     this.job.count = value.length
        //   }
        // })
      }
    })
  }
}
