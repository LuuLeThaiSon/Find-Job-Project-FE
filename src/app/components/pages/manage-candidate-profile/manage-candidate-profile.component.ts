import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HeaderComponent} from "../../common/header/header.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";
import {JobService} from "../../service/job.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {CategoryService} from "../../service/category.service";
import {Job} from "../../model/job";
import {Candidate} from "../../model/candidate";
import {CommonService} from "../../service/common.service";
import {finalize} from "rxjs";
import {CandidateService} from "../../service/candidate.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-manage-candidate-profile',
  templateUrl: './manage-candidate-profile.component.html',
  styleUrls: ['./manage-candidate-profile.component.css']
})
export class ManageCandidateProfileComponent {
  candidate!: Candidate;
  candidateId!: number;
  jobs!: Job[];
  ggMap!: any;
  formCandidate!: FormGroup;
  imageFile: any;
  path!: string;
  pathName!: string;
  edited!: boolean;
  imageBannerFile: any;
  pathBannerName!: string;
//ckEditor
  public Editor = ClassicEditor;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private candidateService: CandidateService,
              private companyService: CompanyService,
              private jobService: JobService,
              private sanitized: DomSanitizer,
              private storage: AngularFireStorage,
              private categoryService: CategoryService,
              private commonService: CommonService,
              private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/libs/choices.js/public/assets/scripts/choices.min.js";
    this.elementRef.nativeElement.appendChild(s);

    var s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "../../assets/libs/swiper/swiper-bundle.min.js";
    this.elementRef.nativeElement.appendChild(s1);

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "../../assets/js/pages/job-list.init.js";
    this.elementRef.nativeElement.appendChild(s2);

    var s3 = document.createElement("script");
    s3.type = "text/javascript";
    s3.src = "../../assets/js/pages/index.init.js";
    this.elementRef.nativeElement.appendChild(s3);

    var s4 = document.createElement("script");
    s4.type = "text/javascript";
    s4.src = "../../assets/js/app.js";
    this.elementRef.nativeElement.appendChild(s4);

    var s5 = document.createElement("script");
    s5.type = "text/javascript";
    s5.src = "../../assets/js/pages/switcher.init.js";
    this.elementRef.nativeElement.appendChild(s5);

    var s7 = document.createElement("script");
    s7.type = "text/javascript";
    s7.src = "https://unicons.iconscout.com/release/v4.0.0/script/monochrome/bundle.js";
    this.elementRef.nativeElement.appendChild(s7);
  }

  ngOnChanges() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/libs/choices.js/public/assets/scripts/choices.min.js";
    this.elementRef.nativeElement.appendChild(s);

    var s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "../../assets/libs/swiper/swiper-bundle.min.js";
    this.elementRef.nativeElement.appendChild(s1);

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "../../assets/js/pages/job-list.init.js";
    this.elementRef.nativeElement.appendChild(s2);

    var s3 = document.createElement("script");
    s3.type = "text/javascript";
    s3.src = "../../assets/js/pages/index.init.js";
    this.elementRef.nativeElement.appendChild(s3);

    var s4 = document.createElement("script");
    s4.type = "text/javascript";
    s4.src = "../../assets/js/app.js";
    this.elementRef.nativeElement.appendChild(s4);

    var s5 = document.createElement("script");
    s5.type = "text/javascript";
    s5.src = "../../assets/js/pages/switcher.init.js";
    this.elementRef.nativeElement.appendChild(s5);

    var s7 = document.createElement("script");
    s7.type = "text/javascript";
    s7.src = "https://unicons.iconscout.com/release/v4.0.0/script/monochrome/bundle.js";
    this.elementRef.nativeElement.appendChild(s7);
  }

  ngOnInit() {

    this.commonService.scrollTopWindow(0, 300);
    this.edited = true;
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.candidateId = params['id'];
    });

    this.formCandidate = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      password: new FormControl(''),
      address: new FormControl(''),
      description: new FormControl(''),
      tel: new FormControl(''),
      role: new FormGroup({
        id: new FormControl('')
      }),
      status: new FormControl(''),
      banner: new FormControl('')
    })
    this.companyService.findCandidate(this.candidateId).subscribe(res => {
      this.candidate = res;
      this.formCandidate.patchValue(res);
      this.description = this.sanitized.bypassSecurityTrustHtml(this.candidate.description);

    })
    this.formChangePass = new FormGroup({
      currentPass: new FormControl(''),
      newPass: new FormControl(''),
      confirmPass: new FormControl(''),
    })


    console.log(this.description)

  }


  previewAvatarCandidate(event: any) {
    this.loading = false;
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      if (this.pathName !== this.imageFile.name) {
        this.pathName = this.imageFile.name
        const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(imagePath);
        this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.path = url;
              setTimeout(() => {
                this.loading = true;
              }, 1000)
            });
          })
        ).subscribe()
      }
    }
  }


  @ViewChild(HeaderComponent)
  header: HeaderComponent | undefined;

  loading!: boolean;

  onSubmit() {
    console.log(this.formCandidate.value)
    this.loading = false
    if (this.imageFile == null) {
      this.candidate = this.formCandidate.value
      this.candidate.avatar = this.path
      this.candidateService.updateCandidate(this.candidate, this.candidateId).subscribe(() => {
        this.edited = false
        sessionStorage.setItem("user", JSON.stringify(this.candidate))
        this.header?.ngOnInit()
        window.scroll(0, 300);
        this.description = this.sanitized.bypassSecurityTrustHtml(this.candidate.description);
      })
    } else {
      const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(imagePath);
      this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.candidate = this.formCandidate.value;
            this.candidate.avatar = url;
            this.candidateService.updateCandidate(this.candidate, this.candidateId).subscribe(() => {
              sessionStorage.setItem("user", JSON.stringify(this.candidate));
              this.edited = false;
              this.commonService.scrollTopWindow(0, 300);
              this.header?.ngOnInit();
              this.description = this.sanitized.bypassSecurityTrustHtml(this.candidate.description);
            })
          });
        })
      ).subscribe()
    }
    setTimeout(() => {
      this.loading = true;
    }, 1000);
  }

  updateBannerCandidate(event: any) {
    // @ts-ignore
    console.log(event.target.files[0])
    console.log(event.target.files)
    this.loading = false;
    if (event.target.files && event.target.files[0]) {
      this.imageBannerFile = event.target.files[0];
      const imagePath = `banner/${this.imageBannerFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(imagePath);
      this.storage.upload(imagePath, this.imageBannerFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.candidate.banner = url;
            this.candidateService.updateCandidate(this.candidate, this.candidateId).subscribe(res => {
              setTimeout(() => {
                this.loading = true;
              }, 1000)
            })
          });
        })
      ).subscribe()
    }
  }

// chang password
  passStatus!: string;
  formChangePass!: FormGroup;
  alertChangePass = true;
  showPassFields = true;
  showSuccessChangePass = true;
  //ckEditor
  description: any;

  showPass() {
    this.showPassFields = !this.showPassFields;
  }

  changePass() {
    this.alertChangePass = true;
    let currentPass = this.formChangePass.get('currentPass')?.value;
    let newPass = this.formChangePass.get('newPass')?.value;
    let confirmPass = this.formChangePass.get('confirmPass')?.value;
    if (currentPass != this.candidate.password && newPass != confirmPass) {
      this.passStatus = "Current Password incorrect and New Password not match";
      this.alertChangePass = false;
      this.formChangePass.reset();
    } else if (currentPass != this.candidate.password) {
      this.passStatus = "Current Password incorrect";
      this.alertChangePass = false;
      this.formChangePass.reset();
      return
    } else if (newPass != confirmPass) {
      this.passStatus = "New Password not match";
      this.alertChangePass = false;
      this.formChangePass.reset();
    } else {
      this.candidate.password = newPass;
      this.loading = false;
      this.candidateService.updateCandidate(this.candidate, this.candidateId).subscribe(res => {
        // @ts-ignore
        setTimeout(() => {
          this.loading = true;
          this.showSuccessChangePass = false;

        }, 2000)
        setTimeout(() => {
          this.router.navigate(['/login']).finally()
        }, 6000)
      })
    }
  }

  fadein() {
    let e = document.getElementById("error-candidate-name"), t = 0, r = setInterval(function () {
      // @ts-ignore
      t < 1 ? (t += .5, e.style.opacity = String(t)) : clearInterval(r)
    }, 200)
  }
}
