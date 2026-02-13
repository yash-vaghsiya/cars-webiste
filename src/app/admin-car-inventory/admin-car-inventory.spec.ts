import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarInventory } from './admin-car-inventory';

describe('AdminCarInventory', () => {
  let component: AdminCarInventory;
  let fixture: ComponentFixture<AdminCarInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCarInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCarInventory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
