import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  viajes: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.cargarViajes();
  }

  cargarViajes() {
    this.authService.obtenerViajesDisponibles().subscribe(
      (response: any) => {
        console.log('Respuesta de obtenerViajesDisponibles:', response);
        this.viajes = response.viajes;
      },
      (error) => {
        console.error('Error al obtener la lista de viajes:', error);
      }
    );
  }

  verDetallesViaje(viaje: any) {
    this.router.navigate(['/detalles-viaje', viaje._id]);
  }


  irACrearViaje() {
    this.router.navigate(['/welcome-cond']);
  }

  doRefresh(event : any) {
  
    setTimeout(() => {
      this.cargarViajes(); 
      event.target.complete(); 
    }, 2000); 
  }
}

