import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {
  email: string = '';
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private apiService: ApiService) {}

  register() {
    // Mostrar el spinner de carga
    this.isLoading = true;

    // Datos del usuario a registrar
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    // Realizar la solicitud de registro
    this.apiService.createUser(userData).subscribe(
      (response) => {
        // Registro exitoso, redirigir a la página de inicio de sesión
        this.router.navigate(['/iniciar-sesion']);

        // Ocultar el spinner de carga
        this.isLoading = false;
      },
      (error) => {
        // Manejar errores de registro, como correo electrónico o usuario ya registrados
        console.error('Error de registro', error);

        // Ocultar el spinner de carga
        this.isLoading = false;
      }
    );
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
