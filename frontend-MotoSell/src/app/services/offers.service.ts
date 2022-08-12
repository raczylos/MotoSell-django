import { CarOffer } from './../car-offer';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

@Injectable({
  providedIn: 'root'
})


export class OffersService {

    constructor(private http: HttpClient) { }

    private base_url = 'http://192.168.43.244:9000/';


    getOffers(): Observable<CarOffer[]>{
        let url = 'offers/';
        return this.http.get<CarOffer[]>(this.base_url + url, httpOptions);
    }

    addOffer(): Observable<CarOffer>{
        let url = 'offers/create';
        return this.http.post<CarOffer>(this.base_url + url, httpOptions);
    }

}
