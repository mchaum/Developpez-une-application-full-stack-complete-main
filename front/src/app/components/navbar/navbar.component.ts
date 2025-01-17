import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    MatToolbarModule,
    CommonModule,
  ],
})
export class NavbarComponent {
  constructor(private sessionService: SessionService, private router: Router) {}

  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['/']);
  }
}

