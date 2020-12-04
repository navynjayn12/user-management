import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsercomponentComponent } from './usercomponent/usercomponent.component';

const routes: Routes = [
  {path:'',
   children:[
     {path:'',component:LoginComponent},
     {path:'user',component:UsercomponentComponent},
   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
