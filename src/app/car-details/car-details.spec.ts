import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CarDetails } from './car-details';
import { Carsdata } from '../service/carsdata';

describe('CarDetails', () => {
  let component: CarDetails;
  let fixture: ComponentFixture<CarDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetails, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' }),
            },
          },
        },
        {
          provide: Carsdata,
          useValue: {
            getCarById: () => of(undefined),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
