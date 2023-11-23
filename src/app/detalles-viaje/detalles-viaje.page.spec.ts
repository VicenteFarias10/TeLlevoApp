import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DetallesViajePage } from './detalles-viaje.page';

describe('DetallesViajePage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesViajePage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'dummyId'
              }
            }
          }
        }
      ]
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DetallesViajePage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
