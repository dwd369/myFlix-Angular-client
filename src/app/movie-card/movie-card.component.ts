import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; 
import { Router } from '@angular/router';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent implements OnInit {

  // declare movies variables to hold fetched movie list from API
  movies: any[] = [];

  // declare contructor for FetchApiDataServices
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  // ngOnInt() lifecycle hook
  ngOnInit(): void {
    const user = localStorage.getItem('user');

    // if (!user) {
    //   this.router.navigate(['welcome']);
    //   return;
    // }

    this.getMovies();
  }

  // declare function to fetch movies via fetchApiData API
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // declare function to fetch details about a movie genre
  getGenreDetails(movie: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: movie.Genre.Name,
        content: movie.Genre.Description
      }
    })
  }

  // declare function to fetch details about the movie director(s)
  getDirectorDetails(movie: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: movie.Director
      }
    })
  }

  // declare function to fetch details about the movie
  getMovieDetails(movie: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: movie.Title,
        content: movie.Description
      }
    })
  }

  // declare function to add movie to user's favorite
  addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(
      () => {
        this.snackBar.open('Added to favorite list', 'OK', {
          duration: 2000
        })
      }
    )
  }

  // declare function to remove movie to user's favorite
  removeFavorite(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe(
      () => {
        this.snackBar.open('Removed from favorite list', 'OK'), {
          duration: 2000
        }
      }
    )
  }

  isFavorite(movieId: string): boolean {
    return this.fetchApiData.isFavoriteMovie(movieId);
  }

}