import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

type User = {
  Username?: string;
  Email?: string;
  Password?: string;
  Birthday?: string;
  FavoriteMovies?: [];
}

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})

export class ProfileViewComponent implements OnInit {

  user: User = {};

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    const user = this.getUser();

    console.log(user.Birthday);
    

    if (!user) {
      this.router.navigate(['welcome']);
      return
    }

    this.user = user;
    this.userData = {
      Username: user.Username || '',
      Password: user.Password || '',
      Email: user.Email || '',
      Birthday: user.Birthday || ''
    };
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUser(): void {
    // console.log(this.userData); //TESTING ONLY

    this.fetchApiData.updateUser(this.userData).subscribe((response) => {
      console.log(response);

      localStorage.setItem('user', JSON.stringify(response));
      this.user = response;
      this.snackBar.open('Data successfully updated!', 'OK', { duration: 2000 });
    })
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Successfully deleted', 'OK', { duration: 2000 });
      });

      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log(response);
      });

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}
