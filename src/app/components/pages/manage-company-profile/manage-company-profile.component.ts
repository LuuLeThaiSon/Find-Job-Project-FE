import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {Company} from "../../model/company";
import {Job} from "../../model/job";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";
import {JobService} from "../../service/job.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Subject} from "rxjs";
import {HeaderComponent} from "../../common/header/header.component";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {CommonService} from "../../service/common.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-manage-company-profile',
  templateUrl: './manage-company-profile.component.html',
  styleUrls: ['./manage-company-profile.component.css'],
})
export class ManageCompanyProfileComponent implements AfterViewInit {
  company!: Company;
  companyId!: number;
  jobs!: Job[];
  ggMap!: any;
  formCompany!: FormGroup;
  imageFile: any;
  path!: string;
  pathName!: string;
  categories: Category[] = [];
  allCategories: Category[] = [];
  imageBannerFile: any;
  pathBannerName!: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService,
              private jobService: JobService,
              private sanitized: DomSanitizer,
              private storage: AngularFireStorage,
              private categoryService: CategoryService,
              private commonService: CommonService,
              private elementRef: ElementRef,
              private messageService: MessageService) {
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
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.companyId = params['id'];
    });

    this.formCompany = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      shortName: new FormControl(''),
      code: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      description: new FormControl(''),
      address: new FormControl(''),
      numberOfEmployees: new FormControl(''),
      googleMap: new FormControl(''),
      tel: new FormControl(''),
      website: new FormControl(''),
      role: new FormGroup({
        id: new FormControl('')
      }),
      status: new FormControl(''),
      banner: new FormControl(''),
    })

    this.formChangePass = new FormGroup({
      currentPass: new FormControl(''),
      newPass: new FormControl(''),
      confirmPass: new FormControl(''),
    })

    this.categoryService.findCategoriesByCompanyId(this.companyId).subscribe(res => {
      this.categories = res;
    })

    this.categoryService.findAll().subscribe(res => {
      console.log(res)
      this.allCategories = res;
    })
    console.log('all categories is' + this.allCategories)

    this.companyService.findCompany(this.companyId).subscribe(res => {
      this.company = res;
      this.path = this.company.avatar;
      this.formCompany.patchValue(res)
      this.ggMap = this.sanitized.bypassSecurityTrustHtml(res.googleMap);
      this.ggMap.setAttribute("style:width", "100%");
    })

  }

  findCompanyById(id: number) {
    this.companyService.findCompany(id).subscribe(res => {
      this.company = res;
      this.ggMap = this.sanitized.bypassSecurityTrustHtml(res.googleMap);
      this.ggMap.setAttribute("style:width", "100%");
      this.formCompany.patchValue(res)
    })
  }

  findAllJobsByCompany(id: number) {
    this.jobService.findAllJobsByCompany(id).subscribe(res => {
      this.jobs = res;
    })
  }

  onSubmit() {
    this.commonService.scrollTopWindow(0, 300);
    this.loading = false;
    if (this.imageFile == null) {
      this.commonService.scrollTopWindow(0, 100);
      this.company = this.formCompany.value;
      this.company.avatar = this.path;
      this.companyService.update(this.company, this.companyId).subscribe(() => {
        this.loading = true;
        window.scroll(0, 100);
        this.showSuccess();
        sessionStorage.setItem("user", JSON.stringify(this.company));
        this.header?.ngOnInit();
        this.ggMap = this.sanitized.bypassSecurityTrustHtml(this.company.googleMap);
        this.ggMap.setAttribute("style:width", "100%");
      })
    } else {
      const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(imagePath);
      this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.company = this.formCompany.value;
            this.company.avatar = url;
            this.companyService.update(this.company, this.companyId).subscribe(() => {
              this.commonService.scrollTopWindow(0, 100);
              this.loading = true;
              sessionStorage.setItem("user", JSON.stringify(this.company));
              this.ggMap = this.company.googleMap;
              this.header?.ngOnInit();
              this.showSuccess();
              this.ggMap = this.sanitized.bypassSecurityTrustHtml(this.company.googleMap);
              this.ggMap.setAttribute("style:width", "100%");
            })
          });
        })
      ).subscribe()
    }
  }

  updateBanner(event: any) {
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
            this.company.banner = url;
            this.companyService.update(this.company, this.companyId).subscribe(res => {
              setTimeout(() => {
                this.loading = true;
              }, 1000)
            })
          });
        })
      ).subscribe()
    }
  }

  previewAvatar(event: any) {
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
              this.loading = true;
            });
          })
        ).subscribe()
      }
    }

  }

  findAllCategories() {
    this.categoryService.findAll().subscribe(res => {
      this.allCategories = res;
    })
  }

  @ViewChild(HeaderComponent)
  header: HeaderComponent | undefined;

  loading = true;

  selectedCategories: Category[] = [];

  // chang password
  passStatus!: string;
  formChangePass!: FormGroup;
  alertChangePass = true;
  showPassFields = true;
  showSuccessChangePass = true;

  showPass() {
    this.showPassFields = !this.showPassFields;
  }

  changePass() {
    this.alertChangePass = true;
    let currentPass = this.formChangePass.get('currentPass')?.value;
    let newPass = this.formChangePass.get('newPass')?.value;
    let confirmPass = this.formChangePass.get('confirmPass')?.value;

    if (newPass == null) {
      this.alertChangePass = false;
      this.passStatus = "Please enter new Password";
      this.formChangePass.reset();
      return;
    }
    if (currentPass != this.company.password) {
      this.alertChangePass = false;
      this.passStatus = "Current Password incorrect";
      this.formChangePass.reset();
      return;
    }
    if (confirmPass == null) {
      this.alertChangePass = false;
      this.passStatus = "Please confirm new Password";
      this.formChangePass.reset();
      return;
    }
    if (newPass != confirmPass) {
      this.alertChangePass = false;
      this.passStatus = "New Password not match";
      this.formChangePass.reset();
      return;
    }
    if (newPass.toString().length < 8) {
      this.alertChangePass = false;
      this.passStatus = "New Password must be at least 8 characters";
      this.formChangePass.reset();
      return;
    }

    this.company.password = newPass;
    this.loading = false;
    this.companyService.update(this.company, this.companyId).subscribe(res => {
      // @ts-ignore
      this.loading = true;
      this.showSuccessChangePass = false;
      setTimeout(() => {
        this.router.navigate(['/login']).finally()
      }, 4000)
    })

  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'success', detail: 'Update Successfully'})
  }

}
