import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

    private apiUrl = '/api/comments'; 

  constructor(private http: HttpClient) {}

  getCommentsByArticleId(articleId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${articleId}`);
  }

  addComment(commentData: { description: string, articleId: number }): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, commentData);
  }
}
