import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: 'iniciar-sesion.page.html',
  styleUrls: ['iniciar-sesion.page.scss'],
})
export class IniciarSesionPage {
  username: string = '';
  password: string = '';
  isLoading: boolean = false; // Agrega esta propiedad

  constructor(private router: Router) {}

  login() {
    // Mostrar el spinner de carga
    this.isLoading = true;

    // Simula una carga de 2 segundos
    setTimeout(() => {
      // Implementa aquí la lógica de inicio de sesión
      // Luego, cuando haya terminado la carga, redirige a la página de bienvenida
      this.router.navigate(['/welcome/:username'], {
        state: { username: this.username },
      });

      // Oculta el spinner de carga
      this.isLoading = false;
    }, 600);
  }
}
