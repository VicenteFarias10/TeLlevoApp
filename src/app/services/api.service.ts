// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = 'https://xr40pckj-3000.brs.devtunnels.ms'; 
  private viajeIniciadoSubject = new Subject<boolean>();
  viajeIniciado$ = this.viajeIniciadoSubject.asObservable();

  constructor(private http: HttpClient ,private alertController: AlertController) {}

  private addTokenToHeaders(): HttpHeaders {
    const token = localStorage.getItem('secreto');
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  login(username: string, password: string) {
    const credentials = { username, password };
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        map((response: any) => {
          localStorage.setItem('secreto', response.token);
          localStorage.setItem('username', response.username);
          console.log('Token almacenado:', response.token);
        })
      );
  }
  
  obtenerViajesDisponibles(): Observable<any> {
    const headers = this.addTokenToHeaders();
  
    return this.http.get(`${this.apiUrl}/viajes-disponibles`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener los viajes disponibles:', error);
        return throwError(error);
      })
    );
  }
  
  

  getUserData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('secreto')}`
    });

    return this.http.get(`${this.apiUrl}/user-data`, { headers });
  }

  crearViaje(viajeData: any): Observable<any> {
    const headers = this.addTokenToHeaders();
  
    return this.http.post(`${this.apiUrl}/viajes`, viajeData, { headers }).pipe(
      map((response: any) => ({ viajeId: response.viaje._id })),
      catchError((error: any) => {
        console.error(error);
        return throwError('Error al crear el viaje');
      })
    );
  }
  
  solicitarViaje(viajeId: string, username: string): Observable<any> {
    const headers = this.addTokenToHeaders();
    const solicitudViajeData = { viajeId, username };

    return this.http.post(`${this.apiUrl}/solicitar-viaje`, solicitudViajeData, { headers })
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError('Error al solicitar el viaje');
        })
      );
  }
  
  obtenerUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  obtenerDetallesViaje(viajeId: string): Observable<any> {
    const headers = this.addTokenToHeaders();
  
    return this.http.get(`${this.apiUrl}/viajes/${viajeId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener detalles del viaje:', error);
        return throwError(error);
      })
    );
  }

  obtenerViajeIniciado(): Observable<boolean> {
    return this.viajeIniciadoSubject.asObservable();
  }

  comenzarViaje(viajeId: string): Observable<any> {
    const headers = this.addTokenToHeaders();
  
    return this.http.post(`${this.apiUrl}/viajes/${viajeId}/iniciar`, {}, { headers })
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError('Error al comenzar el viaje');
        }),
        tap(() => {
          console.log('Viaje iniciado con éxito.');
          this.viajeIniciadoSubject.next(true);
        })
      );
  }


  finalizarViaje(viajeId: string): Observable<any> {
    const headers = this.addTokenToHeaders();
  
    return this.http.post(`${this.apiUrl}/viajes/${viajeId}/finalizar`, {}, { headers })
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError('Error al finalizar el viaje');
        }),
        tap(() => {
          console.log('Viaje finalizado con éxito.');
          this.viajeIniciadoSubject.next(false);
        })
      );
  }
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}

