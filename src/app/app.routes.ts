import {Routes} from '@angular/router';
import {Connexion} from './auth/connexion/connexion';
import {ForgotPassword} from './auth/forgot-password/forgot-password';
import {ArticleDetailsPage} from './article/article-details-page/article-details-page';
import {DeleteArticlePage} from './article/delete-article-page/delete-article-page';
import {MainPage} from './article/main-page/main-page';
import {CreateArticlePage} from './article/create-article-page/create-article-page';
import {Logout} from './auth/logout/logout';
import {ConfirmationPage} from './article/confirmation-page/confirmation-page';

export const routes: Routes = [
  {path: "connexion", component: Connexion},
  {path: "connexion/:message", component: Connexion}, // page de connexion avec affichage de message d'erreur
  {path: "forgot-password", component: ForgotPassword},
  {path: "article/:id", component: ArticleDetailsPage},
  {path: "delete/:id", component: DeleteArticlePage},
  {path: "create", component: CreateArticlePage},
  {path: "main", component: MainPage},
  {path: "confirm/:reason", component: ConfirmationPage},
  {path: "logout", component: Logout},
  {path: '**', redirectTo: '/list'} // redirige toutes les routes inconnues
];
