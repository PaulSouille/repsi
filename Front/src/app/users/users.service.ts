import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './users';

@Injectable()
export class UsersService  {

  constructor(
    private http: HttpClient
  ) {
   }

   getUserByEmail(email: string): Promise<User> {
    return this.http.get<User>(`users/${email}`).toPromise();
  }


}
