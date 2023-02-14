import {Component, OnChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Company} from "../../model/company";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CompanyService} from "../../service/company.service";
import {JobService} from "../../service/job.service";
import {Job} from "../../model/job";
import {DomSanitizer} from "@angular/platform-browser";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";


@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent {
  company!: Company;
  companyId!: number;
  currentOpeningJobs: Job[] = [];
  ggMap!: any;
  categories!: Category[];

  constructor(private activatedRoute: ActivatedRoute,
              private companyService: CompanyService,
              private jobService: JobService,
              private categoryService: CategoryService,
              private sanitized: DomSanitizer) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.companyId = params['id'];
      this.findCompanyById(this.companyId);
      this.findCurrentOpeningJobsByCompany(this.companyId);
    });
  }

  findCompanyById(id: number) {
    this.companyService.findCompany(id).subscribe(res => {
      this.company = res;
      this.ggMap = this.sanitized.bypassSecurityTrustHtml(res.googleMap);
      this.ggMap.setAttribute("style:width", "100%");
    })
  }

  findCurrentOpeningJobsByCompany(id: number) {
    this.jobService.findCurrentOpeningJobsByCompany(id).subscribe(res => {
      this.currentOpeningJobs = res;
    })
  }

  findCategoriesByJobId(id: number) {
    this.categoryService.findCategoriesByJobId(id).subscribe(res => {
      this.categories = res;
    })
  }
}

