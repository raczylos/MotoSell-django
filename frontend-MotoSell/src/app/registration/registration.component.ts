import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { UserService } from '../services/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import { User } from '../user';
import { MatDialogRef } from '@angular/material/dialog';
import {Login} from "../login";
import {LoginComponent} from "../login/login.component";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

    users: User[] = [];
    login!: Login

    addUserForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        first_name: [''],
        last_name: [''],
        email: [''],
    });

    constructor(
        private dialogRef: MatDialogRef<RegistrationComponent>,
        private formBuilder: FormBuilder,
        private userService: UserService
    ) {
        this.userService.getUsers().subscribe((users) => (this.users = users));
    }

    ngOnInit(): void {}

    onSubmit(): void {
        let user: User = {
            username: this.addUserForm.value.username!,
            password: this.addUserForm.value.password!,
            first_name: this.addUserForm.value.first_name!,
            last_name: this.addUserForm.value.last_name!,
            email: this.addUserForm.value.email!,
        };
        this.login =  {
            username: this.addUserForm.value.username!,
            password: this.addUserForm.value.password!,
        };

        this.userService.addUser(user).subscribe((res) => {
            console.log(res);
            if(res == undefined){
                console.log("incorrect registration data")

            }
            else{

                this.dialogRef.close();
            }
        });

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
