import { Component } from '@angular/core';
import { TokenstorageService } from '../../services/tokenstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private tokenstorageService: TokenstorageService, private router: Router) {

  }
  ngOnInit() {
    this.tokenstorageService.remove('jwt');
    this.router.navigate(['']);
  }

}
