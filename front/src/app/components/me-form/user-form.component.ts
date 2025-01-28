import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  standalone: true,
  styleUrls: ['./user-form.component.scss'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  user!: User;
  public onError = false;

  constructor(private fb: FormBuilder, private sessionService: SessionService, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (user) => {
        this.user = user;
        this.userForm.patchValue({
          username: user.username,
          email: user.email
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des données utilisateur', error);
        this.onError = true;
      }
    );
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser: User = {
        ...this.user,
        ...this.userForm.value
      };
  
      this.userService.updateUser(updatedUser).subscribe(
        (response) => {
          if (response.message === 'User data updated!') {
            this.router.navigate(['/me']);
            this.onError = false;
          }
        },
        (error) => {
          console.error('Erreur lors de la mise à jour des données utilisateur', error);
          this.onError = true;
        }
      );
    }
  }
  

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['/']);
  }
}


