import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddVehicle } from './admin-add-vehicle';

describe('AdminAddVehicle', () => {
  let component: AdminAddVehicle;
  let fixture: ComponentFixture<AdminAddVehicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddVehicle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddVehicle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
