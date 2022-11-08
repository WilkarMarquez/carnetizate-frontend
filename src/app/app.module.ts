import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MensajesComponent } from './shared/components/mensajes/mensajes.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MensajesComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    HttpClientModule
    
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
