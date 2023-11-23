import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: 'iniciar-sesion.page.html',
  styleUrls: ['iniciar-sesion.page.scss'],
})
export class IniciarSesionPage {
  username: string = '';
  password: string = '';
  role: string = '';
  isLoading: boolean = false;

  loginError: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  navigateToRecuperar() {
    this.router.navigate(['/recuperar-contrasenia']);
  }

  async showInvalidCredentialsAlert() {
    const alert = await this.alertController.create({
      header: 'Credenciales Inválidas',
      message: 'El nombre de usuario o la contraseña son incorrectos. Por favor, inténtalo de nuevo.',
      buttons: ['OK'],
    });

    await alert.present();
  }
  login() {
    // Mostrar el spinner de carga
    this.isLoading = true;
  
    // Llamar a la función de inicio de sesión de la API
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => { // Asegura que TypeScript entienda que 'response' es de tipo 'any'
        // Obtener el rol del usuario desde el token, puedes hacerlo si el token incluye el rol
        const token = localStorage.getItem('secreto');
        if (token) {
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          this.role = tokenData.role;
        }
  
        // Almacenar el nombre de usuario y rol en localStorage si lo deseas
        localStorage.setItem('username', this.username);
        localStorage.setItem('role', this.role);
  
        // Almacenar el ID del conductor si el usuario es un conductor
        if (this.role === 'conductor' && response && response.userId) {
          localStorage.setItem('conductorId', response.userId);
        }
      
  
        // Redirigir a la página correspondiente
        this.router.navigate([`/welcome${this.role === 'conductor' ? '-cond' : ''}`], {
          state: { username: this.username, role: this.role },
        });
  
        // Ocultar el spinner de carga
        this.isLoading = false;
      },
      (error) => {
        this.showInvalidCredentialsAlert();
        this.isLoading = false;
      }
    );
  }
}