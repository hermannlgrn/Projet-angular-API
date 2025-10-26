import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth-service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('projetArticles');


  constructor(
    public authService: AuthService,
  ) {
  }
}


