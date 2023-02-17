import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCandidateProfileComponent } from './manage-candidate-profile.component';

describe('ManageCandidateProfileComponent', () => {
  let component: ManageCandidateProfileComponent;
  let fixture: ComponentFixture<ManageCandidateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCandidateProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCandidateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
