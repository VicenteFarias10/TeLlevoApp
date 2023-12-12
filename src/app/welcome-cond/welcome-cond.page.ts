import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { PickerController } from '@ionic/angular';


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
    horaInicio: '',
    diaInicio: '',
    conductorUsername: '',
  };

  constructor(
    private pickerController: PickerController,
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
    
    console.log('Viaje Data:', this.viajeData);
  
    this.authService.crearViaje(this.viajeData).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
  
        if (response.viajeId) {
          this.toastr.success('Viaje creado exitosamente');
          // Navegar a la página de lista de viajes
          this.router.navigate(['/viajes']);
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
  verMisViajes() {
   
    this.router.navigate(['/viajes']);
  }
  async openHourPicker() {
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (selectedValue) => {
            if (selectedValue && selectedValue['hour'] && selectedValue['minute'] && selectedValue['period']) {
              const selectedHour = selectedValue['hour']['value'];
              const selectedMinute = selectedValue['minute']['value'];
              const selectedPeriod = selectedValue['period']['value'];
  
              this.viajeData.horaInicio = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
            } else {
              console.error('Valor de hora seleccionado no válido:', selectedValue);
            }
          },
        },
      ],
      columns: [
        {
          name: 'hour',
          options: this.generateNumberOptions(1, 12), 
        },
        {
          name: 'minute',
          options: this.generateNumberOptions(0, 59), 
        },
        {
          name: 'period',
          options: [
            { text: 'AM', value: 'AM' },
            { text: 'PM', value: 'PM' },
          ],
        },
      ],
    });
    await picker.present();
  }

  async openDatePicker() {
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (selectedValue) => {
            this.viajeData.diaInicio = selectedValue['day']['value'];
          },
        },
      ],
      columns: [
        {
          name: 'day',
          options: [
            { text: 'Lunes', value: 'Lunes' },
            { text: 'Martes', value: 'Martes' },
            { text: 'Miercoles', value: 'Miercoles' },
            { text: 'Jueves', value: 'Jueves' },
            { text: 'Viernes', value: 'Viernes' },
            { text: 'Sabado', value: 'Sabado' },
            { text: 'Domingo', value: 'Domingo' },
            
          ],
        },
      ],
    });
    await picker.present();
  }

  private generateNumberOptions(start: number, end: number): { text: string; value: string }[] {
    const options = [];
    for (let i = start; i <= end; i++) {
      const value = i < 10 ? `0${i}` : `${i}`;
      options.push({ text: value, value });
    }
    return options;
  }
}

  

