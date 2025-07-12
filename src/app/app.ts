import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'apis';
}

export interface forumPost{
  userId: number,
  id: number,
  title: string,
  body: string
}

export interface IUser{
  id : number,
  name: string,
  address: string,
  phone: string
}

