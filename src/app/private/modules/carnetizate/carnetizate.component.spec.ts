import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetizateComponent } from './carnetizate.component';

describe('CarnetizateComponent', () => {
  let component: CarnetizateComponent;
  let fixture: ComponentFixture<CarnetizateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarnetizateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarnetizateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
