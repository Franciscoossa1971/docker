import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tarea } from '../../classes/tarea/tarea'; 
import { TareaService } from '../../services/tarea/tarea.service';
import { NotificacionService } from '../../services/notificacion/notificacion.service';

@Component({
  selector: 'app-tarea',
  imports: [ReactiveFormsModule, CommonModule, ],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent implements OnInit{

  tareaForm: FormGroup;
  tareas: Tarea[] = [];
  tareaEditando?: Tarea; 
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, 
    private tareaService: TareaService, 
    private notificacion: NotificacionService) {
    
      this.tareaForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarTareas();
    
  }

onSubmit() {
  if (this.tareaForm.valid) {
    const nuevaTarea: Tarea = {
      nombre: this.tareaForm.value.nombre,
      fechaCreacion: new Date().toISOString(),
      realizada: false,
      fechaRealizacion: null 
    };

    if (this.tareaEditando) {
      this.actualizarTarea(this.tareaEditando.id!, nuevaTarea.nombre);
      this.tareaEditando = undefined; 
    } else {
      this.tareaService.guardarTarea(nuevaTarea).subscribe({
        next: () => {
          this.notificacion.success('Tarea guardada');
          this.tareaForm.reset();
          this.cargarTareas(); 
        },
        error: (err) => {
          console.error('Error al guardar la tarea:', err);
          this.notificacion.error('Error al guardar la tarea');
        }
      });
    }
  }
}

cargarTareas() {
    this.tareaService.obtenerTareas().subscribe((data) => {
      this.tareas = data;
    });
  }

  actualizarTarea(id: number, nuevoNombre: string) {
    const tareaActualizada = {
      nombre: nuevoNombre,
      realizada: false, 
      fechaCreacion: new Date().toISOString(),
      fechaRealizacion: null 
    };

    this.tareaService.actualizarTarea(id, tareaActualizada).subscribe(() => {
      this.notificacion.success('Tarea actualizada correctamente');
      this.tareaForm.reset();
      this.tareaEditando = undefined; 
      this.isEditing = false;
      this.cargarTareas(); 
    }, error => {
      this.notificacion.error('Error al actualizar la tarea');
    });
  }

  cambiarEstadoTarea(tarea: Tarea) {
    if (this.isEditing) return;
    const tareaActualizada = {
      ...tarea,
      realizada: !tarea.realizada,
      fechaRealizacion: !tarea.realizada ? new Date().toISOString() : null
    };

    this.tareaService.actualizarTarea(tarea.id!, tareaActualizada).subscribe(() => {
      this.cargarTareas();
      if (!tarea.realizada) {
        this.notificacion.info('Tarea marcada como REALIZADA');
      } else {
        this.notificacion.info('La tarea vuelve a estar para realizar !!!');
      }
    });
  }

  async eliminarTarea(tarea: Tarea) {
    if (this.isEditing) return;
    const confirmacion = await this.notificacion.confirmar("¿Estás seguro de que deseas eliminar la tarea?");

    if (confirmacion) {
      this.tareaService.eliminarTarea(tarea.id!).subscribe(() => {
        this.cargarTareas();
        this.notificacion.success('Tarea eliminada');
      });
    }
  }

  editarTarea(tarea: Tarea) {
    this.isEditing = true; 
    this.tareaEditando = tarea; 
    this.tareaForm.patchValue({ 
      nombre: tarea.nombre
    });
  }

  cancelarEdicion() {
    this.isEditing = false;  
    this.tareaEditando = undefined;
    this.tareaForm.reset();
  }
}
