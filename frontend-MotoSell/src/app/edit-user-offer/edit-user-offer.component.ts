import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserOffersComponent} from "../user-offers/user-offers.component";
import {FormBuilder} from "@angular/forms";
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
        isPublished: [''],
        isDeleted: [''],
        // pub_date = Date
    });

    imageSrc: string = ''
    userId: string = ''
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


        this.formData.append('title', this.carOfferForm.value.title!)
        this.formData.append('car_category', this.carOfferForm.value.car_category!)
        this.formData.append('brand', this.carOfferForm.value.brand!)
        this.formData.append('model', this.carOfferForm.value.model!)
        this.formData.append('mileage', this.carOfferForm.value.mileage!)
        this.formData.append('cubic_capacity', this.carOfferForm.value.cubic_capacity!)
        this.formData.append('description', this.carOfferForm.value.description!)
        this.formData.append('fuel_category', this.carOfferForm.value.fuel_category!)
        this.formData.append('manufacture_year', this.carOfferForm.value.manufacture_year!)
        this.formData.append('power', this.carOfferForm.value.power!)
        this.formData.append("author", this.userId!)
        this.formData.append("isDeleted", this.carOfferForm.value.isDeleted!)
        this.formData.append("isPublished", this.carOfferForm.value.isPublished!)
        this.offersService.editOffer(this.formData,parseInt(this.userId)).subscribe((res) => {
            console.log(res);
        });

    }



    ngOnInit(): void {

        this.route.params.pipe(
            switchMap((params) => {
                const username = params['username']
                const id = params['id']
                this.userId = id
                this.username = username
                // this.offersService.getOfferItem(id)
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
            this.carOfferForm.get("manufacture_year")!.setValue(res.manufacture_year)
            this.carOfferForm.get("power")!.setValue(res.power)

            this.imageSrc = res.image as string




        })
    }

}
