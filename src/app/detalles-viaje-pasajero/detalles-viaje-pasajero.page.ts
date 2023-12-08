import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalles-viaje-pasajero',
  templateUrl: './detalles-viaje-pasajero.page.html',
  styleUrls: ['./detalles-viaje-pasajero.page.scss'],
})
export class DetallesViajePasajeroPage implements OnInit, OnDestroy {
  viaje: any;
  viajeIniciado: boolean = false;
  viajeIniciadoSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const viajeId = params['id'];
      this.obtenerDetallesViaje(viajeId);
      this.viajeIniciadoSubscription = this.authService
        .viajeIniciado$
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

  finalizarViaje() {
    this.authService.finalizarViaje(this.viaje.id).subscribe(
      () => {
        this.router.navigate(['/welcome']);
        this.presentToast('Su viaje ha finalizado.');
      },
      (error) => {
        console.error('Error al finalizar el viaje:', error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }
}
