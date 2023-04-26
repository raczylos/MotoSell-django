import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import {OffersComponent} from "./offers/offers.component";
import {CreateOfferComponent} from "./create-offer/create-offer.component";
import {OfferItemComponent} from "./offer-item/offer-item.component";
import {UserOffersComponent} from "./user-offers/user-offers.component";
import {EditUserOfferComponent} from "./edit-user-offer/edit-user-offer.component";


const routes: Routes = [
    {path: '', component: OffersComponent},
    {path: 'offer/create', component: CreateOfferComponent},
    {path: 'offers/:id', component: OfferItemComponent},
    {path: ':username/offers', component: UserOffersComponent},
    {path: ':username/offers/:id', component: EditUserOfferComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
