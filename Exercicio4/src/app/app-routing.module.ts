import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sintomas-saude',
    loadChildren: () => import('./sintomas-saude/sintomas-saude.module').then( m => m.SintomasSaudePageModule)
  },
  {
    path: 'editar-sintomas',
    loadChildren: () => import('./editar-sintomas/editar-sintomas.module').then( m => m.EditarSintomasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
