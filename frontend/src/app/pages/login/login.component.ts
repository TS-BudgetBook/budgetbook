import { Component } from '@angular/core';
import { googleLoginComponent } from '../../components/login/googleLogin.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [googleLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
