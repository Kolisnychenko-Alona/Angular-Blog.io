import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: Array<IUser> = [
    {
      id: 1, 
      userName: 'admin',
      email: 'admin@gmail.com',
      password: 'admin'
    }
  ]

  constructor() { }

  getUsers(): Array<IUser> {
    return this.users;
  }
  addUser(user: IUser): void {
    this.users.push(user);
    
  }
}
