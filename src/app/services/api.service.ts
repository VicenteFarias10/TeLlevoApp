// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza esto con la URL de tu servidor API

  constructor(private http: HttpClient) { }

  // Obtener usuarios
  getUsers(): Observable<any[]> {
    // Define el encabezado como un objeto HttpHeaders
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Reemplaza con tu lógica de token
    });

    // Usar el encabezado en la solicitud HTTP
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }

  // Crear usuario
  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  // Actualizar usuario
  updateUser(userId: string, updatedUser: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, updatedUser);
  }

  // Eliminar usuario
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }
}
