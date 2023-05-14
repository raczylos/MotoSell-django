import {Injectable, Injector} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders, HttpClient, HttpErrorResponse
} from '@angular/common/http';
import {
    BehaviorSubject,
    catchError,
    filter,
    finalize,
    first,
    Observable,
    of,
    switchMap,
    take,
    throwError,
    timeout
} from 'rxjs';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private jwtHelper: JwtHelperService, private inject: Injector, private router: Router) {
    }

    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // if(this.router.url !== "/" || request.url.match("http://192.168.43.244:9000/accounts/login/")){
        //     request = this.addAuthenticationToken(request)
        // }

        if(this.router.url !== "/" || request.url.match("http://127.0.0.1:8000/accounts/login/")){
            request = this.addAuthenticationToken(request)
        }



        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401) {
                    if (this.refreshTokenInProgress) {
                        return this.refreshTokenSubject.pipe(
                            filter(result => result !== null),
                            take(1),
                            switchMap(() => next.handle(this.addAuthenticationToken(request)))
                        )
                    } else {
                        this.refreshTokenInProgress = true
                    }
                    this.refreshTokenSubject.next(null)

                    return this.refreshAccessToken().pipe(
                        switchMap((response) => {
                            if (response) {
                                localStorage.setItem('authTokens', JSON.stringify(response))
                                console.log("successfully updated token: " + JSON.stringify(response))
                                this.refreshTokenSubject.next(response)
                            }

                            return next.handle(this.addAuthenticationToken(request))
                        }),
                        finalize(() => this.refreshTokenInProgress = false)
                    )
                } else {
                    return throwError(error)
                }
            })
        )
    }

    private refreshAccessToken(): Observable<any> {
        let authService = this.inject.get(UserService)

        return authService.updateAuthToken()


    }


    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        let tokens = localStorage.getItem('authTokens')
        if (!tokens) {

            return request;
        }
        let tokensJSON = JSON.parse(tokens)
        let accessToken = tokensJSON['access']

        // // // If you are calling an outside domain then do not add the token.
        // if (!request.url.match(/www.mydomain.com\//)) {
        //   return request;
        // // }

            console.log(tokens)
            console.log(request)
            request = request.clone({
                setHeaders: {Authorization: `Bearer ${accessToken}`}
            });
            return request



    }
}

