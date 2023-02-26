import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Mf2Module } from './mf2/mf2.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, Mf2Module],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
