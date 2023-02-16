import {Component} from '@angular/core';
import {Candidate} from "../../model/candidate";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../model/role";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";


@Component({
  selector: 'app-register-c',
  templateUrl: './register-c.component.html',
  styleUrls: ['./register-c.component.css']
})
export class RegisterCComponent {
  candidate!: Candidate
  candidates: Candidate[] = []
  formRegisterCandidate!: FormGroup
  passwordSend = {to: '', subject: '', message: null}
  role: Role[] = []
  imageFile: any
  path!: string
  pathName!: string
  selectedOption: any;


  ngOnInit(): void {
    this.formRegisterCandidate = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      tel: new FormControl('', [Validators.required]),
      role: new FormGroup({
        id: new FormControl('', [Validators.required])
      })

    })
    this.companyService.findAllRole().subscribe((data) => {
      this.role = data
      data.shift()
      this.selectedOption = data[2].id
    })
  }

  constructor(private routerActive: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService){}


  onSubmit() {
    console.log(this.formRegisterCandidate.value)
    this.candidate = this.formRegisterCandidate.value
    this.candidate.status = true
    // @ts-ignore
    this.candidate.avatar = null
    // @ts-ignore
    this.candidate.role = {id: '2', name: "CANDIDATE"}
    this.companyService.saveCandidate(this.candidate).subscribe(() => {
      alert("Create Successfully!")
      this.router.navigate(['']).finally()
    })
  }

}
