import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Login } from '../login';
import {RegistrationComponent} from "../registration/registration.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm = this.formBuilder.group({
        username: '',
        password: '',
    });


    accountExist: boolean = true

    constructor(
        private dialogRef: MatDialogRef<LoginComponent>,
        private formBuilder: FormBuilder,
        private userService: UserService
    ) {}

    ngOnInit(): void {}


    loginProcess(login: Login): void {
        console.log("loginProcess")
        this.userService.getAuthToken(login).subscribe((res: any) => {
            console.log(res);
            if (res == undefined) {
                this.accountExist = false
                console.log('incorrect login data');

            } else {
                localStorage.setItem('authTokens', JSON.stringify(res));
                console.log(res.access)
                this.userService
                    .loginUser(res.access)
                    .subscribe((res2) => {
                        this.accountExist = true
                        console.log(res2);
                        localStorage.setItem('userId', JSON.stringify(res2));
                        this.userService.isLoggedIn = true;
                        this.userService.getUsername()
                    });

                this.dialogRef.close();

            }
        });
    }

    onSubmit(): void {
        let login: Login = {
            username: this.loginForm.value.username!,
            password: this.loginForm.value.password!,
        };

        this.loginProcess(login)



    }

    onNoClick(): void {
        this.dialogRef.close();

    }

     handleKeyUp(e: any){
         if(e.keyCode === 13){

            this.onSubmit();
         }
    }



}
