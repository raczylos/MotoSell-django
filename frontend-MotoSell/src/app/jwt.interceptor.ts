import {Injectable, Injector} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders, HttpClient, HttpErrorResponse
} from '@angular/common/http';
import {catchError, filter, first, Observable, throwError, timeout} from 'rxjs';
import {UserService} from "./services/user.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private jwtHelper: JwtHelperService, private inject: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tokens = localStorage.getItem('authTokens')
        console.log("i am in JWTinterceptor");

        let authService = this.inject.get(UserService)
        if(tokens){  // if tokens exist in localStorage
            let tokensJSON = JSON.parse(tokens)
            let accessToken = tokensJSON['access']
            console.log(accessToken)

            if(this.jwtHelper.isTokenExpired(tokensJSON['refresh'])){
                //logout
                console.log("refresh token expired")
                authService.logOut()
                return next.handle(request);
            }
            else if(this.jwtHelper.isTokenExpired(tokensJSON['access'])){
                console.log("access token expired")

                authService.updateAuthToken()
                    .subscribe((res) => {
                        if(res){
                            console.log("elo " + JSON.stringify(res))
                            localStorage.setItem('authTokens', JSON.stringify(res));
                            accessToken = tokensJSON['access']
                            request = request.clone({setHeaders: {Authorization: `Bearer ${accessToken}`}})
                        }
                        else{
                            console.log("tego nie chce")
                        }
                    })
            }
            else{
                console.log("not updating")
                 request = request.clone({setHeaders: {Authorization: `Bearer ${accessToken}`}})
            }

        }
        else{
            console.log("no token")
        }

        console.log(request)

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }




}

