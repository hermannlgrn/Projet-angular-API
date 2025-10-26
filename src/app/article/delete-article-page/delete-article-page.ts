import {Component} from '@angular/core';
import {ArticleService} from '../../services/article-service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-delete-article-page',
  imports: [HttpClientModule,],
  templateUrl: './delete-article-page.html',
  styleUrl: './delete-article-page.sass'
})
export class DeleteArticlePage {
  // Injection des services requis : API, gestion de l'URL, et Router pour la navigation.
  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  // Hook du cycle de vie. Déclenche l'opération de suppression dès que le composant est initialisé.
  ngOnInit() {
    // Extrait l'ID de l'article à supprimer à partir des paramètres d'URL.
    const articleId = this.activatedRoute.snapshot.paramMap.get('id');

    if (articleId) {
      // Appelle le service pour supprimer l'article correspondant à l'ID.
      this.articleService.deleteArticle(articleId).subscribe({
        next: data => {
          if (data.code == 200) {
            // Suppression réussie : Redirige vers la page de confirmation de suppression.
            this.router.navigate(['/confirm/delete']);
          } else {
            // Échec de la suppression (article non trouvé, erreur API, etc.) : Redirige vers un message d'erreur spécifique.
            this.router.navigate(['/confirm/errorArticle']);
          }
        }
      })
    }
  }
}
