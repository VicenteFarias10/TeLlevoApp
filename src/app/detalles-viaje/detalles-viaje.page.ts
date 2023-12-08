import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalles-viaje',
  templateUrl: './detalles-viaje.page.html',
  styleUrls: ['./detalles-viaje.page.scss'],
})
export class DetallesViajePage implements OnInit, OnDestroy {
  viaje: any;
  viajeIniciado: boolean = false;
  viajeIniciadoSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const viajeId = params['id'];
      this.obtenerDetallesViaje(viajeId);
      this.viajeIniciadoSubscription = this.authService
        .obtenerViajeIniciado()
        .subscribe((iniciado: boolean) => {
          this.viajeIniciado = iniciado;
        });
    });
  }

  ngOnDestroy() {
    if (this.viajeIniciadoSubscription) {
      this.viajeIniciadoSubscription.unsubscribe();
    }
  }

  obtenerDetallesViaje(viajeId: string) {
    this.authService.obtenerDetallesViaje(viajeId).subscribe(
      (response: any) => {
        this.viaje = response.viaje;
        this.viajeIniciado = response.viaje.iniciado;
      },
      (error) => {
        console.error('Error al obtener detalles del viaje:', error);
      }
    );
  }

  comenzarViaje() {
    if (!this.viajeIniciado) {
      this.authService.comenzarViaje(this.viaje._id).subscribe(
        (response: any) => {
          if (response && response.mensaje) {
            console.log(response.mensaje);
          } else {
            console.error(
              'La respuesta no contiene la propiedad "mensaje":',
              response
            );
          }
        },
        (error) => {
          console.error('Error al comenzar el viaje:', error);
        }
      );
    } else {
      console.log('El viaje ya ha sido iniciado.');
    }
  }

  finalizarViaje() {
    this.router.navigate(['/welcome-cond']);
    this.authService.finalizarViaje(this.viaje._id).subscribe(
      (response: any) => {
        console.log(response.mensaje);
      },
      (error) => {
        console.error('Error al finalizar el viaje:', error);
      }
    );
  }
}
