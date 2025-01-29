import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './AuthInterceptor';
import { UserFormComponent } from './components/me-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MeComponent } from './pages/me/me.component';
import { UserTopicsComponent } from './components/user-topics/user-topics.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleFormComponent } from './pages/article-form/article-form.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { CommentsAreaComponent } from './components/comments-area/comments-area.component';

const materialModule = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatToolbarModule,
]

@NgModule({
  declarations: [ AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HomeComponent, 
    LoginComponent, 
    RegisterComponent,
    TopicsComponent,
    NavbarComponent,
    UserFormComponent, 
    UserTopicsComponent,
    MeComponent,
    ArticleFormComponent,
    ArticlesComponent,
    ArticleFormComponent,
    ArticleDetailComponent,
    CommentsAreaComponent,
    ...materialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
