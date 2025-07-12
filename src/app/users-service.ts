import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IUser } from './app';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly apiUrl = environment.api;
  private http = inject(HttpClient);
  private jsonHeaders = new HttpHeaders({'Content-type' : 'application/json'});

  //constructor() { }

  getUsers() : Observable<IUser[]> {
    console.log(`${this.apiUrl}`);
    return this.http.get<IUser[]>(`${this.apiUrl}/get-users`, {
      headers : this.jsonHeaders
    }).pipe(
      map((raw) => raw.reverse())
    );
  }

  addUser(user: IUser) : Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/add-user`, user, { 
      headers : this.jsonHeaders
    }).pipe(
      map((raw) => raw)
    );
  }

  updateForum(user: IUser) : Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${user.id}`, user, { 
      headers : this.jsonHeaders
    }).pipe(
      map((raw) => raw)
    );
  }

}
