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
      // Crear una nueva tarea
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

  // Método exclusivo para actualizar tarea
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
      this.cargarTareas(); 
    }, error => {
      this.notificacion.error('Error al actualizar la tarea');
    });
  }

  // Cambiar el estado de realización y actualizar la fecha de realización
  cambiarEstadoTarea(tarea: Tarea) {
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
    const confirmacion = await this.notificacion.confirmar("¿Estás seguro de que deseas eliminar la tarea?");

    if (confirmacion) {
      this.tareaService.eliminarTarea(tarea.id!).subscribe(() => {
        this.cargarTareas();
        this.notificacion.success('Tarea eliminada');
      });
    }
  }

  // Método para cargar los datos de la tarea en el formulario 
  editarTarea(tarea: Tarea) {
    this.tareaEditando = tarea; 
    this.tareaForm.patchValue({ 
      nombre: tarea.nombre
    });
  }
}
