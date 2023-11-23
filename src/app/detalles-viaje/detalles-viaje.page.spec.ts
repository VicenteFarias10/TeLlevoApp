import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesViajePage } from './detalles-viaje.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../services/api.service';

describe('DetallesViajePage', () => {
  let component: DetallesViajePage;
  let fixture: ComponentFixture<DetallesViajePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesViajePage],
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['viajeId', 'someValue']]) } },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
