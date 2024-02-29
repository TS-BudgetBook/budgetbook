import { Component } from '@angular/core';
import { TokenstorageService } from '../../services/tokenstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private tokenstorageService: TokenstorageService, private router: Router) { }

  ngOnInit() {
    this.tokenstorageService.getTokenFromUrl()
    if (this.tokenstorageService.get('jwt')) {
      this.router.navigate(['/expenses']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
