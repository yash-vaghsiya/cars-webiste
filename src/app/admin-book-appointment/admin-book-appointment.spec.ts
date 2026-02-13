import { ComponentFixture, TestBed } from '@angular/core/testing';
import { userbooking } from './admin-book-appointment';
describe('AdminBookAppointment', () => {
  let component: userbooking;
  let fixture: ComponentFixture<userbooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [userbooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(userbooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
