import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },

  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },

  {
    path: 'recuperar-contrasenia',
    loadChildren: () => import('./recuperar-contrasenia/recuperar-contrasenia.module').then( m => m.RecuperarContraseniaPageModule)
  },
  {
    path: 'welcome-cond',
    loadChildren: () => import('./welcome-cond/welcome-cond.module').then( m => m.WelcomeCondPageModule)
  },
  {
    path: 'detalles-viaje/:id',  
    loadChildren: () => import('./detalles-viaje/detalles-viaje.module').then(m => m.DetallesViajePageModule)
  },
  {
    path: 'detalles-viaje-pasajero/:id',
    loadChildren: () => import('./detalles-viaje-pasajero/detalles-viaje-pasajero.module').then( m => m.DetallesViajePasajeroPageModule)
  },
  {
    path: 'viajes',
    loadChildren: () => import('./viajes/viajes.module').then( m => m.ViajesPageModule)
  },


  
 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
