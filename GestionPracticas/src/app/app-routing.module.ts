import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuAdminGeneralComponent } from './components/menu-admin-general/menu-admin-general.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'menu-admin-general', component: MenuAdminGeneralComponent},
  {path: '', redirectTo: 'menu-admin-general',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
