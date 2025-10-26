import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

// Définit les clés valides pour les messages de confirmation (paramètres de route).
// Cette approche garantit la vérification de type (Type Safety) lors de l'accès aux messages.
type ReasonType =
  | 'delete'
  | 'connect'
  | 'resetPassword'
  | 'disconnect'
  | 'create'
  | 'error'
  | 'errorArticle';

// Définit la structure d'un message de confirmation (titre et corps).
type ReasonContent = {
  header: string; paragraph: string;
};

@Component({
  selector: 'app-confirmation-page',
  imports: [RouterLink, HttpClientModule],
  templateUrl: './confirmation-page.html',
  styleUrl: './confirmation-page.sass'
})
export class ConfirmationPage {

// Message final affiché dans le template, initialisé avec des valeurs vides.
  public displayedText: ReasonContent = {
    header: '', paragraph: ''
  };

  // Catalogue complet des messages de confirmation. Les messages sont stockés en dur (hardcoded)
  // dans le front-end pour une flexibilité maximale de l'affichage.
  public paragraphsReason: Record<ReasonType, ReasonContent> = {
    delete: {
      header: 'Article supprimé',
      paragraph: 'Cet article a bien été supprimé.'
    }, connect: {
      header: 'Connexion réussie',
      paragraph: 'Bienvenue sur le site'
    }, resetPassword: {
      header: 'Mot de passe réinitialisé',
      paragraph: 'Ton ancien mot de passe a été réinitialisé'
    }, disconnect: {
      header: 'Déconnexion effectuée',
      paragraph: 'A bientot'
    }, create: {
      header: 'Nouvel article créé',
      paragraph: 'Un nouvel article a été ajouté'
    }, error: {
      header: 'Page introuvable',
      paragraph: "La page que tu cherche n'existe pas"
    }, errorArticle: {
      header: 'Article introuvable',
      paragraph: "Impossible de retrouver cet article."
    }
  };

  constructor(private activatedRoute: ActivatedRoute) {
  }

  // Hook du cycle de vie pour initialiser le contenu de la page.
  ngOnInit() {
    // Extrait le paramètre 'reason' de l'URL et le cast en ReasonType pour la sécurité.
    const reason = this.activatedRoute.snapshot.paramMap.get('reason') as ReasonType | null;

    // Vérifie si la 'reason' existe et correspond à une clé dans le catalogue 'paragraphsReason'.
    if (reason && this.paragraphsReason[reason]) {
      // Affecte le message correspondant pour l'affichage.
      this.displayedText = this.paragraphsReason[reason];
    } else {
      // Si la raison n'est pas trouvée ou est invalide, affiche le message d'erreur par défaut.
      this.displayedText = this.paragraphsReason.error;
    }
  }
}
