import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputOtpModule } from 'primeng/inputotp';
import { CoreModule } from 'src/app/core/core.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CheckEmailPopupComponent } from './pages/check-email-popup/check-email-popup.component';
import { CreateNewPasswordComponent } from './pages/create-new-password/create-new-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { OtpCodeComponent } from './pages/otp-code/otp-code.component';
import { RegisterComponent } from './pages/register/register.component';
import { TokenCheckComponent } from './pages/token-check/token-check.component';

@NgModule({
  declarations: [
    CheckEmailPopupComponent,
    CreateNewPasswordComponent,
    ForgotPasswordComponent,
    LoginComponent,
    OtpCodeComponent,
    RegisterComponent,
    TokenCheckComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    InputOtpModule,
    DropdownModule,
  ],
})
export class AuthenticationModule {}
