import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { Topic } from 'src/app/interfaces/topic.interface';
import { ArticleService } from 'src/app/services/article.service';
import { TopicService } from 'src/app/services/topic.service';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    HttpClientModule,
    NavbarComponent
  ],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})

export class ArticleFormComponent implements OnInit {
  articleForm!: FormGroup;
  topics: Topic[] = [];
  userId!: number;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private userService: UserService,
    private topicService: TopicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      themeId: ['', Validators.required],
    });

    this.topicService.getAllTopics().subscribe((topics) => {
      this.topics = topics;
    });

    this.userService.getUser().subscribe({
      next: (user) => {
        this.userId = user.id;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      },
    });
  }

  onSubmit(): void {

    if (this.articleForm.valid) {
      this.isSubmitting = true;

      const article = {
        ...this.articleForm.value,
        userId: this.userId,
      };

      this.articleService.createArticle(article).subscribe({
        next: (response) => {
          console.log('Article créé avec succès:', response);
          this.router.navigate(['/'])
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'article:', error);
        },
      });
    }
  }
}
