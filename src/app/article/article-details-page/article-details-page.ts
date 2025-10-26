import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Article, ArticleService} from '../../services/article-service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-article-details-page',
  imports: [HttpClientModule, RouterLink,],
  templateUrl: './article-details-page.html',
  styleUrl: './article-details-page.sass'
})
export class ArticleDetailsPage {

  // Initialisation de la propriété 'article' avec une structure vide par défaut.
  public article: Article = {
    id: 0, title: '', desc: '', author: '', imgPath: ''
  };

  // Injection des dépendances requises (Services Angular et services personnalisés)
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService // Injecté comme public pour l'utiliser directement dans le template
  ) {
  }

  // Hook du cycle de vie appelé après l'initialisation du composant.
  ngOnInit() {
    // Extrait l'ID de l'article depuis les paramètres de l'URL (snapshot).
    const articleId = this.activatedRoute.snapshot.paramMap.get('id');

    if (articleId) {
      // Lance l'appel API pour récupérer les détails de l'article correspondant à l'ID.
      this.articleService.getArticle(articleId).subscribe({
        next: data => {
          if (data.code == 200) {
            // Assigne l'objet article si la requête API réussit.
            this.article = data.data
          } else {
            // En cas d'article non trouvé ou d'erreur API, redirige vers la page d'erreur.
            this.router.navigate(['/confirm/error']);
          }
        }
      })
    }
  }

}
