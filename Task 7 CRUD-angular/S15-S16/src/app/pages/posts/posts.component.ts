import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts = [{
    title: "post title 1",
    body: "post 1 lorems"
  },
  {
    title: "post title 2",
    body: "post 2lorems"
  },
  {
    title: "post title 3",
    body: "post 3 porems"
  },
  {
    title: "post title 4",
    body: "post 4 lorems"
  },
  {
    title: "post title 5",
    body: "post 5 lorems"
  },
  {
    title: "post title 6",
    body: "post 6 lorems"
  },
]
}
