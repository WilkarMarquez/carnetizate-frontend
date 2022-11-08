import { TestBed } from '@angular/core/testing';

import { CarnetizateService } from './carnetizate.service';

describe('CarnetizateService', () => {
  let service: CarnetizateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarnetizateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
