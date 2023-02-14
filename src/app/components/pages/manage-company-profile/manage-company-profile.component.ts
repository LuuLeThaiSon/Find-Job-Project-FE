import {Component} from '@angular/core';
import {Company} from "../../model/company";
import {Job} from "../../model/job";
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "../../service/company.service";
import {JobService} from "../../service/job.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-manage-company-profile',
  templateUrl: './manage-company-profile.component.html',
  styleUrls: ['./manage-company-profile.component.css'],
  providers: [MessageService]
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

  constructor(private activatedRoute: ActivatedRoute,
              private companyService: CompanyService,
              private jobService: JobService,
              private sanitized: DomSanitizer,
              private storage: AngularFireStorage,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.formCompany = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        shortName: new FormControl(''),
        code: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        avatar: new FormControl(''),
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
      this.companyId = params['id'];
      this.findCompanyById(this.companyId);
      this.findAllJobsByCompany(this.companyId);
    });
  }

  findCompanyById(id: number) {
    this.companyService.findCompany(id).subscribe(res => {
      this.company = res;
      this.ggMap = this.sanitized.bypassSecurityTrustHtml(res.googleMap);
      this.ggMap.setAttribute("style:width", "100%");
      this.formCompany.patchValue(res)
      console.log(res)
    })
  }

  findAllJobsByCompany(id: number) {
    this.jobService.findAllJobsByCompany(id).subscribe(res => {
      this.jobs = res;
    })
  }

  onSubmit() {

  }

  testToast() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content'});
  }
}
