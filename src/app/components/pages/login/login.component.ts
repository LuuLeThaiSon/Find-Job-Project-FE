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
  showPassFields = true;

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
    const user = this.formLogin.value;

    this.companyService.findAllCandidate().subscribe((candidateData) => {
      const candidate = candidateData.find((c) =>
        c.email.toLowerCase() === user.email.toLowerCase() && c.password === user.password
      );

      if (candidate) {
        this.loginSuccess(candidate);
        return;
      }

      this.companyService.findAllCompany().subscribe((companyData) => {
        const company = companyData.find((c) =>
          c.email.toLowerCase() === user.email.toLowerCase() && c.password === user.password
        );

        if (company) {
          this.loginSuccess(company);
          return;
        }

        this.companyService.findAllAdmin().subscribe((adminData) => {
          const admin = adminData.find((a) =>
            a.email === user.email && a.password === user.password
          );

          if (admin) {
            this.loginSuccess(admin);
            return;
          }

          this.showError();
        });
      });
    });
  }

  loginSuccess(data: any) {
    sessionStorage.setItem("user", JSON.stringify(data));
    setTimeout(() => {
      this.loading = true;
      this.showSuccess();
    }, 1000);
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    setTimeout(() => {
      this.loading = true;
      this.router.navigate(['']).finally();
    }, 4000);
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

  showPass() {
    this.showPassFields = !this.showPassFields
  }
}
