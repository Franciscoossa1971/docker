import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reserva } from '../../classes/reserva/reserva';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { ReservaService } from '../../services/reserva/reserva.service';

@Component({
  selector: 'app-reserva',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent implements OnInit {

  reservaForm!: FormGroup;
  horasDisponibles: string[] = [];
  todasReservas: Reserva[] = [];

  reservaService = inject(ReservaService);
  notificacion = inject(NotificacionService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      dia: ['', Validators.required],
      numero: ['', Validators.required],
      hora: ['', Validators.required],
      nombre: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      const nuevaReserva: Reserva = {
        dia: this.reservaForm.value.dia,
        numero: this.reservaForm.value.numero,
        hora: this.reservaForm.value.hora,
        nombre: this.reservaForm.value.nombre,
        disponible: true
      };

      this.reservaService.fechaDisponible(nuevaReserva).subscribe({
        next: (result) => {
          if (!result.disponible) {
            this.notificacion.error("Ya existe una reserva en esa fecha y hora.");
            this.reservaForm.reset();
            return;
          }
          this.reservaService.guardarReserva(nuevaReserva).subscribe({
            next: () => {
              this.notificacion.success('Reserva realizada con éxito');
              this.reservaForm.reset();
              this.listarTodasReservas();
            },
            error: () => {
              this.notificacion.error('No se ha realizado la reserva');
            }
          });
        },
        error: () => {
          this.notificacion.error('Error al verificar disponibilidad');
        }
      });
    } else {
      this.notificacion.error('El formulario no es válido');
    }
  }
  cargarHorasDisponibles(): void {
    const diaSeleccionado = this.reservaForm.get('dia')?.value;

    if (diaSeleccionado) {
      const fecha = new Date(diaSeleccionado);
      if (!isNaN(fecha.getTime())) {
        this.reservaService.getHorasDisponibles(diaSeleccionado).subscribe(
          (response: any) => {
            if (Array.isArray(response)) {
              this.horasDisponibles = response;
              console.log("Horas disponibles:", this.horasDisponibles);
            } else {
              console.error('La respuesta no es correcta', response);
            }
          },
          (error) => {
            console.error('Error al obtener las horas disponibles', error);
            this.notificacion.error('Error al obtener las horas disponibles');
          }
        );
      } else {
        console.error('Fecha inválida');
        this.notificacion.error('Fecha inválida');
      }
    } else {
      this.horasDisponibles = [];
    }
  }

  listarTodasReservas() {
    this.reservaService.obtenerReservas().subscribe((data) => {
      this.todasReservas = data;
    });
  }

  async eliminarReserva(reserva: Reserva) {
    const confirmar = await this.notificacion.confirmar('¿Estás seguro de que deseas eliminar esta reserva?');

    if (confirmar) {
      this.reservaService.eliminarReserva(reserva).subscribe({
        next: () => {
          this.todasReservas = this.todasReservas.filter(r => r.id !== reserva.id);
          this.reservaForm.reset();
          this.notificacion.success("Reserva eliminada");
        },
        error: (err) => {
          this.notificacion.error("Error al eliminar la reserva");
          console.error(err);
        }
      });
    }
  }
}