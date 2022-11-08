import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import ('./auth/auth.module').then(x => x.AuthModule) },
  { path: 'user', loadChildren: () => import ('./private/private.module').then(x => x.PrivateModule)},
  { path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
