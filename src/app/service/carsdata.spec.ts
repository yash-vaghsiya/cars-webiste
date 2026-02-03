import { TestBed } from '@angular/core/testing';

import { Carsdata } from './carsdata';

describe('Carsdata', () => {
  let service: Carsdata;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Carsdata);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
