import { Component, inject, OnInit } from '@angular/core';
import { Persona } from '../../classes/persona/persona';
import { PersonaService } from '../../services/persona/persona.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../services/notificacion/notificacion.service';

@Component({
  selector: 'app-persona',
  imports: [ReactiveFormsModule, CommonModule, ],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent {

  private fb = inject(FormBuilder);
  private personaService = inject(PersonaService);
  private notificacion = inject(NotificacionService);

  personas: Persona[] = [];
  personaForm: FormGroup;
  modoEdicion: boolean = false;
  personaSeleccionadaId?: number;

  constructor() {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
    });

    this.cargarPersonas();
  }

  cargarPersonas(): void {
  this.personaService.getPersonas().subscribe(
    data => {
      this.personas = data;
    },
    error => {
      console.error('Error al cargar personas', error);
      this.notificacion.error('Hubo un problema al cargar las personas. Inténtalo nuevamente.');
    }
  );
}

guardar(): void {
  const persona: Persona = this.personaForm.value;

  if (this.modoEdicion && this.personaSeleccionadaId) {
    this.personaService.updatePersona(this.personaSeleccionadaId, persona).subscribe(
      () => {
        this.resetForm();
        this.cargarPersonas();
        this.notificacion.success('Persona actualizada con éxito');
      },
      error => {
        console.error('Error al actualizar la persona', error);
        this.notificacion.error('Hubo un problema al actualizar la persona. Inténtalo nuevamente.');
      }
    );
  } else {
    this.personaService.createPersona(persona).subscribe(
      () => {
        this.resetForm();
        this.cargarPersonas();
        this.notificacion.success('Persona guardada con éxito');
      },
      error => {
        console.error('Error al guardar la persona', error);
        this.notificacion.error('Hubo un problema al guardar la persona. Inténtalo nuevamente.');
      }
    );
  }
}


  editar(persona: Persona): void {
    this.modoEdicion = true;
    this.personaSeleccionadaId = persona.id!;
    this.personaForm.patchValue(persona);
    this.notificacion.info('Formulario cargado para editarlo');
  }

  async eliminar(id: number) {
    const confirmacion = await this.notificacion.confirmar('¿Estás seguro de eliminar esta persona?');
  if (confirmacion) {
    this.personaService.deletePersona(id).subscribe(
      () => {
        this.cargarPersonas();
        if (this.personaSeleccionadaId === id) {
          this.resetForm();
        }
        this.notificacion.success('Persona eliminada con éxito');
      },
      error => {
        console.error('Error al eliminar la persona', error);
        this.notificacion.error('Hubo un problema al eliminar la persona. Inténtalo nuevamente.');
      }
    );
  }
}


  cancelar(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.modoEdicion = false;
    this.personaSeleccionadaId = undefined;
    this.personaForm.reset();
    this.personaForm.markAsPristine();
    this.personaForm.markAsUntouched();
  }

  controlInvalido(campo: string): boolean {
  const control = this.personaForm.get(campo);
  return !!(control && control.invalid && (control.dirty || control.touched));
}

}
