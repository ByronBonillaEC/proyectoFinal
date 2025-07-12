import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users-service';
import { IUser } from '../app';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User implements OnInit {

    constructor (private userService : UsersService) { }

    user : IUser = {
      id : 0,
      name : '',
      address : '',
      phone : ''
    }

    users : IUser[] = [];

    ngOnInit() {
        this.userService.getUsers().subscribe(data => {
          this.users = data;
          console.log('Users loaded:',data);
        })
      }
    
      onSubmit(user: IUser){    
        console.log('User Submited: ' + user);
        //forum.userId = 1;
        //forum.id = this.forums.length + 1;
        
        this.userService.addUser(user).subscribe(newUser => {
          this.users.unshift(newUser); //Añadir al inicio del arreglo
          console.log('New user added:', newUser);
        })
    
        /*this.forumService.updateForum(forum).subscribe(newForum => {
          this.forums.unshift(newForum); //Añadir al inicio del arreglo
          console.log('New forum added:', newForum);
        })*/    
      }

}
