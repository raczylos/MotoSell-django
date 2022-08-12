import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import {OffersComponent} from "./offers/offers.component";
import {CreateOfferComponent} from "./create-offer/create-offer.component";


const routes: Routes = [
    {path: '', component: OffersComponent},
    {path: 'offer/create', component: CreateOfferComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
