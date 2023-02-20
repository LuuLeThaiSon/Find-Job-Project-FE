import {Component} from '@angular/core';
import {Company} from "../../model/company";
import {Candidate} from "../../model/candidate";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../model/role";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";

import {Admin} from "../../model/admin";
import {MessageService} from "primeng/api";

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
          this.showSuccess()
          this.router.navigate(['']).finally();
          return
        }
      }
      this.companyService.findAllCompany().subscribe((data) => {
        for (let j = 0; j < data.length; j++) {
          if (this.company.email.toLowerCase() == data[j].email.toLowerCase() && this.company.password == data[j].password) {
            sessionStorage.setItem("user", JSON.stringify(data[j]));
            this.showSuccess()
            setTimeout(this.showSuccess,100)
            this.router.navigate(['']).finally();
            return
          }
        }
        this.companyService.findAllAdmin().subscribe((data) => {
          for (let j = 0; j < data.length; j++) {
            if (this.admin.email == data[j].email && this.admin.password == data[j].password) {
              sessionStorage.setItem("user", JSON.stringify(data[j]));
              this.showSuccess()
              this.router.navigate(['']).finally();
              return
            }
          }
        this.showError()
      })
    })
  })
}


  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'success', detail: 'Login successfully!'})
  }

  showInfo() {
    this.messageService.add({severity: 'info', summary: 'Info', detail: 'Message Content'});
  }

  showWarn() {
    this.messageService.add({severity: 'warn', summary: 'Warn', detail: 'Message Content'});
  }

  showError() {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Login fail! You can try again!'});
  }

  showCustom() {
    this.messageService.add({severity: 'custom', summary: 'Custom', detail: 'Message Content', icon: 'pi-file'});
  }

  showTopLeft() {
    this.messageService.add({key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content'});
  }

  showTopCenter() {
    this.messageService.add({key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Message Content'});
  }

  showBottomCenter() {
    this.messageService.add({key: 'bc', severity: 'success', summary: 'Success', detail: 'Message Content'});
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to proceed',
      id: 1
    });
  }

  showMultiple() {
    this.messageService.addAll([
      {severity: 'success', summary: 'Message 1', detail: 'Message Content'},
      {severity: 'info', summary: 'Message 2', detail: 'Message Content'},
      {severity: 'warn', summary: 'Message 3', detail: 'Message Content'}
    ]);
  }

  showSticky() {
    this.messageService.add({severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true});
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}
