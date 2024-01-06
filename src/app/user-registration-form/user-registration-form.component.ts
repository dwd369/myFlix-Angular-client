import { Component, OnInit, Input } from '@angular/core';

// import component to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// import component to bring in API calls we created
import { FetchApiDataService } from '../fetch-api-data.service';

// import component is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * UserRegistrationFormComponent opens a dialog for user registration.
 *
 * @example
 * <!-- In a template -->
 * <UserRegistrationFormComponent></UserRegistrationFormComponent>
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})

export class UserRegistrationFormComponent implements OnInit {
  
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // logic for a successful user registration goes here! (*To be implemented)
      this.dialogRef.close(); // this will close the modal on success!
      console.log(response); // TESTING ONLY
      this.snackBar.open('User registered successfully', 'OK', { duration: 2000});

      this.fetchApiData.userLogin(this.userData).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['movies']);
        })

    }, (response) => {
      console.log(response); //TESTING ONLY
      this.snackBar.open(response, 'OK', {duration: 2000})
    });
  }
}