import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { TOKEN } from '../shared/constants';
import {jwtDecode} from "jwt-decode";
import { IUser } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';


export interface Token {
  id: string;
  sub: string;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
isAdmin = new BehaviorSubject<boolean>(this.hasAdminToken());
isUser = new BehaviorSubject<boolean>(this.hasUserToken());
isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
currentUserName = new BehaviorSubject<string>(this.getCurrentId());
url = 'http://localhost:5000/user/login';
urlprof = 'http://localhost:5000/user/profile';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getCurrentId(): any {
    let token = localStorage.getItem('token');
    // console.log('Token',token);
    if (!token) return '';

    let decoded_token: Token = jwtDecode(token);
    // let decoded_token: Token | null = jwtDecode(token);

    // if(!decoded_token) {
    //   console.log('Error decodificando el token');
    //   return '';
    // }
    return decoded_token.id;
  }

  getId(): any{
    let token = localStorage.getItem('token');
    if(!token) return '';
    let decoded_token: Token = jwtDecode(token);
    // let decoded_token: Token | null = jwtDecode(token);

    // if(!decoded_token) {
    //   console.log('Error decodificando el token');
    //   return '';
    // }

    return decoded_token.id;

  }

  login(login: any): Observable<any>{
    return this.httpClient.post(this.url, login);
  }
  profile(): Observable<IUser> {
    return this.httpClient.get<IUser>(this.url);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

    this.isAdmin.next(false);
    this.isUser.next(false);
    this.isLoggedIn.next(false);
    this.currentUserName.next('');
  }
  hasToken() : boolean {


    return localStorage.getItem('token') !== null;
  }
  hasAdminToken(): boolean {

    let token = localStorage.getItem('token');

    if (!token) return false;

    let decoded_token: Token = jwtDecode(token);
    // console.log(decoded_token);

    return decoded_token.role === 'admin';
  }
  hasUserToken(): boolean {

    let token = localStorage.getItem('token');

    if (!token) return false;

    let decoded_token: Token = jwtDecode(token);
    // console.log(decoded_token);

    return decoded_token.role === 'user';
  }
  handleLoginResponse(token: any) {
    if(!token) return;
    localStorage.setItem('token', token);
    let decoded_token: Token = jwtDecode(token);
    this.isAdmin.next(decoded_token.role === 'admin');
    this.isUser.next(decoded_token.role === 'user');
    this.isLoggedIn.next(true);
    this.currentUserName.next(decoded_token.username);


  }

  findCurrentUser(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.urlprof}/${id}`);
  }
}
