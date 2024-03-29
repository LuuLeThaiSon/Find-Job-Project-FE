import {Component, ViewChild} from '@angular/core';
import {Candidate} from "../../model/candidate";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../model/role";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";
import {matchpassword} from "./matchpassword.validator";
import {HeaderComponent} from "../../common/header/header.component";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-register-c',
  templateUrl: './register-c.component.html',
  styleUrls: ['./register-c.component.css'],
  providers: [MessageService]//
})
export class RegisterCComponent {
  candidate!: Candidate
  candidates: Candidate[] = []
  formRegisterCandidate!: FormGroup
  passwordSend = {to: '', subject: '', messageC: '', message: null}
  htmlSend = {to: '', subject: '', htmlContent: '', password: ''}
  role: Role[] = []
  imageFile: any
  path!: string
  pathName!: string
  selectedOption: any;
  showPassFields = true;
  RegexAlphaNumeric = "^[a-zA-Z0-9]{8,10}|[a-zA-Z0-9]{12,14}$"
  showSuccessRegister = true


  ngOnInit(): void {
    this.loading = true
    this.formRegisterCandidate = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.RegexAlphaNumeric)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(this.RegexAlphaNumeric)]),
      tel: new FormControl('', [Validators.required, Validators.pattern(/^0\d{8,9}$/)]),
      role: new FormGroup({
        id: new FormControl('',)
      }),
    }, {
      validators: matchpassword
    })
    this.companyService.findAllRole().subscribe((data) => {
      this.role = data
      data.shift()
      this.selectedOption = data[2].id
    })
  }

  constructor(private routerActive: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService,
              private messageService: MessageService) {
  }

  onSubmit() {
    this.loading = false;
    console.log(this.formRegisterCandidate.value)
    this.candidate = this.formRegisterCandidate.value
    this.htmlSend.to = this.formRegisterCandidate.get('email')?.value
    this.htmlSend.subject = 'Register Successfully!'
    // @ts-ignore
    this.htmlSend.htmlContent = "<h1>Welcome to 404 Team!</h1><br/>" + "Click here to go to your login page: " +
      "<a href=\"http://localhost:4200/login\">Login Now!</a>",
      "text/html"
    this.loading = false
    this.companyService.getNotificationCandidateGmail(this.htmlSend).subscribe(() => {
      // @ts-ignore
      this.candidate.status = true
      // @ts-ignore
      this.candidate.avatar = null
      // @ts-ignore
      this.candidate.role = {id: '3', name: "CANDIDATE"}
      // this.candidate.role = {id: 3}
      this.companyService.saveCandidate(this.candidate).subscribe(() => {
        this.loading = true
        setTimeout(() => {
          this.showSuccess3()
        }, 1000)
        setTimeout(() => {
          this.loading = false
        }, 6000)
        return
      })
    })
  }

  checkEmail(mail: string): void {
    this.companyService.findAllCandidate().subscribe((data) => {
      for (let a of data) {
        if (a.email.toLowerCase() === mail.toLowerCase()) {
          setTimeout(() => {
            this.showError1()
            this.formRegisterCandidate.get('email')?.setValue('')
          }, 50, 1)
        }
      }
    })
  }

  checkTel() {
    if (this.formRegisterCandidate.get('tel')?.errors?.['pattern'] && this.formRegisterCandidate.get('tel')?.touched) {
      this.formRegisterCandidate.get('tel')?.setValue('')
    }
  }

  @ViewChild(HeaderComponent)
  header: HeaderComponent | undefined;

  loading!: boolean;


  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'success', detail: 'You can use this name', key: 'ab'})
  }

  showSuccess1() {
    this.messageService.add({severity: 'success', summary: 'success', detail: 'You can use this email', key: 'ab'})
  }

  showInfo() {
    this.messageService.add({severity: 'info', summary: 'Info', detail: ' Loading Login Page....... ', key: 'abc'});
  }

  showWarn() {
    this.messageService.add({severity: 'warn', summary: 'Warn', detail: 'Message Content'});
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Username existed. Please choose another name!',
      key: 'ab'
    });
  }

  showError1() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Email existed. Please choose another email!',
      key: 'ab'
    });
  }


  clear() {
    this.messageService.clear();
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to proceed'
    });
  }

  showViaService() {
    this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Via MessageService'});
  }

  showPass() {
    this.showPassFields = !this.showPassFields
  }

  showSuccess3() {
    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'Register Successfully! Pls check your mail box to get notification!',
      key: 'ab'
    })
  }
}
