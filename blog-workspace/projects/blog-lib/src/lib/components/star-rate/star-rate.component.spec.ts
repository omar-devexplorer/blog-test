import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRateComponent } from './star-rate.component';

describe('StarRateComponent', () => {
  let component: StarRateComponent;
  let fixture: ComponentFixture<StarRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
