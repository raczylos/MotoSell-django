import { User } from './../user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { Login } from '../login';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private base_url = 'http://192.168.43.244:9000/';
    public isLoggedIn: boolean = JSON.parse(localStorage.getItem('authTokens')!);


    constructor(private http: HttpClient) {
        console.log('user service constructor');
        this.IntervalFunction();
        // this._isLoggedIn$.next(!!access_token); // !!access_token return bool
    }

    public IntervalFunction() {
        const interval = setInterval(() => {
            const tokens: any = JSON.parse(localStorage.getItem('authTokens')!);
            if (tokens == null) {
                this.isLoggedIn = false;
                console.log('no tokens');
            } else if (this.tokenExpired(tokens['refresh'])) {
                this.logOut(); // clear local storage
                console.log('stop interval');
                clearInterval(interval);
            } else {
                this.updateAuthToken().subscribe((res: any) => {
                    console.log(res);
                    localStorage.setItem('authTokens', JSON.stringify(res));
                    this.isLoggedIn = true;
                });
            }
        }, 240 * 1000);
    }

    private tokenExpired(token: string) {
        const expiry = JSON.parse(atob(token.split('.')[1])).exp;
        return Math.floor(new Date().getTime() / 1000) >= expiry;
    }

    getUsers(): Observable<User[]> {
        let url = 'accounts/users/';
        return this.http.get<User[]>(this.base_url + url);
    }

    logOut() {
        console.log('logout');
        localStorage.clear();
        this.isLoggedIn = false
    }

    addUser(user: User): Observable<User> {
        let url = 'accounts/registration/';
        console.log('try connect to: ' + this.base_url + url);
        console.log(user);
        return this.http
            .post<User>(this.base_url + url, user, httpOptions)
            .pipe(catchError(this.handleError<User>('addUser')));
    }

    getAuthToken(login: Login): Observable<Login> {
        let url = 'api/token/';
        return this.http
            .post<Login>(this.base_url + url, login, httpOptions)
            .pipe(catchError(this.handleError<Login>('getAuthToken')));
    }

    updateAuthToken(): Observable<String> {
        console.log('updating token');
        let url = 'api/token/refresh/';
        const auth_tokens: any = JSON.parse(
            localStorage.getItem('authTokens') || ''
        );

        const refresh_token = auth_tokens['refresh'];
        const refresh_token_object = {
            refresh: refresh_token,
        };
        return this.http
            .post<String>(
                this.base_url + url,
                refresh_token_object,
                httpOptions
            )
            .pipe(catchError(this.handleError<String>('updateAuthToken')));
    }

    loginUser(access_token: String): Observable<String> {
        let url = 'accounts/login/';

        httpOptions.headers = httpOptions.headers.set(
            'Authorization',
            'bearer ' + access_token
        );

        return this.http
            .post<String>(this.base_url + url, '', httpOptions)
            .pipe(catchError(this.handleError<String>('loginUser')));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(operation + ' failed' + error);
            return of(result as T);
        };
    }
}
