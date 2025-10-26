import {Component} from '@angular/core';
import {Article, ArticleService} from '../../services/article-service';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-create-article-page',
  // Ajout de FormsModule pour les Template-driven Forms
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule,],
  templateUrl: './create-article-page.html',
  styleUrl: './create-article-page.sass'
})
export class CreateArticlePage {

  // Modèle de données pour l'article à créer. Les valeurs seront liées via [(ngModel)] dans le template.
  public article: Article = {
    title: '', desc: '', author: '', imgPath: ''
  };
  public email: any; // Propriété utilisée pour stocker l'état de connexion de l'utilisateur

  // Injection des dépendances : Service d'API, Router pour la navigation, et Service d'authentification.
  constructor(private articleService: ArticleService, private router: Router, private authService: AuthService,) {
  }

  // Hook du cycle de vie appelé à l'initialisation du composant.
  ngOnInit() {
    // Vérifie l'état d'authentification.
    // Si l'utilisateur n'est pas connecté (email non présent), il est redirigé vers la page de connexion non autorisée.
    if (this.email == null || this.email === '') {
      this.router.navigate(['/connexion/unauthorized']);
    } else {
      // Laisse le composant s'initialiser si l'utilisateur est authentifié.
    }
  }

  // Gère la soumission du formulaire (événement (ngSubmit) dans le template).
  onClickCreateArticle(): void {
    // Envoie l'objet 'article' (rempli par le formulaire) au service pour l'enregistrement via l'API.
    this.articleService.createArticle(this.article).subscribe({
      next: data => {
        // Après succès de l'API, l'article (potentiellement avec un ID) est mis à jour.
        this.article = data;
        // Redirige l'utilisateur vers la page de confirmation de création.
        this.router.navigate(['/confirm/create']);
      }
    })
  }

}
