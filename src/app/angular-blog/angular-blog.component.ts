import { Component, OnInit } from '@angular/core';
import { IBlog } from '../shared/interfaces/blog.interface';
import { IUser } from '../shared/interfaces/user.interface';
import { BlogsService } from '../shared/services/blogs/blogs.service';
import { UsersService } from '../shared/services/users/users.service';

@Component({
  selector: 'app-angular-blog',
  templateUrl: './angular-blog.component.html',
  styleUrls: ['./angular-blog.component.scss'],
})
export class AngularBlogComponent implements OnInit {
  public activeIn = false;
  public activeUp = false;
  public postButtons = false;
  public btnsHome = true;
  public activeAdd = false;
  public blog!: Array<IBlog>;
  public users!: Array<IUser>;

  public email!: string;
  public password!: string;
  public userName!: string;
  public text!: string;
  public title!: string;

  public editStatus = false;
  public index!: number;

  public activeUser!: string;

  signIn(): void {
    this.activeIn = true;
  }
  signUp(): void {
    this.activeUp = true;
  }
  close(): void {
    this.activeIn = false;
    this.activeUp = false;
    this.activeAdd = false;
    this.userName = '';
    this.email = '';
    this.password = '';
  }
  submitEnter(): void {
    let findUser = this.users.find(
      (user) => this.email === user.email && this.password === user.password
    );
    if (
      this.email === this.users[0].email &&
      this.password === this.users[0].password
    ) {
      this.activeUser = this.users[0].userName;
    } else if (findUser) {
      this.activeUser = findUser.userName;
    }
    // this.postButtons = true;
    this.btnsHome = false;
    this.email = '';
    this.password = '';
    this.activeIn = false;
  }
  submitAdd(): void {
    let newUser: IUser = {
      id: 1,
      userName: this.userName,
      email: this.email,
      password: this.password,
    };
    if (this.users.length > 0) {
      const id = this.users.slice(-1)[0].id;
      newUser.id = id + 1;
    }
    if (
      !this.users.find(
        (user) =>
          user.userName == newUser.userName || user.email == newUser.email
      )
    ) {
      this.userService.addUser(newUser);
      this.activeUser = this.userName;
      this.userName = '';
      this.email = '';
      this.password = '';
      this.activeUp = false;
      this.btnsHome = false;
      this.activeIn = false;
    }
    // this.postButtons = true;
  }
  addPost(): void {
    this.activeAdd = true;
  }
  post(): void {
    let newPost: IBlog = {
      id: 1,
      postedBy: this.activeUser,
      topic: this.title,
      date: new Date(),
      message: this.text,
    };
    if (this.blog.length > 0) {
      const id = this.blog.slice(-1)[0].id;
      newPost.id = id + 1;
    }
    this.blogsService.addPost(newPost);
    this.title = '';
    this.text = '';
    this.activeAdd = false;
  }
  signOut(): void {
    this.postButtons = false;
    this.btnsHome = true;
    this.activeUser = '';
  }
  editPost(index: number): void {
    this.activeAdd = true;
    this.editStatus = true;
    this.title = this.blog[index].topic;
    this.text = this.blog[index].message;
    this.index = index;
  }
  edit(): void {
    this.blog[this.index].topic = this.title;
    this.blog[this.index].message = this.text;
    this.title = '';
    this.text = '';
    this.activeAdd = false;
    this.editStatus = false;
  }
  deletePost(index: number): void {
    this.blog.splice(index, 1);
  }

  constructor(
    private blogsService: BlogsService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getBlog();
  }

  getUsers(): void {
    this.users = this.userService.getUsers();
  }
  getBlog(): void {
    this.blog = this.blogsService.getBlogs();
  }
}
