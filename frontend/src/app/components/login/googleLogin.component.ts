import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-googleLogin',
  standalone: true,
  imports: [],
  templateUrl: './googleLogin.component.html',
  styleUrl: './googleLogin.component.css',
})
export class GoogleLoginComponent {
  apiUrl = environment.apiUrl;
}
