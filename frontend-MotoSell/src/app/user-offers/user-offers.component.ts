import { Component, OnInit } from '@angular/core';
import {CarOffer} from "../car-offer";
import {OffersService} from "../services/offers.service";
import {ActivatedRoute} from "@angular/router";
import {of, switchMap} from "rxjs";
import {ComponentType} from "@angular/cdk/portal";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteUserOfferComponent} from "../delete-user-offer/delete-user-offer.component";

@Component({
    selector: 'app-user-offers',
    templateUrl: './user-offers.component.html',
    styleUrls: ['./user-offers.component.css']
})
export class UserOffersComponent implements OnInit {
    offers: CarOffer[] = []
    constructor(
                public dialog: MatDialog,
                private offersService: OffersService,
                private route: ActivatedRoute)
    {
        route.params.subscribe(val => { //force component to recreate
            this.getUserOffers()
        });
    }

    ngOnInit(): void {
        this.getUserOffers()
    }

    getUserOffers(): void {
        this.offersService.getOffers().subscribe((res: any) => {
            this.offers = [] //clear table to use fuction in openDialog (prevent duplicate)
            this.offers.push(...res.results)
            console.log(this.offers);

        });
    }


    openDialog(id: any, title: string): void {
        const dialogRef = this.dialog.open(DeleteUserOfferComponent, {
            width: '300px',
            data: {id: id, title: title}

        });

        dialogRef.afterClosed().subscribe((result) => {

            console.log('The dialog was closed');

            this.getUserOffers()
        });
    }


    publishOffer(offer: CarOffer) {

        offer.isPublished = !offer.isPublished //toggle boolean isPublished

        console.log(offer)
        console.log(offer.isPublished)
        const dateNow = new Date();
        let month = dateNow.getUTCMonth() + 1; //months from 1-12
        let day = dateNow.getUTCDate();
        let year = dateNow.getUTCFullYear();

        let newdate = year + "-" + month + "-" + day;

        const carOffer: CarOffer = {
            isDeleted: offer.isDeleted,
            author: offer.author,
            brand: offer.brand,
            car_category: offer.car_category,
            cubic_capacity: offer.cubic_capacity,
            description: offer.description,
            fuel_category: offer.fuel_category,
            price: offer.price,
            manufacture_year: offer.manufacture_year,
            mileage: offer.mileage,
            model: offer.model,
            power: offer.power,
            // pub_date: offer.pub_date,
            title: offer.title,
            pub_date: newdate,
            isPublished: offer.isPublished

        }



        this.offersService.editOffer(carOffer, parseInt(offer.id!)).subscribe((res) => {
            console.log(res)
        })
    }

}
