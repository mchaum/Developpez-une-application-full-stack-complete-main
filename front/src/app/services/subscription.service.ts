import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Topic } from "../interfaces/topic.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class SubscriptionService {
    private apiUrl = '/api/subscriptions';
  
    constructor(private http: HttpClient) {}
  
    getUserSubscriptions(userId: number): Observable<Topic[]> {
      return this.http.get<Topic[]>(`${this.apiUrl}/${userId}`);
    }
  
    subscribeToTheme(userId: number, themeId: number): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}?userId=${userId}&themeId=${themeId}`, {});
    }
  
    unsubscribeFromTheme(userId: number, themeId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}?userId=${userId}&themeId=${themeId}`);
    }
  }
  