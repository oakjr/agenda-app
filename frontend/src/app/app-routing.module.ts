import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { EventoFormComponent } from './evento-form/evento-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'evento/novo', component: EventoFormComponent, canActivate: [AuthGuard] },
  { path: 'evento/:id/editar', component: EventoFormComponent, canActivate: [AuthGuard] },
  { path: 'evento/:id/editar', component: EventoFormComponent, canActivate: [AuthGuard] },
  { path: 'evento/novo', component: EventoFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
