import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router';

import { appRoutes } from './routes';
import { AddContactComponent } from './add-contact/add-contact.component';

@NgModule({
  declarations: [			
    AppComponent,
      NavComponent,
      ContactComponent,
      AddContactComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
