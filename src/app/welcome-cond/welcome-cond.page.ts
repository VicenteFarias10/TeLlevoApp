import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome-cond',
  templateUrl: './welcome-cond.page.html',
  styleUrls: ['./welcome-cond.page.scss'],
})
export class WelcomeCondPage implements OnInit {
  username: string = '';
  role: string = '';
  viajeData: any = {
    origen: '',
    destino: '',
    precio: 0,
    asientosDisponibles: 0,
    conductorUsername: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';
    this.viajeData.conductorUsername = this.username;
  }

  CrearViaje() {
    // Antes de hacer la solicitud, imprime la información relevante
    console.log('Viaje Data:', this.viajeData);
  
    this.authService.crearViaje(this.viajeData).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
  
        if (response.viajeId) {
          const nuevoViajeId = response.viajeId;
          this.toastr.success('Viaje creado exitosamente');
          // Navegar a la página de detalles-viaje con el ID del viaje
          this.router.navigate(['/detalles-viaje', nuevoViajeId]);
        } else {
          console.error('Error: No se recibió un ID de viaje válido en la respuesta del servidor.');
          this.toastr.error('Error al crear el viaje');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        this.toastr.error('Error al crear el viaje');
      }
    );
  }
}
