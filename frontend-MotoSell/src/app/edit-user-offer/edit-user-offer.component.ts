import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserOffersComponent} from "../user-offers/user-offers.component";
import {FormBuilder, Validators} from "@angular/forms";
import {CarOffer} from "../car-offer";
import {OffersService} from "../services/offers.service";
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-user-offer',
  templateUrl: './edit-user-offer.component.html',
  styleUrls: ['./edit-user-offer.component.css']
})
export class EditUserOfferComponent implements OnInit {
    // @ViewChild(UserOffersComponent) userOffersComponent!: UserOffersComponent;


    // offer: CarOffer = this.userOffersComponent.offers
    constructor(private formBuilder: FormBuilder, private offersService: OffersService, private route: ActivatedRoute) { }

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
        price: ['', [Validators.required]],
        image: ['', [Validators.required]],
        isPublished: [''],
        isDeleted: [''],
        // pub_date = Date
    });

    imageSrc: string = ''
    userId: string = ''
    offerId: string = ''
    username: string = ''
    formData = new FormData()

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


    onSubmit(): void {

        let userIdJSON = JSON.parse(localStorage.getItem("userId")!)
        this.userId = userIdJSON.user_id


        this.formData.append('title', this.carOfferForm.value.title!)
        this.formData.append('car_category', this.carOfferForm.value.car_category!)
        this.formData.append('brand', this.carOfferForm.value.brand!)
        this.formData.append('model', this.carOfferForm.value.model!)
        this.formData.append('mileage', this.carOfferForm.value.mileage!)
        this.formData.append('cubic_capacity', this.carOfferForm.value.cubic_capacity!)
        this.formData.append('description', this.carOfferForm.value.description!)
        this.formData.append('fuel_category', this.carOfferForm.value.fuel_category!)
        this.formData.append('price', this.carOfferForm.value.price!)
        this.formData.append('manufacture_year', this.carOfferForm.value.manufacture_year!)
        this.formData.append('power', this.carOfferForm.value.power!)
        this.formData.append("author", this.userId!)
        this.formData.append("isDeleted", this.carOfferForm.value.isDeleted!)
        this.formData.append("isPublished", this.carOfferForm.value.isPublished!)
        this.offersService.editOffer(this.formData,parseInt(this.offerId)).subscribe((res) => {
            console.log(res);
        });

    }



    ngOnInit(): void {

        this.route.params.pipe(
            switchMap((params) => {
                const username = params['username']
                const id = params['id']
                this.offerId = id
                this.username = username
                return this.offersService.getOfferItem(id)
            })
        ).subscribe((res) => {
            console.log(res)

            this.carOfferForm.get("title")!.setValue(res.title)
            this.carOfferForm.get("car_category")!.setValue(res.car_category)
            this.carOfferForm.get("brand")!.setValue(res.brand)
            this.carOfferForm.get("model")!.setValue(res.model)
            this.carOfferForm.get("mileage")!.setValue(res.mileage)
            this.carOfferForm.get("cubic_capacity")!.setValue(res.cubic_capacity)
            this.carOfferForm.get("description")!.setValue(res.description)
            this.carOfferForm.get("fuel_category")!.setValue(res.fuel_category)
            this.carOfferForm.get("price")!.setValue(res.price)
            this.carOfferForm.get("manufacture_year")!.setValue(res.manufacture_year)
            this.carOfferForm.get("power")!.setValue(res.power)

            this.imageSrc = res.image as string




        })
    }

}
