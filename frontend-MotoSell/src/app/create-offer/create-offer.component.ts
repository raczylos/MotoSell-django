import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, Validators} from '@angular/forms';
import { OffersService } from '../services/offers.service';
import { Login } from '../login';
import { CarOffer } from '../car-offer';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { delay } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-offer',
    templateUrl: './create-offer.component.html',
    styleUrls: ['./create-offer.component.css'],
})
export class CreateOfferComponent implements OnInit {


    currentYear = new Date().getFullYear()
    carOfferForm = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(80)]],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]],
        car_category: ['', [Validators.required]],
        brand: ['', [Validators.required, Validators.maxLength(15)]],
        model: ['', [Validators.required, Validators.maxLength(30)]],
        manufacture_year: ['', [Validators.required, Validators.min(1800), Validators.max(this.currentYear)]],
        mileage: ['', [Validators.required]],
        cubic_capacity: ['', [Validators.required]],
        power: ['', [Validators.required]],
        fuel_category: ['', [Validators.required]],
        image: ['', [Validators.required]],
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
        private router: Router
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


        console.log(this.formData.get("title"))
        console.log(this.formData.get("image"))

        let carOffer: FormData = this.formData
        if(this.carOfferForm.valid){
            console.log("valid create form")
            this.offersService.addOffer(carOffer).subscribe((res) => {
            console.log(res);
            this.router.navigate(['/'])
            });
        }
        else {
            console.log("invalid create form")
        }

    }

}
