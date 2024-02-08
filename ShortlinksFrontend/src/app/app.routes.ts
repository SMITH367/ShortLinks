import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CreateshlyComponent } from './pages/createshly/createshly.component';
import { authGuard } from './guards/auth/auth.guard';
import { unauthGuard } from './guards/unauth/unauth.guard';

export const routes: Routes = [
  {
    path:'', component:HomeComponent, title:'Home', canMatch:[unauthGuard]
  },
  {
    path:'login', component:LoginComponent, title:'Login', canMatch:[unauthGuard]
  },
  {
    path:'signup', component:RegisterComponent, title:'Signup', canMatch:[unauthGuard]
  },
  {
    path:'dashboard', component:DashboardComponent, title:'Dashboard', canMatch:[authGuard]
  },
  {
    path:'dashboard/create', component:CreateshlyComponent, title:'Create shly', canMatch:[authGuard]
  },
  {
    path:'**', component:NotFoundComponent, title:"404"
  }
];
