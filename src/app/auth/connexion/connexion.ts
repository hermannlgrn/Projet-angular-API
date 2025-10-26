import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../services/auth-service';
import {ActivatedRoute, Router} from '@angular/router';

// Définit les clés valides pour les messages d'erreur affichés.
type MessageHeaderType = 'unauthorized' | 'credentials';
type MessageContentType = string;

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.sass'
})

export class Connexion {
  // Modèle de données pour le formulaire de connexion (lié via [(ngModel)]).
  public user: LoginForm = {
    email: "", password: "",
  }

  // Exemples d'initialisation pour le développement (laissé en commentaire pour la production).
  // public user: LoginForm = {
  //   email: "isaac@gmail.com", password: "password",
  // }

  // Catalogue des messages d'erreur. Les clés correspondent à MessageHeaderType.
  public messages: Record<MessageHeaderType, MessageContentType> = {
    unauthorized: "Ce contenue nessécite un compte",
    credentials: "Email ou mot de passe incorect"
  };

  // Stocke le message d'erreur à afficher dynamiquement dans le template.
  public outputErrorMessage: string = "";

  // Injection des services requis : authentification, gestion de la navigation et de l'URL.
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute,) {
  }

  // Hook du cycle de vie appelé à l'initialisation du composant.
  ngOnInit() {
    // Tente d'extraire le type de message d'erreur ("unauthorized" ou "credentials") des paramètres de l'URL.
    const message = this.activatedRoute.snapshot.paramMap.get('message') as MessageHeaderType | null;

    // Si un type de message valide est trouvé, affecte le texte d'erreur correspondant pour l'affichage.
    if (message && this.messages[message]) {
      this.outputErrorMessage = this.messages[message];
    }
    // Si l'URL contient un paramètre inconnu, navigue vers la page de connexion de base pour le nettoyer.
    else if (message) {
      this.router.navigate(['/connexion']);
    }
  }

  // Gère la soumission du formulaire : envoie les identifiants à l'API via le service d'authentification.
  tryConnexion() {
    this.authService.login(this.user).subscribe({
      next: data => {
        this.user = data; // Mise à jour locale (si la réponse API renvoie les données d'utilisateur).
        if (data.code == 200) {
          // Succès : Stocke le token JWT dans le LocalStorage pour maintenir la session.
          localStorage.setItem('token_jwt', data.data);
          // Redirige l'utilisateur vers la page de confirmation de connexion réussie.
          this.router.navigate(['/confirm/connect']);
        } else if (data.code == 768) {
          // Échec (Code 768 = Identifiants invalides) : Redirige avec le paramètre d'erreur 'credentials'.
          this.router.navigate(['/connexion/credentials']);
        }
      }
    })
  }
}

// Définit la structure requise pour les données de connexion (email et mot de passe).
export type LoginForm = {
  email: string; password: string;
}
