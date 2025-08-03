import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tarea } from "../../classes/tarea/tarea";

@Injectable({
  providedIn: "root",
})
export class TareaService {
  private apiUrl = "http://localhost:8080/tarea";

  constructor(private http: HttpClient) {}

  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/findAll`);
  }

  guardarTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(`${this.apiUrl}/add`, tarea);
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  actualizarTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea);
  }

  buscarTareaPorId(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
  }
  
}
