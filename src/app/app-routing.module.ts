import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { AddComponent } from './form/add/add.component';
import { ListComponent } from './form/list/list.component';
import { ViewComponent } from './form/view/view.component';
import { DashboardComponent } from './Auth/dashboard/dashboard.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'add',component:AddComponent},
  {path:'list',component:ListComponent},
  {path:'view',component:ViewComponent},
  {path:'edit',component:AddComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
