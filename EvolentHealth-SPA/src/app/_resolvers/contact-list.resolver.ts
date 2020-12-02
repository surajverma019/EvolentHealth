// import { Injectable } from '@angular/core';
// import { Contact } from '../_models/contact';
// import {ContactService  } from '../_services/contact.service';
// import { Route } from '@angular/compiler/src/core';
// import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable()

// export class ContactListResolver implements Resolve<Contact[]>{

//     pageNumber = 1;
//     pageSize = 5;
//     constructor(private contactService: ContactService, private router: Router) { }

//     resolve(route: ActivatedRouteSnapshot): Observable<Contact[]> {
//         return this.contactService.getContacts(this.pageNumber,this.pageSize).pipe(
//             catchError(error => {
//                 this.router.navigate(['/home']);
//                 return of(null);
//             })
//         );
//     }
// }