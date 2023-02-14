import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompanyProfileComponent } from './manage-company-profile.component';

describe('ManageCompanyProfileComponent', () => {
  let component: ManageCompanyProfileComponent;
  let fixture: ComponentFixture<ManageCompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCompanyProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
