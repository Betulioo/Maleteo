import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { ReservaFormComponent } from './pages/reservas/reserva-form/reserva-form.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './pages/users/user-profile/user-profile.component';
import { AnuncioFormComponent } from './pages/anuncios/anuncio-form/anuncio-form.component';
import { AnuncioDetailComponent } from './pages/anuncios/anuncio-detail/anuncio-detail.component';
import { ReservasListComponent } from './pages/reservas/reservas-list/reservas-list.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    
      },
      {
        path: 'home', component: ReservaFormComponent
    
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'reservar', component: ReservaFormComponent
      },
      {
        path: 'users', component: UserProfileComponent
      },
      {
        path: 'anuncios', component: AnuncioFormComponent
      },{
  
  
        path: 'detail/:id', component: AnuncioDetailComponent
      },{
      
      
        path: 'reserva/:id', component: ReservasListComponent
      },{
      
      
        path: 'register', component: RegisterComponent
      }
    
];
