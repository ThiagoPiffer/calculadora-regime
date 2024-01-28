import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { CalculadoraRegimeComponent } from './calculadora-regime/calculadora-regime.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calculadora-regime',
    pathMatch: 'full',
  },
  {
    path: 'calculadora-regime',
    component: CalculadoraRegimeComponent
  },
];

@NgModule({
  imports: [CommonModule, ButtonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
