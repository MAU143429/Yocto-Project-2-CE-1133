import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PuertasComponent } from './puertas/puertas.component';
import { CamaraComponent } from './camara/camara.component';
import { LoginComponent } from './login/login.component';
import { BaseComponent } from './base/base.component';
import { RegisterComponent } from './register/register.component';

const appRoutes:Routes=[
  {path:'', component: MainComponent},
  {path:'puertas', component: PuertasComponent},
  {path:'camara', component: CamaraComponent},
  //{path:'**', component: NotFoundComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    TopbarComponent,
    PuertasComponent,
    CamaraComponent,
    LoginComponent,
    BaseComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
