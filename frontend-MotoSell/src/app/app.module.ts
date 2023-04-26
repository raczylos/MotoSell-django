import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {OffersComponent} from "./offers/offers.component";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {CreateOfferComponent} from "./create-offer/create-offer.component";
import {JwtInterceptor} from "./jwt.interceptor";
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import {FlexLayoutModule} from "@angular/flex-layout";
import {OfferItemComponent} from "./offer-item/offer-item.component";
import {UserOffersComponent} from "./user-offers/user-offers.component";
import {DeleteUserOfferComponent} from "./delete-user-offer/delete-user-offer.component";
import {EditUserOfferComponent} from "./edit-user-offer/edit-user-offer.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        LoginComponent,
        RegistrationComponent,
        OffersComponent,
        CreateOfferComponent,
        OfferItemComponent,
        UserOffersComponent,
        DeleteUserOfferComponent,
        EditUserOfferComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDialogModule,
        MatCardModule,
        MatGridListModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,

    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        LoginComponent,

    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
