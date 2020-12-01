import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';


export const appRoutes: Routes = [
    { path: '', component: ContactComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];