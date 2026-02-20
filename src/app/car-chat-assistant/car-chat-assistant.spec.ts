import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CARCHATASSISTANT } from './car-chat-assistant';

describe('CARCHATASSISTANT', () => {
  let component: CARCHATASSISTANT;
  let fixture: ComponentFixture<CARCHATASSISTANT>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CARCHATASSISTANT]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CARCHATASSISTANT);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
