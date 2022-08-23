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

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private jwtHelper: JwtHelperService, private inject: Injector) {}

    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    // private tokens = localStorage.getItem('authTokens')

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



        // let tokens = localStorage.getItem('authTokens')
        // console.log("i am in JWTinterceptor");
        // console.log("hmm " + tokens)
        //  if(tokens){
        //      console.log("proboje bearer dodac")
        //      let tokensJSON = JSON.parse(tokens)
        //      let accessToken = tokensJSON['access']
        //      console.log("to chce " + accessToken)
        //      request = request.clone({
        //          setHeaders: {Authorization: `Bearer ${accessToken}`}
        //          // headers: request.headers.set("Authorization", "Bearer " + this.tokens)
        //      });
        //  }

        let authService = this.inject.get(UserService)
        // if(tokens){  // if tokens exist in localStorage
        //     let tokensJSON = JSON.parse(tokens)
        //     let accessToken = tokensJSON['access']
        //     console.log(accessToken)
        //
        //     if(this.jwtHelper.isTokenExpired(tokensJSON['refresh'])){
        //         //logout
        //         console.log("refresh token expired")
        //         authService.logOut()
        //         return next.handle(request);
        //     }
        //     else if(this.jwtHelper.isTokenExpired(tokensJSON['access'])){
        //         console.log("access token expired")
        //
        //         authService.updateAuthToken()
        //             .subscribe((res) => {
        //                 if(res){
        //                     console.log("updated: " + JSON.stringify(res))
        //                     localStorage.setItem('authTokens', JSON.stringify(res));
        //                     accessToken = tokensJSON['access']
        //                     request = request.clone({setHeaders: {Authorization: `Bearer ${accessToken}`}})
        //                 }
        //                 else{
        //                     console.log("bug?")
        //                 }
        //             })
        //     }
        //     else{
        //         console.log("not updating")
        //          request = request.clone({setHeaders: {Authorization: `Bearer ${accessToken}`}})
        //     }
        //
        // }
        // else{
        //     console.log("no token")
        // }

        console.log(request)

        request = this.addAuthenticationToken(request)

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error && error.status === 401){
                    console.log("jestem w 401")
                    if(this.refreshTokenInProgress){
                        console.log("refresh token in progress true")
                        return this.refreshTokenSubject.pipe(
                            filter(result => result !== null),
                            take(1),
                            timeout(2500),
                            switchMap(() =>  next.handle(this.addAuthenticationToken(request)))
                        )
                    }
                    else {
                        this.refreshTokenInProgress = true
                    }
                    this.refreshTokenSubject.next(null)

                    return this.refreshAccessToken().pipe(
                        timeout(2500),
                        switchMap((success: boolean) => {
                            console.log("success:" + success)
                            this.refreshTokenSubject.next(success)

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

        return of(authService.updateAuthToken()
            .subscribe((res) => {
                if(res){
                    console.log("updated: " + JSON.stringify(res))
                    let x = localStorage.setItem('authTokens', JSON.stringify(res));

                }
                else{
                    console.log("bug?")
                    // return ''
                }
            }))

    }


    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        let tokens = localStorage.getItem('authTokens')
        if (!tokens) {

            return request;
        }
        let tokensJSON = JSON.parse(tokens)
        let accessToken = tokensJSON['access']
        // // If you are calling an outside domain then do not add the token.
        // if (!request.url.match(/www.mydomain.com\//)) {
        //   return request;
        // }

        console.log(tokens)
        console.log(request)
        return request = request.clone({
            setHeaders: {Authorization: `Bearer ${accessToken}`}
            // headers: request.headers.set("Authorization", "Bearer " + this.tokens)
        });
    }


}

