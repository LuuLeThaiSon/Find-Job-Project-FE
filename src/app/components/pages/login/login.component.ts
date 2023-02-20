import {Component, ViewChild} from '@angular/core';
import {Company} from "../../model/company";
import {Candidate} from "../../model/candidate";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../model/role";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";
import {Admin} from "../../model/admin";
import {MessageService} from "primeng/api";
import {HeaderComponent} from "../../common/header/header.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
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
              private companyService: CompanyService,
              private messageService: MessageService
  ) {
  }

  onSubmit() {
    this.candidate = this.formLogin.value
    this.company = this.formLogin.value
    this.admin = this.formLogin.value
    this.companyService.findAllCandidate().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (this.candidate.email.toLowerCase() == data[i].email.toLowerCase() && this.candidate.password == data[i].password) {
          sessionStorage.setItem("user", JSON.stringify(data[i]));
          setTimeout(() => {
            this.loading = false
          }, 200)
          setTimeout(() => {
            this.loading = true
            this.router.navigate(['']).finally()
          },1000)
        }
      }
      this.companyService.findAllCompany().subscribe((data) => {
        for (let j = 0; j < data.length; j++) {
          if (this.company.email.toLowerCase() == data[j].email.toLowerCase() && this.company.password == data[j].password) {
            sessionStorage.setItem("user", JSON.stringify(data[j]));
            setTimeout(() => {
              this.loading = false
            }, 200)
            setTimeout(() => {
              this.loading = true
              this.router.navigate(['']).finally()
            },1000)
            return
          }
        }
        this.companyService.findAllAdmin().subscribe((data) => {
          for (let j = 0; j < data.length; j++) {
            if (this.admin.email == data[j].email && this.admin.password == data[j].password) {
              sessionStorage.setItem("user", JSON.stringify(data[j]));
              setTimeout(() => {
                this.loading = false
              }, 200)
              setTimeout(() => {
                this.loading = true
                this.router.navigate(['']).finally()
              },1000)
              return
            }
          }
          setTimeout(() => {
            this.loading = true
            this.showError()
          }, 100)
        })
      })
    })
  }


  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'success', detail: 'Login successfully!', key: 'ab'})
  }

  showInfo() {
    this.messageService.add({severity: 'info', summary: 'Info', detail: 'Welcome to login page!', key: 'ab'});
  }

  showWarn() {
    this.messageService.add({severity: 'warn', summary: 'Warn', detail: 'Message Content'});
  }

  showError() {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Login fail! You can try again!', key: 'ab'});
  }


  clear() {
    this.messageService.clear();
  }

  @ViewChild(HeaderComponent)
  header: HeaderComponent | undefined;

  loading = true;
}
