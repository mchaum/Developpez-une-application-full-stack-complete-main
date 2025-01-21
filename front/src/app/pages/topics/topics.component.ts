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
import { Observable } from 'rxjs';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { Topic } from 'src/app/interfaces/topic.interface';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  standalone: true,
  imports: [
    NavbarComponent,
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
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  public topics$: Observable<Topic[]>;

  constructor(private topicService: TopicService) {
    this.topics$ = this.topicService.getAllTopics();
  }

  ngOnInit(): void {
  }
}
