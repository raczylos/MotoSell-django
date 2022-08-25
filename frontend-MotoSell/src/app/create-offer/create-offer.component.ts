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
        // pub_date = Date
    });
    formData = new FormData()

    onFileSelected(event: any) {
        const file = event.target.files[0];
        console.log(file)
        // this.carOfferForm.value.image = file
        this.carOfferForm.get("image")!.setValue(file)

        this.formData.append('image', file)
        // reader.addEventListener('load' (event: any) => {
        //     this.carOfferForm.value.image =
        // })
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
        console.log("hehe")

        // @ts-ignore
        // formData.append('image', this.carOfferForm.value.image!)
        // formData.append('image', file)




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
        this.formData.append("pub_date", dateNow.toString())

        console.log(this.formData.get("title"))
        console.log(this.formData.get("image"))

        let carOffer: FormData = this.formData



        // let carOffer: CarOffer = {
        //
        //     title: this.carOfferForm.value.title!,
        //     description: this.carOfferForm.value.description!,
        //     car_category: this.carOfferForm.value.car_category!,
        //     brand: this.carOfferForm.value.brand!,
        //     model: this.carOfferForm.value.model!,
        //
        //     manufacture_year: this.carOfferForm.value.manufacture_year!,
        //
        //     mileage: this.carOfferForm.value.mileage!,
        //
        //     cubic_capacity: this.carOfferForm.value.cubic_capacity!,
        //
        //     power: this.carOfferForm.value.power!,
        //     fuel_category: this.carOfferForm.value.fuel_category!,
        //     author: userId!,
        //     // @ts-ignore
        //     image: formData,
        //     isPublished: false,
        //     pub_date: dateNow,
        // };

        this.offersService.addOffer(carOffer).subscribe((res) => {

            console.log("here")
            console.log(res);
        });
    }

}
