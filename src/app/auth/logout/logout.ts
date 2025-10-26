import {Component} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-logout', imports: [HttpClientModule], templateUrl: './logout.html', styleUrl: './logout.sass'
})
export class Logout {
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['/confirm/disconnect']);
  }
}
