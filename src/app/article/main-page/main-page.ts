import {Component} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Article, ArticleService} from '../../services/article-service';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-main-page',
  imports: [HttpClientModule, RouterLink,],
  templateUrl: './main-page.html',
  styleUrl: './main-page.sass'
})
export class MainPage {
  public article: Article[] = [];

  constructor(private articleService: ArticleService, private authService: AuthService,) {
  }

  ngOnInit() {
    // récupère la liste des articles grâce à l'api
    this.articleService.getArticles().subscribe({
      next: data => {
        if (data.code == 200) {
          this.article = data.data
        }
      }
    })
  }
}
