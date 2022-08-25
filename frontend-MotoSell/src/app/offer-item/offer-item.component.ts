import { Component, OnInit } from '@angular/core';
import {OffersService} from "../services/offers.service";
import {ActivatedRoute} from "@angular/router";
import {CarOffer} from "../car-offer";
import {mergeMap, switchMap} from "rxjs";

@Component({
    selector: 'app-offer-item',
    templateUrl: './offer-item.component.html',
    styleUrls: ['./offer-item.component.css']
})
export class OfferItemComponent implements OnInit {
    offer!: CarOffer
    constructor(private offersService: OffersService, private route: ActivatedRoute) { }

    // ngOnInit(): void {
    //     this.route.params.subscribe(params => {
    //         const id = params['id']
    //
    //         this.offersService.getOfferItem(id).subscribe((res) => {
    //             console.log(res)
    //             this.offer = res
    //         })
    //     });
    //
    //
    // }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap((params) => {
                const id = params['id']
                // this.offersService.getOfferItem(id)
                return this.offersService.getOfferItem(id)
            })
        ).subscribe((res) => {
            console.log(res)
            this.offer = res
        })


    }




}
