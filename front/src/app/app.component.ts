import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLogged$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.isLogged$ = this.sessionService.$isLogged();
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['']);
  }
}
