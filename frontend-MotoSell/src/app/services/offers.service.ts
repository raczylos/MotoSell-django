import { CarOffer } from './../car-offer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {catchError} from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

@Injectable({
    providedIn: 'root',
})
export class OffersService {
    constructor(private http: HttpClient) {}

    // private base_url = 'http://192.168.43.244:9000/';
    private base_url = 'http://127.0.0.1:8000/';

    getOffers(): Observable<CarOffer[]> {
        let url = 'offers/';

        return this.http.get<CarOffer[]>(this.base_url + url, httpOptions);
    }



    getOfferItem(id: Number): Observable<CarOffer> {
        let url = `offers/${id}/`;

        return this.http.get<CarOffer>(this.base_url + url, httpOptions);
    }

    getImage(imageUrl: string): Observable<string> {


        // let url = 'media/files/images/' + imageUrl;

        return this.http
            .get<string>(imageUrl)

    }

    addOffer(carOffer: any): Observable<CarOffer> {
        let url = 'offers/';

        return this.http.post<CarOffer>(this.base_url + url, carOffer);
    }

    editOffer(carOffer: any, id: Number): Observable<CarOffer> {
        let url = `offers/${id}/`;

        return this.http.put<CarOffer>(this.base_url + url, carOffer);
    }

    deleteOffer(id: Number): Observable<CarOffer> {
        let url = `offers/${id}/`;

        return this.http.delete<CarOffer>(this.base_url + url, httpOptions);
    }
}
