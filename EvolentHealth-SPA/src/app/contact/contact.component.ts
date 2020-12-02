import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../_models/contact';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  pageNumber = 1;
  pageSize = 5;
  result: any;
  pagination: Pagination;
  contacts: Contact[];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit() {
    this.contactService
      .getContacts(this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.contacts = data.result;
        this.pagination = data.pagination;
        console.log(this.pagination);
        console.log(this.contacts);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
    //alert(this.pagination.currentPage);
  }

  loadUsers() {
    this.contactService
      .getContacts(this.pagination.currentPage, this.pageSize)
      .subscribe((data) => {
        this.contacts = data.result;
        this.pagination = data.pagination;
        console.log(this.pagination);
        console.log(this.contacts);
      });
  }

  deleteContact(id) {
    if (confirm('Are you sure to delete ' + id)) {
      this.contactService.deleteContact(id).subscribe(
        () => {
          this.contacts.splice(
            this.contacts.findIndex((m) => m.id === id),
            1
          );
          alert('Contact has been deleted');
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}
