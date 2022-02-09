import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{AddEmployeeComponent} from './add-employee/add-employee.component';
import{UpdateEmployeeComponent} from './update-employee/update-employee.component';
import{ListEmployeeComponent} from './list-employee/list-employee.component';
import{LoginComponent} from './login/login.component';
import{RegisterComponent} from './register/register.component';
import { AuthServiceService } from './auth-service.service';
import { ErrorComponent } from './error/error.component';




const routes: Routes = [
  {path: 'add', component: AddEmployeeComponent,canActivate:[AuthServiceService]},
  {path: 'update/:id', component: UpdateEmployeeComponent},
  {path: 'logout', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'list', component:ListEmployeeComponent, canActivate:[AuthServiceService]},
  {path: 'error',component:ErrorComponent},
  {path: '', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
