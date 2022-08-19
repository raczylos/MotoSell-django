import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OffersService } from '../services/offers.service';
import {CarOffer} from "../car-offer";

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
    offers: CarOffer[] = []


    constructor(
        private formBuilder: FormBuilder,
        private offersService: OffersService
    ) {}

    ngOnInit(): void {
        this.offersService.getOffers().subscribe((res: any) => {

            this.offers.push(...res.results)
            console.log(this.offers);
        });
    }

}
