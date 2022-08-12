import { Component } from '@angular/core';
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
export class AppComponent {
    title = 'frontend-MotoSell';
    registerComponent: ComponentType<RegistrationComponent> =
        RegistrationComponent;
    loginComponent: ComponentType<LoginComponent> = LoginComponent;

    constructor(public dialog: MatDialog, public userService: UserService) {
    }

    openDialog(componentName: ComponentType<unknown>): void {
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
