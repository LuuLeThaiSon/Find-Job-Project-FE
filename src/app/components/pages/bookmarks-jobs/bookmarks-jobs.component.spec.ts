import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksJobsComponent } from './bookmarks-jobs.component';

describe('BookmarksJobsComponent', () => {
  let component: BookmarksJobsComponent;
  let fixture: ComponentFixture<BookmarksJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarksJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarksJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
