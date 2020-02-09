import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// temporal
import { FormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app.routes';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';

import { ServiceModule } from "./services/service.module";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    FormsModule,
    ServiceModule,
    APP_ROUTES
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
