import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
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
    RouterLink
  ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles$: Observable<Article[]>;
  public user: User | null = null;
  public sortOrder: string = 'desc';

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {
    this.articles$ = this.articleService.getAllArticles('desc');
  }

  ngOnInit(): void { }

  goToArticle(id: number): void {
    this.router.navigate([`/article/${id}`]);
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.articles$ = this.articleService.getAllArticles(this.sortOrder);
  }
}