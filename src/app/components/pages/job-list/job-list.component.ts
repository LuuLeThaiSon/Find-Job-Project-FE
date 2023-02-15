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
  user!:any;
  role!:number;

  constructor(private jobService: JobService,
              private locationsService: LocationsService,
              private categoryService: CategoryService) {

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
      console.log(this.categories)
    })
  }

  ngOnInit(): void {
    this.findAll();
    this.findAllLocations();
    this.findAllCategories();
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user")) as any;
    this.role = this.user.role.id;
    console.log(this.role)
  }
}
