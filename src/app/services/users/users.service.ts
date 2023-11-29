import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/user.model';
import { Observable } from 'rxjs/internal/Observable';
export interface Token {
  sub: string;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
url: string = 'http://localhost:5000/user/profile';
urlpost: string = 'http://localhost:5000/user/register';
urlgetid: string = 'http://localhost:5000/user/profile';
urlall: string = 'http://localhost:5000/user/allusers/';
urldelete: string = 'http://localhost:5000/user/edit';
urlLogin: string = 'http://localhost:5000/user/login';

  constructor(private httpClient: HttpClient, private router: Router) { }
  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.urlall);
  }
  getUserById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.urlgetid}/${id}`);
  }
  createUser(user: any): Observable<any> {
    return this.httpClient.post<IUser>(this.urlpost, user);
  }
  updateUser(user: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(`${this.urldelete}/${user._id}`, user);
  }
  findCurrentUser(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.url}`);
  }


  httpOptions = {
    observe: 'response' as 'body'
  }
  deleteById(id: string): Observable<HttpResponse<{}>> {
    return this.httpClient.delete<HttpResponse<{}>>(`${this.urldelete}/${id}`, this.httpOptions);
  }

}
