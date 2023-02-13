import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../model/role";
import {Candidate} from "../../model/candidate";
import {Company} from "../../model/company";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  companies: Company[] = []
  company!: Company
  candidate!: Candidate
  formRegister!: FormGroup
  role: Role[] = []
  imageFile: any
  path!: string
  pathName!: string
  selectedOption: any;


  ngOnInit(): void {
    this.formRegister = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      tel: new FormControl(''),
      role: new FormGroup({
        id: new FormControl('',[Validators.required])
      })

    })
    this.companyService.findAllRole().subscribe((data) => {
      this.role = data
      data.shift()
      for (let a of data) {
        this.selectedOption = a.id
      }
    })
  }

  constructor(private routerActive: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService,
             ) {
  }

  onSubmit() {
    this.company = this.formRegister.value
    this.companyService.save(this.company).subscribe(() => {
      alert("Create successfully!")
      this.router.navigate([''])
    })
  }


}
