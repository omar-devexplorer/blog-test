import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLibComponent } from './blog-lib.component';

describe('BlogLibComponent', () => {
  let component: BlogLibComponent;
  let fixture: ComponentFixture<BlogLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
