import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Socket } from 'ngx-socket-io'; 
import { AlertController } from '@ionic/angular';


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
    private toastController: ToastController,
    private socket: Socket,
    private alertController: AlertController,  
  ) {}

  ngOnInit() {
    this.socket.on('viajeFinalizado', (data: any) => {
      // Realiza cualquier lógica necesaria
      console.log('Evento viajeFinalizado recibido:', data);
    
      
      this.router.navigate(['/welcome']);
    });
    
    this.route.params.subscribe((params) => {
      const viajeId = params['id'];
      this.obtenerDetallesViaje(viajeId);

      
      this.socket.on('viajeIniciado', (data: any) => {
        
        this.viajeIniciado = true;
        console.log('Evento viajeIniciado recibido:', data);
      });

      this.viajeIniciadoSubscription = this.authService
        .viajeIniciado$
        .subscribe((iniciado: boolean) => {
          this.viajeIniciado = iniciado;
        });
    });
  }

  ngOnDestroy() {
    
    this.socket.disconnect();

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
}
