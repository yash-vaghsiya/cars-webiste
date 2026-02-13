import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSendMessage } from './admin-send-message';

describe('AdminSendMessage', () => {
  let component: AdminSendMessage;
  let fixture: ComponentFixture<AdminSendMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSendMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSendMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
