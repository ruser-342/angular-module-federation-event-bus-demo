import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Mf1Component } from './mf1.component';

@NgModule({
  declarations: [Mf1Component],
  imports: [CommonModule, MatButtonModule],
  exports: [Mf1Component],
})
export class Mf1Module {
  getEntryPoint() {
    return Mf1Component;
  }
}
