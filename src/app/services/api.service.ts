import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu servidor API
  private secretKey = 'secreto'; 

  constructor(private http: HttpClient) {}

  // Función para agregar el token a las solicitudes
  private addTokenToHeaders(headers: HttpHeaders): HttpHeaders {
    const token = localStorage.getItem('secreto');
    if (token) {
      return headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  login(username: string, password: string) {
    const credentials = { username, password };
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        map((response: any) => {
          // Almacena el token en localStorage
          localStorage.setItem('secreto', response.token);
        })
      );
  }

  getUserData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('secreto')}`
    });

    return this.http.get(`${this.apiUrl}/user-data`, { headers });
  }
}
