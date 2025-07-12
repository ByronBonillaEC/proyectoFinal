import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IUser } from './app';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly apiUrl = environment.apiUser;
  private http = inject(HttpClient);
  private jsonHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  //constructor() { }

  getUsers(): Observable<IUser[]> {
    console.log(`${this.apiUrl}`);
    return this.http.get<IUser[]>(`${this.apiUrl}/get-users`, {
      headers: this.jsonHeaders
    }).pipe(
      map((raw) => raw.reverse())
    );
  }

  getUserById(user: IUser): Observable<IUser> {
    console.log(`${this.apiUrl}`);
    return this.http.get<IUser>(`${this.apiUrl}/get-user-by-id/${user.id}`, {
      headers: this.jsonHeaders
    }).pipe(
      map((raw) => raw)
    );
  }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/add-user`, user, {
      headers: this.jsonHeaders
    }).pipe(
      map((raw) => raw)
    );
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/update-user/${user.id}`, user, {
      headers: this.jsonHeaders
    }).pipe(
      map((raw) => raw)
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-user/${userId}`, {
      headers: this.jsonHeaders
    });
  }

}
