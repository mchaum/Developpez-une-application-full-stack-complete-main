import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { Article } from 'src/app/interfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';
import { CommentsAreaComponent } from "../../components/comments-area/comments-area.component";

@Component({
  selector: 'app-article-detail',
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
    RouterLink,
    NavbarComponent,
    CommentsAreaComponent
],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  public article: Article | null = null;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.articleService.getArticleById(id).subscribe({
        next: (article) => (this.article = article),
        error: (err) => console.error('Erreur lors de la récupération de l\'article', err),
      });
    }
  }
}
