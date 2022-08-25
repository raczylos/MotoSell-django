import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import {OffersComponent} from "./offers/offers.component";
import {CreateOfferComponent} from "./create-offer/create-offer.component";
import {OfferItemComponent} from "./offer-item/offer-item.component";
import {UserOffersComponent} from "./user-offers/user-offers.component";


const routes: Routes = [
    {path: '', component: OffersComponent},
    {path: 'offer/create', component: CreateOfferComponent},
    {path: 'offers/:id', component: OfferItemComponent},
    {path: ':username/offers', component: UserOffersComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
