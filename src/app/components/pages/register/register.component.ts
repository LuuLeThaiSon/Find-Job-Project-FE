import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../model/role";
import {Candidate} from "../../model/candidate";
import {Company} from "../../model/company";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  companies: Company[] = []
  company!: Company
  formRegister!: FormGroup
  passwordSend = {to: '', subject: '', message: null,  messageC: ''}
  role: Role[] = []
  imageFile: any
  path!: string
  pathName!: string
  selectedOption: any;




  ngOnInit(): void {
    this.formRegister = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),(c: AbstractControl) => Validators.required(c)]),
      tel: new FormControl('', [Validators.required]),
      shortName: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      avatar: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      numberOfEmployees: new FormControl('', [Validators.required]),
      googleMap: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required]),
      role: new FormGroup({
        id: new FormControl('', [Validators.required])
      })

    })
    this.companyService.findAllRole().subscribe((data) => {
      this.role = data
      data.shift()
      for (let a of data) {
        this.selectedOption = data[1].id
      }
    })
  }

  constructor(private routerActive: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService,
              private storage: AngularFireStorage
  ) {
  }

  submitAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      if (this.pathName !== this.imageFile.name) {
        this.pathName = this.imageFile.name
        const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(imagePath);
        this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.path = url
            });
          })
        ).subscribe()
      }
    }
  }

  onSubmit() {
    console.log(this.formRegister.value)
    // console.log(this.formRegister.get('email')?.value)
    // console.log(this.passwordSend)
    const imagePath = `${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(imagePath);
    this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.passwordSend.to = this.formRegister.get('email')?.value
          this.passwordSend.subject = 'Congratulation you become a company!'
          // @ts-ignore
          this.passwordSend.message = this.formRegister.get('password')?.value
          this.company = this.formRegister.value
          this.company.status = true
          this.company.avatar = url
          this.company.password = null
          this.company.role = {id: 2}
          this.company.numberOfEmployees = 0
          this.companyService.getPassword(this.passwordSend).subscribe((data) => {
            this.company.password = data.message
            this.companyService.saveCompany(this.company).subscribe(() => {
              alert("Create Successfully!")
              this.router.navigate(['']).finally()
            })
          })
        });
      })
    ).subscribe()
  }

  back() {
    this.router.navigate(['/product']).finally()
  }

  checkName(name : string): void {
    this.companyService.findAllCompany().subscribe((data) => {
      for (let a of data) {
        if (a.name === name) {
          alert("exits")
        }
      }
    })
  }

checkEmail(mail : string) :void {
  this.companyService.findAllCompany().subscribe((data) => {
    for (let a of data) {
      if (a.email === mail) {
        alert("exist Mail")
      }
    }
  })
}


}


