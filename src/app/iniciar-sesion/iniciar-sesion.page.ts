import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';

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
    private alertController: AlertController,
    private socket: Socket
  ) {}
  ngOnInit() {
    this.socket.fromEvent('testEvent').subscribe((data: any) => {
      console.log('Evento recibido desde el servidor:', data.message);
    });
  }

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
    
    this.isLoading = true;
  
    
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => { 
        const token = localStorage.getItem('secreto');
        if (token) {
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          this.role = tokenData.role;
        }
  
        
        localStorage.setItem('username', this.username);
        localStorage.setItem('role', this.role);
  
        
        if (this.role === 'conductor' && response && response.userId) {
          localStorage.setItem('conductorId', response.userId);
        }
      
  
        
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