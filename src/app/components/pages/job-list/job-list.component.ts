import {Component, OnInit} from '@angular/core';
import {Job} from "../../model/job";
import {JobService} from "../../service/job.service";
import {Locations} from "../../model/locations";
import {LocationsService} from "../../service/locations.service";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit{
  locationText: string = 'Location';
  categoryText: string = 'Category';
  locations: Locations[] = [];
  categories: Category[] = [];
  p: number = 1;
  jobId!: number;
  jobs: Job[] = [];


  constructor(private jobService: JobService,
              private locationsService: LocationsService,
              private categoryService: CategoryService) {

  }
  findAll() {
    return this.jobService.findAll().subscribe((data) => {
      this.jobs = data;
    })
  }

  findAllByStatusIsTrueAndAndExpiredDate() {
    return this.jobService.findAllByStatusIsTrueAndAndExpiredDate().subscribe((data) => {
      this.jobs = data;
    })
  }

  findAllLocations() {
    return this.locationsService.findAll().subscribe((data) => {
      this.locations = data;
    })
  }

  findAllCategories() {
    return this.categoryService.findAll().subscribe((data) => {
      this.categories = data;
      console.log(this.categories)
    })
  }

  ngOnInit(): void {
    this.findAllByStatusIsTrueAndAndExpiredDate();
    this.findAllLocations();
    this.findAllCategories();
  }

  public searchByTitleJobOrCompanyName(key:string): void {
    const results: Job[] = [];
    for (const job of this.jobs) {
      if (job.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 || job.company.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(job)
      }
    }
    this.jobs = results;
    if (!key) {
      this.ngOnInit()
    }
  }

}
