import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesViajePasajeroPage } from './detalles-viaje-pasajero.page';

describe('DetallesViajePasajeroPage', () => {
  let component: DetallesViajePasajeroPage;
  let fixture: ComponentFixture<DetallesViajePasajeroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetallesViajePasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
