import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = new BehaviorSubject<User | null>(this.getLocalStorage())

  private API: string = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getUser(id: string) {
    return this.http.get(`${this.API}/auth/${id}`)
  }

  getUsers() {
    return this.http.get(`${this.API}/auth/`)
  }

  getUsersByUsername(username: string) {
    return this.http.get(`${this.API}/auth/users?username=${username}`)
  }

  register(user: User) {
    return this.http.post(`${this.API}/auth/register`, user);
  }

  login(user: User) {
    return this.http.post<User>(`${this.API}/auth/login`, user)
  }

  logout() {
    localStorage.removeItem('user')
    this.currentUser$.next(null)
  }

  private getLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user')!)?.user
  }
}
