import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ComponentType } from '@angular/cdk/portal';
import { DialogRef } from '@angular/cdk/dialog';
import {UserService} from "./services/user.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent  {
    // @ViewChild(LoginComponent) loginComponent!: ComponentType<LoginComponent>


    title = 'frontend-MotoSell';
    registerComponent: ComponentType<RegistrationComponent> =
        RegistrationComponent;
    loginComponent: ComponentType<LoginComponent> = LoginComponent;

    username: string = ''

    constructor(public dialog: MatDialog, public userService: UserService) {}

    ngOnInit(): void {

        let userId = localStorage.getItem('userId');
        if(userId){
            let userIdJSON = JSON.parse(localStorage.getItem('userId')!)
            this.userService.getUser(userIdJSON.user_id).subscribe((res) => {
                this.username = res.username
            })
        }


    }

    openDialog(componentName: ComponentType<any>): void {
        const dialogRef = this.dialog.open(componentName, {
            width: '300px',
            // data: {user: User},
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            // console.log(JSON.stringify(result))
        });
    }
}
