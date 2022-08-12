import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../user';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
    users: User[] = [];

    addUserForm = this.formBuilder.group({
        id: '',
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
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
            id: this.addUserForm.value.id!,
            username: this.addUserForm.value.username!,
            password: this.addUserForm.value.password!,
            first_name: this.addUserForm.value.first_name!,
            last_name: this.addUserForm.value.last_name!,
            email: this.addUserForm.value.email!,
        };

        this.userService.addUser(user).subscribe((res) => {
            console.log(res);
            if(res == undefined){
                console.log("incorrect data")
            }
            else{

                this.dialogRef.close();
            }
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
