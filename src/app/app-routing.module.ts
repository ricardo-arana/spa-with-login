import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskGuard } from './task/guards/task.guard';

const routes: Routes = [
  {path: 'auth' ,loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
  {path: 'task' ,loadChildren: () => import('./task/task.module').then( m => m.TaskModule), canActivate: [TaskGuard]},
  {path: '**', pathMatch: 'full', redirectTo: '/auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
