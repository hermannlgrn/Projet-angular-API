import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'any'
})
export class ArticleService {
  // Point d'accès (URL de base) de l'API. Facilite la maintenance en cas de changement de l'URL du serveur.
  private readonly apiEndPoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

// Récupère la liste complète des articles depuis l'API.
  getArticles(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/articles`);
  }

  // Récupère un article spécifique en utilisant son identifiant (ID).
  getArticle(id: string) {
    return this.http.get<any>(`${this.apiEndPoint}/articles/${id}`);
  }

// Supprime un article de l'API en utilisant son identifiant (ID).
  deleteArticle(id: string) {
    return this.http.delete<any>(`${this.apiEndPoint}/articles/${id}`);
  }

// Met à jour un article existant. Les données de l'article sont envoyées dans le corps (body) de la requête POST.
  modifyArticle(article: Article) {
    return this.http.post<any>(`${this.apiEndPoint}/articles/save`, article);
  }

// Crée un nouvel article. Les données de l'article sont envoyées dans le corps (body) de la requête POST.
  createArticle(article: Article) {
    return this.http.post<any>(`${this.apiEndPoint}/articles/save`, article);
  }
}

// Définit la structure (le type) d'un article.
// Ce type garantit la conformité des données échangées avec l'API et minimise les erreurs.
export type Article = {
  id?: number;
  title: string;
  desc: string;
  author: string;
  imgPath: string;
}

