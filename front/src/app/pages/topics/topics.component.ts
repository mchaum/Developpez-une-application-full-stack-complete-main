import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { Topic } from 'src/app/interfaces/topic.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  standalone: true,
  imports: [
    NavbarComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  public topics$: Observable<Topic[]>;
  public user: User | null = null;
  public subscribedTopicIds: Set<number> = new Set(); // Set pour stocker les ID des thèmes auxquels l'user est abonné //

  constructor(
    private topicService: TopicService,
    private authService: AuthService,
    private subscriptionService: SubscriptionService
  ) {
    this.topics$ = this.topicService.getAllTopics();
  }

  ngOnInit(): void {
    this.authService.getLoggedInUserInfo().subscribe(
      (user) => {
        this.user = user;
        if (this.user) {
          this.loadSubscribedTopics();
        }
      },
      (error) => console.error('Erreur lors de la récupération des informations utilisateur', error)
    );
  }

  loadSubscribedTopics(): void {
    if (!this.user) return;

    this.subscriptionService.getUserSubscriptions(this.user.id).subscribe(
      (topics) => {
        this.subscribedTopicIds = new Set(topics.map((topic) => topic.id));
      },
      (error) => console.error('Erreur lors de la récupération des abonnements', error)
    );
  }

  isSubscribed(themeId: number): boolean {
    return this.subscribedTopicIds.has(themeId); 
  }

  subscribe(themeId: number): void {
    if (!this.user) {
      console.error('Utilisateur non connecté : abonnement impossible.');
      return;
    }

    this.subscriptionService.subscribeToTheme(this.user.id, themeId).subscribe(
      () => {
        console.log(`Utilisateur ${this.user?.id} abonné au thème ${themeId}`);
        this.subscribedTopicIds.add(themeId);
      },
      (error) => console.error('Erreur lors de l\'abonnement au thème', error)
    );
  }
}