import {Component, ViewChild} from '@angular/core';
import {Candidate} from "../../model/candidate";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../model/role";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";
import {matchpassword} from "./matchpassword.validator";
import firebase from "firebase/compat";
import messaging = firebase.messaging;
import {HeaderComponent} from "../../common/header/header.component";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-register-c',
  templateUrl: './register-c.component.html',
  styleUrls: ['./register-c.component.css'],
  providers:[MessageService]
})
export class RegisterCComponent {
  candidate!: Candidate
  candidates: Candidate[] = []
  formRegisterCandidate!: FormGroup
  passwordSend = {to: '', subject: '', messageC : '', message: null}
  role: Role[] = []
  imageFile: any
  path!: string
  pathName!: string
  selectedOption: any;


  ngOnInit(): void {
    this.loading = true
    this.formRegisterCandidate = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      tel: new FormControl('', [Validators.required]),
      role: new FormGroup({
        id: new FormControl('', [Validators.required])
      }),
    },{
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
              private messageService: MessageService) {}


  onSubmit() {
    this.loading = false;
    console.log(this.formRegisterCandidate.value)
    this.candidate = this.formRegisterCandidate.value
    this.passwordSend.to = this.formRegisterCandidate.get('email')?.value
    this.passwordSend.subject = 'Register Successfully!'
    // @ts-ignore
    this.passwordSend.messageC = 'Welcome to 404 team ' + this.formRegisterCandidate.get('name')?.value
    this.companyService.getNotificationCandidate(this.passwordSend).subscribe((data) => {
      // @ts-ignore
    this.candidate.status = true
    // @ts-ignore
    this.candidate.avatar = null
    // @ts-ignore
    this.candidate.role = {id: '3', name: "CANDIDATE"}
    // this.candidate.role = {id: 3}
    this.companyService.saveCandidate(this.candidate).subscribe(() => {
      setTimeout(() => {
        this.loading = false
      }, 50)
    })
      setTimeout(() => {
        this.loading = true
        this.router.navigate(['/login']).finally()
      },500)
    })
  }

  checkEmail(mail : string) :void {
    this.companyService.findAllCandidate().subscribe((data) => {
      for (let a of data) {
        if (a.email.toLowerCase() === mail) {
          setTimeout(() => {
            this.showError1()
            this.formRegisterCandidate.get('email')?.setValue('')
          },50,1)
        }
      }
    })
  }

  @ViewChild(HeaderComponent)
  header: HeaderComponent | undefined;

  loading!: boolean;


  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'success', detail: 'You can use this name', key:'ab'})
  }

  showSuccess1() {
    this.messageService.add({severity: 'success', summary: 'success', detail: 'You can use this email', key: 'ab'})
  }

  showInfo() {
    this.messageService.add({severity: 'info', summary: 'Info', detail: 'Wish you have a good day!', key: 'ab'});
  }

  showWarn() {
    this.messageService.add({severity: 'warn', summary: 'Warn', detail: 'Message Content'});
  }

  showError() {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Username existed. Please choose another name!', key:'ab'});
  }

  showError1() {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Email existed. Please choose another email!', key:'ab'});
  }

  clear() {
    this.messageService.clear();
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
  }

  showViaService() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }
}
