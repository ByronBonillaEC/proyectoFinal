import { Routes } from '@angular/router';
import { Home } from './home/home'
import { Contact } from './contact/contact'
import { User } from './user/user';


export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        component : Home
    },
    {
        path: 'contact',
        title: 'Contact',
        component: Contact
    }

];
