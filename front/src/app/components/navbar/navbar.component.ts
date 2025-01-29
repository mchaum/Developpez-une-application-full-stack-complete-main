import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
    RouterLink,
    RouterLinkActive
  ],
})
export class NavbarComponent {
  constructor(private sessionService: SessionService, private router: Router) {}
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Ferme le menu si un clic se fait à l'extérieur //
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const sidebar = document.querySelector('.sidebar');
    const burgerMenu = document.querySelector('.burger-menu');
    const clickedInsideSidebar = sidebar?.contains(event.target as Node);
    const clickedInsideBurgerMenu = burgerMenu?.contains(event.target as Node);

    if (!clickedInsideSidebar && !clickedInsideBurgerMenu) {
      this.menuOpen = false;
    }
  }

  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  public me(): void {
    this.router.navigate(['/me']);
  } 

  public topics(): void {
    this.router.navigate(['/topics']);
  }

  public home(): void {
    this.router.navigate(['/']);
  }
}

