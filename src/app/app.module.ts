import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BarnyardService } from './barnyard.service';
import { ComponentsModule } from './components/components.module';
import { barnyardComponent } from './barnyards/barnyard.component';
import { AnimalComponent } from './animal/animal.component';
import { GraficoBarrasComponent } from './grafico-barras/grafico-barras.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    AppComponent,
    barnyardComponent,
    AnimalComponent,
    GraficoBarrasComponent
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgApexchartsModule,

  ],
  providers: [
    BarnyardService,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
