import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/api.service';

@Component({
  selector: 'app-detalles-viaje',
  templateUrl: './detalles-viaje.page.html',
  styleUrls: ['./detalles-viaje.page.scss'],
})
export class DetallesViajePage implements OnInit {
  viaje: any;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const viajeId = params['id'];
      // Llama a una función para obtener los detalles del viaje usando el ID
      this.obtenerDetallesViaje(viajeId);
    });
  }

  obtenerDetallesViaje(viajeId: string) {
    this.authService.obtenerDetallesViaje(viajeId).subscribe(
      (response: any) => {
        this.viaje = response.viaje;
        // Ahora puedes utilizar this.viaje para acceder a los detalles del viaje
      },
      (error) => {
        console.error('Error al obtener detalles del viaje:', error);
        // Maneja el error según tus necesidades
      }
    );
  }
}
  
