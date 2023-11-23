import { browser, element, by } from 'protractor';

describe('Pruebas E2E para Mi App', () => {
  it('debería mostrar el título en la página de inicio', () => {
    browser.get('/home');
    expect(element(by.css('ion-title')).getText()).toContain('Inicio');
  });

  it('debería navegar a la página de detalles desde la página de inicio', () => {
    element(by.css('[routerLink="/detalles-viaje/1"]')).click(); // Ajusta el ID según tu aplicación
    expect(browser.getCurrentUrl()).toContain('/detalles-viaje/1');
  });

  it('debería mostrar el título en la página de detalles', () => {
    expect(element(by.css('ion-title')).getText()).toContain('Detalles del Viaje');
  });

  it('debería volver a la página de inicio desde la página de detalles', () => {
    element(by.css('[routerLink="/home"]')).click();
    expect(browser.getCurrentUrl()).toContain('/home');
  });
});
