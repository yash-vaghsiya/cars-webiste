import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCar } from './sell-car';

describe('SellCar', () => {
  let component: SellCar;
  let fixture: ComponentFixture<SellCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellCar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
