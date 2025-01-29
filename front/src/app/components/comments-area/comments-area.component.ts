import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';

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
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './comments-area.component.html',
  styleUrls: ['./comments-area.component.scss']
})
export class CommentsAreaComponent implements OnInit {

  comments: any[] = [];
  newComment: string = '';
  articleId: number = 0;

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.articleId = Number(this.route.snapshot.paramMap.get('id'));

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

  postComment(): void {
    if (this.newComment.trim()) {
      console.log('Nouveau commentaire : ', this.newComment);
      this.newComment = '';
    }
  }
}
