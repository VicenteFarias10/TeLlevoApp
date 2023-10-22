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
  isLoading: boolean = false;

  loginError: string = '';

  constructor(
    private router: Router, 
    private apiService: AuthService,
    private alertController: AlertController) {}

  navigateToRecuperar() {
    this.router.navigate(['/recuperar-contrasenia']);
  }
  async showInvalidCredentialsAlert() {
    const alert = await this.alertController.create({
      header: 'Credenciales Inválidas',
      message: 'El nombre de usuario o la contraseña son incorrectos. Por favor, inténtalo de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  login() {
    // Mostrar el spinner de carga
    this.isLoading = true;

    // Llamar a la función de inicio de sesión de la api
    this.apiService.login(this.username, this.password).subscribe(
      (response) => {
        // Inicio de sesión exitoso redirige a la página de bienvenida
        this.router.navigate(['/welcome'], { state: { username: this.username } });

        // Almacenar el nombre de usuario en localStorage
        localStorage.setItem('username', this.username);

        // Oculta el spinner de carga
        this.isLoading = false;
      },
      (error) => {
        this.showInvalidCredentialsAlert();
        this.isLoading = false;
   
      
   

       
      }
    );
  }
}

