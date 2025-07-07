import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { forumPost } from './app';

@Injectable({
  providedIn: 'root'
})
export class ForumsService {

  private readonly apiUrl = environment.api;
  private http = inject(HttpClient);
  private jsonHeaders = new HttpHeaders({'Content-type' : 'application/json'});

  //constructor() { }

  getForums() : Observable<forumPost[]> {
    console.log(`${this.apiUrl}`);
    return this.http.get<forumPost[]>(`${this.apiUrl}`, {
      headers : this.jsonHeaders
    }).pipe(
      map((raw) => raw.reverse())
    );
  }

  addForum(forum: forumPost) : Observable<forumPost> {
    return this.http.post<forumPost>(`${this.apiUrl}`, forum, { 
      headers : this.jsonHeaders
    }).pipe(
      map((raw) => raw)
    );
  }

  updateForum(forum: forumPost) : Observable<forumPost> {
    return this.http.put<forumPost>(`${this.apiUrl}/${forum.id}`, forum, { 
      headers : this.jsonHeaders
    }).pipe(
      map((raw) => raw)
    );
  }
}
