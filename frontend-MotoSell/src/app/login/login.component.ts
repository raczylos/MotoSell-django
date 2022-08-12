import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Login } from '../login';

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

    constructor(
        private dialogRef: MatDialogRef<LoginComponent>,
        private formBuilder: FormBuilder,
        private userService: UserService
    ) {}

    ngOnInit(): void {}

    onSubmit(): void {
        let login: Login = {
            username: this.loginForm.value.username!,
            password: this.loginForm.value.password!,
        };

        let tokens = this.userService.getAuthToken(login).subscribe((res: any) => {
            console.log(res);
            if (res == undefined) {
                console.log('incorrect data');
            } else {
                localStorage.setItem('authTokens', JSON.stringify(res));
                console.log(res.access)
                this.userService
                    .loginUser(res.access)
                    .subscribe((res2) => {
                        console.log(res2);
                        this.userService.isLoggedIn = true;
                    });

                this.dialogRef.close();

            }
        });
    }

    onNoClick(): void {
        this.dialogRef.close();

    }
}
