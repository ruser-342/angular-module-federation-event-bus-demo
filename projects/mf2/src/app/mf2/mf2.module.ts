import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Mf2Component } from './mf2.component';

@NgModule({
  declarations: [Mf2Component],
  imports: [CommonModule, MatButtonModule],
  exports: [Mf2Component],
})
export class Mf2Module {
  getEntryPoint() {
    return Mf2Component;
  }
}
