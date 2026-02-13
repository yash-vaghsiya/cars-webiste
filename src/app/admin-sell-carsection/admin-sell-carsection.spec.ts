import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSellCarsection } from './admin-sell-carsection';

describe('AdminSellCarsection', () => {
  let component: AdminSellCarsection;
  let fixture: ComponentFixture<AdminSellCarsection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSellCarsection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSellCarsection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
