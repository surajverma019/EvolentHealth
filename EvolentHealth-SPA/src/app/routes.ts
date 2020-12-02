import { Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactComponent } from './contact/contact.component';

export const appRoutes: Routes = [
  { path: '', component: ContactComponent },
  {
    path: '',
    children: [
      {
        path: 'add',
        component: AddContactComponent,
      },
      {
        path: 'members',
        component: ContactComponent,
      },
      {
        path: 'add/:id',
        component: AddContactComponent,
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
