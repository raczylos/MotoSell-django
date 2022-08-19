import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OffersService } from '../services/offers.service';
import { Login } from '../login';
import { CarOffer } from '../car-offer';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { delay } from 'rxjs';

@Component({
    selector: 'app-create-offer',
    templateUrl: './create-offer.component.html',
    styleUrls: ['./create-offer.component.css'],
})
export class CreateOfferComponent implements OnInit {



    carOfferForm = this.formBuilder.group({
        title: [''],
        description: [''],
        car_category: [''],
        brand: [''],
        model: [''],
        manufacture_year: [''],
        mileage: [''],
        cubic_capacity: [''],
        power: [''],
        fuel_category: [''],
        image: [''],
        // pub_date = Date
    });


    onFileSelected(event: any) {
        const file = event.target.files[0];
        console.log(file)
        this.carOfferForm.get("image")!.setValue(file)
        // @ts-ignore
        console.log(this.carOfferForm.get("image").value)
    }

    constructor(
        private formBuilder: FormBuilder,
        private offersService: OffersService,
        private userService: UserService
    ) {}

    ngOnInit(): void {}

    onSubmit(): void {
        let userIdJSON = JSON.parse(localStorage.getItem('userId')!);
        console.log(userIdJSON);
        let userId = userIdJSON.user_id;
        console.log(userId);
        const dateNow = new Date();

        const formData = new FormData()
        console.log(this.carOfferForm.value.image)

        // @ts-ignore
        formData.append('image', this.carOfferForm.get('image'))




        let carOffer: CarOffer = {

            title: this.carOfferForm.value.title!,
            description: this.carOfferForm.value.description!,
            car_category: this.carOfferForm.value.car_category!,
            brand: this.carOfferForm.value.brand!,
            model: this.carOfferForm.value.model!,

            manufacture_year: this.carOfferForm.value.manufacture_year!,

            mileage: this.carOfferForm.value.mileage!,

            cubic_capacity: this.carOfferForm.value.cubic_capacity!,

            power: this.carOfferForm.value.power!,
            fuel_category: this.carOfferForm.value.fuel_category!,
            author: userId!,

            image: null!,
            pub_date: dateNow,
        };

        this.offersService.addOffer(carOffer).subscribe((res) => {
            console.log(res);
        });
    }

}
