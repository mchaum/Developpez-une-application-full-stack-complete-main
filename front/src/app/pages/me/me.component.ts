import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { UserTopicsComponent } from 'src/app/components/user-topics/user-topics.component';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  standalone: true,
  imports: [
    NavbarComponent,
    UserFormComponent,
    UserTopicsComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
