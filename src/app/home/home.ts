import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUser } from '../app';
import { UsersService } from '../users-service';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  constructor(private userService: UsersService) { }
  
    user: IUser = {
      //id : 0,
      name: '',
      address: '',
      phone: ''
    }
  
    users: IUser[] = [];
  
    ngOnInit() {
      this.userService.getUsers().subscribe(data => {
        this.users = data;
        console.log('Users loaded:', data);
      })
    }
  
    onSubmit(user: IUser) {
      console.log('User Submited: ' + user);
      if (user.id) {
        this.userService.updateUser(user).subscribe(updated => {
          const index = this.users.findIndex(u => u.id === user.id);
          if (index !== -1) {
            this.users[index] = updated;
            console.log('User Updated', updated);
          }
        })
      } else {
        this.userService.addUser(user).subscribe(newUser => {
          this.users.unshift(newUser);
          console.log('New user added:', newUser);
        })
      }
      this.resetForm();
    }
  
    onEdit(user: IUser) {
      this.user = { ...user }; // copiar datos al formulario
    }
  
    // Eliminar usuario
    onDelete(id?: number) {
      if (!id) return;
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== id);
      });
    }
  
    // Limpiar formulario
    resetForm() {
      this.user = {
        name: '',
        address: '',
        phone: ''
      };
    }

}
