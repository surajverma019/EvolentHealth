import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Contact } from '../_models/contact';
import { BehaviorSubject } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addEditContact(contact: Contact) {
    console.log('Service call start');
    return this.http.post(this.baseUrl + 'home', contact);
  }

  getContact(id: number) {
    console.log('Service call start');
    return this.http.get<Contact>(this.baseUrl + 'home/' + id);
  }

  deleteContact(id: number) {
    return this.http.delete(this.baseUrl + 'home/' + id, {});
  }

  getContacts(page?, itemPerPage?): Observable<PaginatedResult<Contact[]>> {
    const paginationResult: PaginatedResult<Contact[]> = new PaginatedResult<
      Contact[]
    >();

    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
    }

    return this.http
      .get<Contact[]>(this.baseUrl + 'home/', { observe: 'response', params })
      .pipe(
        map((response) => {
          paginationResult.result = response.body || [];
          console.log('paginationResult.result');
          console.log(paginationResult.result);
          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse(
              response.headers.get('Pagination') || '{}'
            );
          }
          return paginationResult;
        })
      );
  }
}
