import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginForm} from '../auth/connexion/connexion';
import {ResetPasswordForm} from '../auth/forgot-password/forgot-password';

@Injectable({
  providedIn: 'any'
})
export class AuthService {

  // WritableSignal utilisé pour le suivi réactif de l'état d'authentification (email de l'utilisateur).
  // Permet la mise à jour immédiate des vues Angular (composants) sans rechargement de page.
  public email = signal<string | null>(null);

  // URL de base de l'API d'authentification pour une maintenance facilitée.
  private readonly apiEndPoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    // Tente de charger l'email au démarrage du service (persistance de session).
    this.loadEmailFromToken()
  }

  loadEmailFromToken() {
    // Vérifie et décode le token JWT du LocalStorage pour restaurer la session.
    // L'email est extrait du payload du token s'il est valide, sinon le Signal est mis à 'null'.

    const authToken = localStorage.getItem('token_jwt');
    if (authToken) {
      // Isole et prépare le payload (partie centrale) du token (encodé en Base64 URL Safe).
      const base64 = authToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      // Décode la chaîne Base64 en texte JSON.
      const payload = atob(base64);
      // Parse le JSON pour extraire la valeur de la clé 'email'.
      const email = JSON.parse(payload).email;
      // Met à jour le Signal pour que les composants réactifs se rafraîchissent.
      this.email.set(email);
    } else {
      // Réinitialise l'état de l'utilisateur si aucun token valide n'est trouvé.
      this.email.set(null);
    }
    return this.email; // Retourne l'état actuel (l'usage du Signal le rend réactif).
  }

  // Termine la session : supprime le token JWT et réinitialise le Signal d'état d'authentification.
  logout() {
    localStorage.removeItem('token_jwt');
    this.email.set(null);
  }

  // Envoie les identifiants de connexion à l'API via une requête POST.
  login(userData: LoginForm) {
    return this.http.post<any>(`${this.apiEndPoint}/login`, userData);
  }

  // Envoie la requête de réinitialisation de mot de passe à l'API.
  resetPassword(userData: ResetPasswordForm) {
    return this.http.post<any>(`${this.apiEndPoint}/reset-password`, userData);
  }

}
