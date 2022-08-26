import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder} from '@angular/forms';
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
        isPublished: Boolean,
        isDeleted: Boolean,
        // pub_date = Date
    });
    formData = new FormData()
    imageSrc: string = '';

    onFileSelected(event: any) {
        const file = event.target.files[0];
        console.log(file)
        this.carOfferForm.get("image")!.setValue(file)

        this.formData.append('image', file)
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imageSrc = reader.result as string;
        }

        console.log(this.carOfferForm.get("image")!.value)

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

        console.log(this.carOfferForm.value.image)

        this.formData.append("title", this.carOfferForm.value.title!)
        this.formData.append("description", this.carOfferForm.value.description!)
        this.formData.append("car_category", this.carOfferForm.value.car_category!)
        this.formData.append("brand", this.carOfferForm.value.brand!)
        this.formData.append("model", this.carOfferForm.value.model!)
        this.formData.append("manufacture_year", this.carOfferForm.value.manufacture_year!)
        this.formData.append("mileage", this.carOfferForm.value.mileage!)
        this.formData.append("cubic_capacity", this.carOfferForm.value.cubic_capacity!)
        this.formData.append("power", this.carOfferForm.value.power!)
        this.formData.append("fuel_category", this.carOfferForm.value.fuel_category!)
        this.formData.append("author", userId!)
        this.formData.append("isPublished", "false")
        this.formData.append("isDeleted", "false")
        this.formData.append("pub_date", "null")


        console.log(this.formData.get("title"))
        console.log(this.formData.get("image"))

        let carOffer: FormData = this.formData

        this.offersService.addOffer(carOffer).subscribe((res) => {
            console.log(res);
        });
    }

}
