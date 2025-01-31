import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments-area',
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
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './comments-area.component.html',
  styleUrls: ['./comments-area.component.scss']
})
export class CommentsAreaComponent implements OnInit {
  commentForm!: FormGroup;
  comments: any[] = [];
  articleId!: number;
  userId!: number;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private commentsService: CommentsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));

    this.commentForm = this.fb.group({
      description: ['', Validators.required]
    });

    this.userService.getUser().subscribe({
      next: (user) => {
        this.userId = user.id;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      }
    });

    this.loadComments();
  }

  loadComments(): void {
    this.commentsService.getCommentsByArticleId(this.articleId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires', error);
      }
    );
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      this.isSubmitting = true;

      const commentData = {
        description: this.commentForm.value.description,
        articleId: this.articleId,
        userId: this.userId
      };

      this.commentsService.addComment(commentData).subscribe({
        next: (response) => {
          console.log('Commentaire ajouté avec succès:', response);
          this.loadComments(); 
          this.commentForm.reset(); 
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du commentaire:', error);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
