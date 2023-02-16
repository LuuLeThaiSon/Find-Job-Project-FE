import {Component} from '@angular/core';
import {Company} from "../../model/company";
import {Candidate} from "../../model/candidate";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../model/role";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";
import {CategoryService} from "../../service/category.service";
import {Admin} from "../../model/admin";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  companies: Company[] = []
  company!: Company
  candidate!: Candidate
  candidates: Candidate[] = []
  admin!: Admin
  formLogin!: FormGroup
  role: Role[] = []
  imageFile: any
  path!: string
  pathName!: string

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      id: new FormControl(''),
      email: new FormControl(''.toLowerCase(), [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role: new FormGroup({
        id: new FormControl('', [Validators.required])
      })
    })
  }

  constructor(private routerActive: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService
  ) {
  }

  onSubmit() {
    this.candidate = this.formLogin.value
    this.company = this.formLogin.value
    this.admin = this.formLogin.value
    this.companyService.findAllCandidate().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (this.candidate.email == data[i].email && this.candidate.password == data[i].password) {
          sessionStorage.setItem("user", JSON.stringify(data[i]));
          alert("Login successfully!");
          this.router.navigate(['']).finally();
          return
        }
      }
      this.companyService.findAllCompany().subscribe((data) => {
        for (let j = 0; j < data.length; j++) {
          if (this.company.email == data[j].email && this.company.password == data[j].password) {
            sessionStorage.setItem("user", JSON.stringify(data[j]));
            alert("Login successfully!");
            this.router.navigate(['']).finally();
            return
          }
        }
        this.companyService.findAllAdmin().subscribe((data) => {
          for (let j = 0; j < data.length; j++) {
            if (this.admin.email == data[j].email && this.admin.password == data[j].password) {
              sessionStorage.setItem("user", JSON.stringify(data[j]));
              alert("Login successfully!");
              this.router.navigate(['']).finally();
              return
            }
          }
        alert("Login failed! You can try again!")
      })
    })
  })
}
}
