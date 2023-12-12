
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  username: string = '';
  role: string = '';
  viajesDisponibles: any[] = [];
  doRefresh(event : any) {
   
    setTimeout(() => {
      this.obtenerViajesDisponibles(); 
      event.target.complete(); 
    }, 2000); 
  }
  

  constructor( private router: Router,private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') as string;
    this.role = localStorage.getItem('role') as string;
    this.obtenerViajesDisponibles();
  }

  obtenerViajesDisponibles() {
    this.authService.obtenerViajesDisponibles().subscribe(
      (response: any) => {
        this.viajesDisponibles = response.viajes;
      },
      (error) => {
        console.error('Error al obtener los viajes disponibles:', error);
      }
    );
  }

  solicitarViaje(viajeId: string) {
    if (!viajeId) {
      console.error('Error: No se proporcionó un ID de viaje válido.');
      this.toastr.error('Error al solicitar el viaje');
      return;
    }
  
    const solicitudViajeData = { viajeId, username: this.username };
  
    
    this.authService.solicitarViaje(viajeId, this.username).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
  
        if (response.viaje && response.viaje._id) {
          const nuevoViaje = response.viaje;
          this.toastr.success('Solicitud de viaje exitosa');
  
          // Navega a la nueva página de detalles-viaje-p con el ID del nuevo viaje
          this.router.navigate(['/detalles-viaje-pasajero', nuevoViaje._id]);
  
        } else {
          console.error('Error: No se recibió un ID de viaje válido en la respuesta del servidor.');
          this.toastr.error('Error al solicitar el viaje');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        this.toastr.error('Error al solicitar el viaje');
      }
    );
  }
};