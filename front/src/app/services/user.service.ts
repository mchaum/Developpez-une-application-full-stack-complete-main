import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private apiUrl = 'api/auth/me';

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }

  updateUser(user: User): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(this.apiUrl, user).pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour utilisateur:', error);
        return throwError(() => new Error('Erreur lors de la mise à jour utilisateur'));
      })
    );
  }
  
  
}
