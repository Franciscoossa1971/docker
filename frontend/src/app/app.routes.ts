import { Routes } from '@angular/router';
import { PersonaComponent } from './modules/persona/persona.component';
import { TareaComponent } from './modules/tarea/tarea.component';
import { LandingComponent } from './modules/landing/landing/landing.component';
import { InicioComponent } from './modules/inicio/inicio.component';
import { ReservaComponent } from './modules/reserva/reserva.component';

export const routes: Routes = [
    {path:'', component: InicioComponent},
    {path:'tarea', component: TareaComponent},
    {path:'persona', component: PersonaComponent},
    {path:'landing', component: LandingComponent},
    {path:'reserva', component: ReservaComponent},

];
