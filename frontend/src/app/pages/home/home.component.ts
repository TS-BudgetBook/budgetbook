import { Component } from '@angular/core';
import { googleLoginComponent } from '../../components/login/googleLogin.component';
import { TokenstorageService } from '../../services/tokenstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [googleLoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private tokenstorageService: TokenstorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenstorageService.get('jwt')) {
      this.router.navigate(['/expenses']);
    }

  }
}
