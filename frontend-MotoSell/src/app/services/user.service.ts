import { User } from './../user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, isEmpty, BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Login } from '../login';
import {Router} from "@angular/router";


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
    }),
};

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // private base_url = 'http://192.168.43.244:9000/';
    private base_url = 'http://127.0.0.1:8000/';


    // public isLoggedIn: boolean = JSON.parse(
    //     localStorage.getItem('authTokens')!
    // );
    public isLoggedIn: boolean = !!this.getAccessToken()
    public username: string = ''


    constructor(private http: HttpClient, private router: Router) {
        console.log('user service constructor');

    }

    getUsername(): void {
        let userId = localStorage.getItem('userId');
        if(userId){
            let userIdJSON = JSON.parse(localStorage.getItem('userId')!)
            this.getUser(userIdJSON.user_id).subscribe((res) => {
                this.username = res.username
            })
        }

    }

    getUsers(): Observable<User[]> {
        let url = 'accounts/users/';
        return this.http.get<User[]>(this.base_url + url);
    }

    getUser(id: Number): Observable<User> {
        let url = `accounts/users/${id}/`;
        return this.http.get<User>(this.base_url + url);
    }

    logOut() {
        console.log('logout');
        localStorage.clear();
        this.isLoggedIn = false;
        this.router.navigate(['/'])
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

        const refresh_token_object = {
            refresh: this.getRefreshToken(),
        };
        return this.http
            .post<String>(
                this.base_url + url,
                refresh_token_object,
                httpOptions
            )
            .pipe(catchError(this.handleError<String>('updateAuthToken')));
    }

    getAccessToken(): String {
        let tokens = localStorage.getItem('authTokens')

        if(tokens){
            let tokensJSON = JSON.parse(tokens)
            let access_token = tokensJSON['access']
            return access_token
        }
        else{
            return ''
        }

    }

    getRefreshToken(): String {
        let tokens = JSON.parse(localStorage.getItem('authTokens') || '');
        if(tokens){
            let refresh_token = tokens['refresh']
            return refresh_token
        }
        else{
            return ''
        }

    }

    loginUser(access_token: String): Observable<String> {
        console.log("login")
        let url = 'accounts/login/';

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
