import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Topic } from 'src/app/interfaces/topic.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-user-topics',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './user-topics.component.html',
  styleUrls: ['./user-topics.component.scss'],
})
export class UserTopicsComponent implements OnInit {
  subscribedTopics: Topic[] = [];
  user: User | null = null;

  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getLoggedInUserInfo().subscribe(
      (user) => {
        this.user = user;
        console.log('Utilisateur connecté :', this.user);
        this.fetchSubscribedTopics();
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations utilisateur', error);
      }
    );
  }

  fetchSubscribedTopics(): void {
    if (!this.user) {
      console.error('Impossible de récupérer les thèmes : utilisateur non connecté');
      return;
    }

    this.subscriptionService.getUserSubscriptions(this.user.id).subscribe(
      (topics) => (this.subscribedTopics = topics),
      (error) => console.error('Erreur lors de la récupération des thèmes suivis', error)
    );
  }

  unsubscribe(themeId: number): void {
    if (!this.user) return;

    this.subscriptionService.unsubscribeFromTheme(this.user.id, themeId).subscribe(
      () => {
        console.log(`Désabonné du thème ${themeId}`);
        this.fetchSubscribedTopics();
      },
      (error) => console.error('Erreur lors de la désinscription', error)
    );
  }
}

