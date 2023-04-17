import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { CardComponent } from './components/card/card.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ProductsComponent } from './pages/products/products.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogsComponent,
    CardComponent,
    PostsComponent,
    ProductsComponent,
    UserFormComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
