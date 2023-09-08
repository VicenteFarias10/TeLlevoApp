// registro.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {
  email: string = '';
  username: string = '';
  password: string = '';
  isLoading: boolean = false; // Agrega esta propiedad

  constructor(private router: Router) {}

  register() {
    // Mostrar el spinner de carga
    this.isLoading = true;

    // Simula una carga de 2 segundos
    setTimeout(() => {
      // Implementa aquí la lógica para registrar al usuario.
      // Puedes enviar los datos al servidor o guardarlos localmente.

      // Después del registro, redirige al usuario a la página de inicio de sesión.
      this.router.navigate(['/iniciar-sesion']);

      // Oculta el spinner de carga
      this.isLoading = false;
    }, 600);
  }

  goToHome() {
    // Utiliza Angular Routing para redirigir al usuario a la página de inicio.
    this.router.navigate(['/home']);
  }
}
