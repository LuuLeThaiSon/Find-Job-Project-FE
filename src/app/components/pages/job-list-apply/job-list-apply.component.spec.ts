import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListApplyComponent } from './job-list-apply.component';

describe('JobListApplyComponent', () => {
  let component: JobListApplyComponent;
  let fixture: ComponentFixture<JobListApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobListApplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobListApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
