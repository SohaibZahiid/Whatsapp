import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { blockGuard } from './guards/block.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [blockGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [blockGuard] },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
