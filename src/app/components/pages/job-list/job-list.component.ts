import {Component} from '@angular/core';
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
export class JobListComponent {
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
    this.findAll();
    this.findAllLocations();
    this.findAllCategories();
  }
  findAll() {
    return this.jobService.findAll().subscribe((data) => {
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
    })
  }

  changeLocation(name: string) {
    this.locationText = name;
  }

  changeCategory(name: string) {
    this.categoryText = name;

  }

  removeLocation() {
    this.locationText = 'Location'
  }

  removeCategory() {
    this.categoryText = 'Category'
  }
}
