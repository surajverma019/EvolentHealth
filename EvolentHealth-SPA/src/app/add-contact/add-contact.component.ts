import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  //  @ViewChild('editForm') editForm: NgForm | undefined;
  statusList = [
    { value: 'false', display: 'In-Active' },
    { value: 'true', display: 'Active' },
  ];
  contact: Contact;
  id: number;
  txtToDisplay = 'Add';

  constructor(
    private contactService: ContactService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.contact = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      createdOn: new Date(),
      status: true,
    };
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id || 0;
    //alert(this.id);

    if (this.id !== 0) {
      this.txtToDisplay = 'Edit';
      this.contact.id = this.id;
      this.contactService.getContact(this.id).subscribe((data) => {
        this.contact = data;
      });
    } else {
      this.contact.status = true;
    }
  }

  addEditContact() {
    if (this.validateForm()) {
      if (this.contact.status + '' === 'true') {
        this.contact.status = true;
      }
      if (this.contact.status + '' === 'false') {
        this.contact.status = false;
      }

      this.contactService.addEditContact(this.contact).subscribe(
        () => {
          alert('Submit Successfully');
        },
        (error) => {
          alert(error);
          console.log(error);
        },
        () => {
          this.route.navigate(['']);
        }
      );
    }
  }

  validateForm() {
    if (this.contact.firstName.length === 0) {
      alert('First Name is Required');
      return false;
    }

    if (this.contact.lastName.length === 0) {
      alert('Last Name is Required');
      return false;
    }

    if (this.contact.email.length === 0) {
      alert('Email is Required');
      return false;
    }

    if (this.contact.phoneNumber.length === 0) {
      alert('Phone Number is Required');
      return false;
    }

    if (this.contact.phoneNumber.length !== 10) {
      alert('Phone Number is should be 10 digit');
      return false;
    }

    return true;
  }
}
