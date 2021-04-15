import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { MenuAdminGeneralComponent } from './menu-admin-general/menu-admin-general/menu-admin-general.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'menu-admin-general', component: MenuAdminGeneralComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
