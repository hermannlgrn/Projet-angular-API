import {Component} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  // Importation des modules nécessaires pour la gestion des formulaires et les requêtes HTTP.
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule,],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.sass'
})
export class ForgotPassword {
  // Modèle de données pour le formulaire. Stocke l'email entré par l'utilisateur.
  public user: ResetPasswordForm = {
    email: ""
  };

  // Injection des services requis : Service d'authentification et Router pour la navigation.
  constructor(private authService: AuthService, private router: Router) {
  }

  // Gère la soumission du formulaire pour lancer la réinitialisation du mot de passe.
  resetPassword() {
    // Envoie l'email au service d'authentification pour demander la réinitialisation via l'API.
    this.authService.resetPassword(this.user).subscribe({
      next: data => {
        this.user = data; // Met à jour l'objet local (souvent ignoré dans ce contexte)
        if (data.code == 200) {
          // Si la requête réussit, redirige l'utilisateur vers la page de confirmation.
          this.router.navigate(['/confirm/resetPassword']);
        }
        // *Note : Ajouter une gestion 'else' ici pour les codes d'erreur (ex: email non trouvé) est recommandé.*
      }
    })
  }

}

// Définit la structure de données attendue par le formulaire de réinitialisation (uniquement l'email).
export type ResetPasswordForm = {
  email: string;
}
