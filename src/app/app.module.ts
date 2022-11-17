import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MensajesComponent } from './shared/components/mensajes/mensajes.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import {FullCalendarModule} from 'primeng/fullcalendar';


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
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
