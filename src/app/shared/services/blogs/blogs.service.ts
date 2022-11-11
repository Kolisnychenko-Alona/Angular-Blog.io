import { Injectable } from '@angular/core';
import { IBlog } from '../../interfaces/blog.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private blog: Array<IBlog> = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'First post',
      date: new Date(),
      message: 'Sign up to create your account and start to use Angular Blog.',
    },
  ];

  constructor() {}

  getBlogs() {
    return this.blog;
  }
  addPost(post: IBlog): void{
    this.blog.push(post);
  }
}
