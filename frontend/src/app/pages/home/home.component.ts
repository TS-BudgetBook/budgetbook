import { Component } from '@angular/core';
import { googleLoginComponent } from '../../components/login/googleLogin.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [googleLoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
