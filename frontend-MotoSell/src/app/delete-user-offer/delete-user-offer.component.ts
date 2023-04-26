import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OffersService} from "../services/offers.service";
import {UserOffersComponent} from "../user-offers/user-offers.component";

@Component({
  selector: 'app-delete-user-offer',
  templateUrl: './delete-user-offer.component.html',
  styleUrls: ['./delete-user-offer.component.css']
})
export class DeleteUserOfferComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DeleteUserOfferComponent>,
                private offersService: OffersService,
                @Inject(MAT_DIALOG_DATA) public data: {
                    title: string;
                    id: any
                },
                ) { }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    deleteOffer(id: any): void {
        this.offersService.deleteOffer(parseInt(id)).subscribe((res) => {
            console.log(res)
            this.dialogRef.close();
        })
    }

}
