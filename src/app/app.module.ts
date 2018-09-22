import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { AprobacionCreditoComponent } from './components/aprobacion-credito/aprobacion-credito.component';
import { MenuComponent } from './shared/menu/menu.component';

// Firebase Imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AprobacionCreditoComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
