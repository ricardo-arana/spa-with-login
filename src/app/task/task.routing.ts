import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';



const routes: Routes = [
    { path: 'main', component: MainComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'main'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule {}
