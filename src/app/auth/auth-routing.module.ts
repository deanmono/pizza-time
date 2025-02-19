import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path     : '',
    children : [
      {
        path          : 'login',
        loadComponent : () => import('./login/login.component').then(m => m.LoginComponent),
      },
      // {
      //   path          : 'forgot-password',
      //   loadComponent : () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
      // },
      // {
      //   path          : 'validate-account',
      //   loadComponent : () => import('./validate-account/validate-account.component').then(m => m.ValidateAccountComponent),
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
