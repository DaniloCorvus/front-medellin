import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalComponent } from './animal/animal.component';
import { barnyardComponent } from './barnyards/barnyard.component';



const routes: Routes = [
  { path: 'barnyards', component: barnyardComponent },
  { path: 'animals', component: AnimalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


