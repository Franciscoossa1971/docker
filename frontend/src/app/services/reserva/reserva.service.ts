import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../../classes/reserva/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = "http://localhost:8080/reservas";

  constructor(private http: HttpClient) { }

  // Método para obtener todas las reservas
  obtenerReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/findAll`);
  }

  // Método para guardar una nueva reserva
  guardarReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl}/add`, reserva);
  }

  // Método para eliminar una reserva por ID
  eliminarReserva(reserva: Reserva): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reserva.id}`);
  }

  // Método para actualizar una reserva
  actualizarReserva(id: number, reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, reserva);
  }

  // Método para buscar una reserva por su ID
  buscarReservaPorId(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  // Método para verificar si una fecha y hora están disponibles
  fechaDisponible(reserva: Reserva): Observable<{ disponible: boolean }> {
    return this.http.post<{ disponible: boolean }>(`${this.apiUrl}/fecha-disponible`, reserva);
  }

  // Método para obtener las horas disponibles de un día específico
  getHorasDisponibles(dia: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/horas-disponibles?dia=${dia}`);
  }
}




