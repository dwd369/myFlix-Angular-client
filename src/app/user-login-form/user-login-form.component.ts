import { Component, OnInit, Input } from '@angular/core';

// import component to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// import component to bring in API calls we created
import { FetchApiDataService } from '../fetch-api-data.service';

// import component is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

    ngOnInit(): void {

    }

    loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((response) => {
        
        // logic for a successful user login goes here!
        // set localStorage item for user and token
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        
        // close dialog
        this.dialogRef.close();
        this.snackBar.open('User login successfully', 'OK', {
          duration: 2000
        });
      }, (Response) => {
        this.snackBar.open(Response, 'OK', {
          duration: 2000
        });
      });
    }
}