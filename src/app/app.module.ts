import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupViewComponent, LoginComponent } from './components';

@NgModule({
  declarations: [AppComponent, LoginComponent, GroupViewComponent],
  imports: [BrowserModule, AppRoutingModule, CommonModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
