import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Company} from "../../model/company";
import {Job} from "../../model/job";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../service/company.service";
import {JobService} from "../../service/job.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Subject} from "rxjs";
import {HeaderComponent} from "../../common/header/header.component";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {CommonService} from "../../service/common.service";


@Component({
  selector: 'app-manage-company-profile',
  templateUrl: './manage-company-profile.component.html',
  styleUrls: ['./manage-company-profile.component.css'],
})
export class ManageCompanyProfileComponent {
  company!: Company;
  companyId!: number;
  jobs!: Job[];
  ggMap!: any;
  formCompany!: FormGroup;
  imageFile: any;
  path!: string;
  pathName!: string;
  edited!: boolean;
  categories!: Category[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService,
              private jobService: JobService,
              private sanitized: DomSanitizer,
              private storage: AngularFireStorage,
              private categoryService: CategoryService,
              private commonService: CommonService,
  ) {
  }

  ngOnInit() {
    this.commonService.scrollTopWindow(0, 300);
    this.edited = true;
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

    this.categoryService.findCategoriesByCompanyId(this.companyId).subscribe(res => {
      console.log(res)
      this.categories = res;
    })

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
    this.loading = false;
    console.log(this.formCompany.value);
    if (this.imageFile == null) {
      this.company = this.formCompany.value;
      this.company.avatar = this.path;
      this.companyService.update(this.company, this.companyId).subscribe(() => {
        setTimeout(() => {
          this.loading = true;
        }, 1000)
        this.edited = false;
        sessionStorage.setItem("user", JSON.stringify(this.company));
        window.scroll(0, 300);
        this.ggMap = this.sanitized.bypassSecurityTrustHtml(this.company.googleMap);
        this.ggMap.setAttribute("style:width", "100%");
      })
    } else {
      const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(imagePath);
      this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            setTimeout(() => {
              this.loading = true;
            }, 1000)
            this.company = this.formCompany.value;
            this.company.avatar = url;
            this.companyService.update(this.company, this.companyId).subscribe(() => {
              sessionStorage.setItem("user", JSON.stringify(this.company));
              this.edited = false;
              this.ggMap = this.company.googleMap;
              this.commonService.scrollTopWindow(0, 300);
              this.header?.ngOnInit();
              this.ggMap = this.sanitized.bypassSecurityTrustHtml(this.company.googleMap);
              this.ggMap.setAttribute("style:width", "100%");
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
            setTimeout(() => {
              this.loading = true;
            }, 1000)
            fileRef.getDownloadURL().subscribe(url => {
              this.path = url;
              console.log(this.path)
            });
          })
        ).subscribe()
      }
    }
  }


  @ViewChild(HeaderComponent) header: HeaderComponent | undefined;

  loading!: boolean;
}
