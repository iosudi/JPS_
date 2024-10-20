import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { widthGuard } from './guard/width.guard';
import { CheckEmailPopupComponent } from './pages/check-email-popup/check-email-popup.component';
import { CreateNewPasswordComponent } from './pages/create-new-password/create-new-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { OtpCodeComponent } from './pages/otp-code/otp-code.component';
import { RegisterComponent } from './pages/register/register.component';
import { TokenCheckComponent } from './pages/token-check/token-check.component';

const routes: Routes = [
  {
    path: 'auth',
    component: TokenCheckComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    title: 'Login to Your JPS Account',
    canActivate: [widthGuard],
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    title: 'Join the JPS Community',
    canActivate: [widthGuard],
  },
  {
    path: 'auth/OTP',
    component: OtpCodeComponent,
    title: 'Verify your otp code',
    canActivate: [widthGuard],
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
    title: 'Forgot your password? Enter your email to reset it.',
    canActivate: [widthGuard],
  },
  {
    path: 'auth/check-email',
    component: CheckEmailPopupComponent,
    title: 'Check your email',
    canActivate: [widthGuard],
  },
  { path: 'auth/createNewPassword', component: CreateNewPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
