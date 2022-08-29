import {AfterViewInit, Component, Injector, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ComponentType } from '@angular/cdk/portal';
import { DialogRef } from '@angular/cdk/dialog';
import {UserService} from "./services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent  {


    title = 'frontend-MotoSell';
    registerComponent: ComponentType<RegistrationComponent> =
        RegistrationComponent;
    loginComponent: ComponentType<LoginComponent> = LoginComponent;




    constructor(public dialog: MatDialog, public userService: UserService, private route: ActivatedRoute) {
        route.params.subscribe(val => { //force component to recreate
            this.userService.getUsername()
        });
    }

    username: string = ''



    ngOnInit(): void {

        this.userService.getUsername()


    }


    openDialog(componentName: ComponentType<any>): void {
        const dialogRef = this.dialog.open(componentName, {
            width: '300px',
            // data: {user: User},
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.userService.getUsername()
            // this.getUsername()
            console.log('The dialog was closed');
            // console.log(JSON.stringify(result))
        });
    }

}
