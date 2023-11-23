import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarSesionPage } from './iniciar-sesion.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../services/api.service';

describe('IniciarSesionPage', () => {
  let component: IniciarSesionPage;
  let fixture: ComponentFixture<IniciarSesionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IniciarSesionPage],
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarSesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
