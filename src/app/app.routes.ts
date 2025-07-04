import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { HistorialComponent } from './historial/historial';
import { RegistroHerramientaComponent } from './registro-herramienta/registro-herramienta';
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registro-herramienta', component: RegistroHerramientaComponent },
  { path: 'historial', component: HistorialComponent }
];
