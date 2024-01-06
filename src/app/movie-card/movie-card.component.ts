import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; 
import { Router } from '@angular/router';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


/**
 * MovieCardComponent represents a card that displays information about movies.
 *
 * @example
 * <!-- In a template -->
 * <app-movie-card [movie]="movieData"></app-movie-card>
 *
 * @example
 * // In a component
 * const movieData = {
 *   title: 'Inception',
 *   director: 'Christopher Nolan',
 *   releaseYear: 2010,
 *   // Other movie properties...
 * };
 */

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

  /**
   * Fetches the list of movies via the fetchApiData API and returns the list of movies as an object
   *
   * @remarks
   * This function makes an HTTP request to the movie API to retrieve a list of movies.
   * The movies are then stored in the `movies` property of the component.
   *
   * @returns {void}
   *
   * @throws {Error} If there is an issue fetching the movies from the API.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Fetches the genre details for a specified movie.
   *
   * @remarks
   * This function makes an HTTP request to the movie API to retrieve details about the genre
   * of the specified movie. The genre details include the title and content of the genre.
   *
   * @param {string} movie - The movie object of the user selected movie
   * @returns {void}
   *
   * @throws {Error} If there is an issue fetching the genre details from the API.
   */
  getGenreDetails(movie: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: movie.Genre.Name,
        content: movie.Genre.Description
      }
    })
  }

  /**
   * Retrieves the director details for a specified movie.
   *
   * @remarks
   * This function extracts the director name from the provided movie object.
   *
   * @param {Object} movie - The movie object for which director details are requested.
   * @returns {void}
   *
   * @throws {TypeError} If the provided movie object is null or undefined.
   */
  getDirectorDetails(movie: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: movie.Director
      }
    })
  }

  /**
   * Retrieves the details for a specified movie including the title and the description
   *
   * @remarks
   * This function extracts the director name from the provided movie object.
   *
   * @param {Object} movie - The movie object for which director details are requested.
   * @returns {void}
   *
   * @throws {TypeError} If the provided movie object is null or undefined.
   */
  getMovieDetails(movie: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: movie.Title,
        content: movie.Description
      }
    })
  }

  /**
   * Adds a movie to the user's list of favorite movies.
   *
   * @remarks
   * This function adds the movie id to the user object under the 'favoritemovies' property.
   *
   * @param {string} movieid - The movieId to be added to the user's FavoriteMovies list
   * @returns {void}
   *
   * @throws {TypeError} If the provided movieid is null or undefined.
   */
  addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(
      () => {
        this.snackBar.open('Added to favorite list', 'OK', {
          duration: 2000
        })
      }
    )
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   *
   * @remarks
   * This function removes the specified movie id from the user object under the 'favoritemovies' property.
   *
   * @param {string} movieid - The movieId to be removed from the user's FavoriteMovies list
   * @returns {void}
   *
   * @throws {TypeError} If the provided movieid is null or undefined.
   */
  removeFavorite(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe(
      () => {
        this.snackBar.open('Removed from favorite list', 'OK'), {
          duration: 2000
        }
      }
    )
  }

  /**
   * Check whether the a movie is listed as a favorite under the user's FavoriteMovie property
   *
   * @remarks
   * This function checks whether checks the list of movies against the user's FavoriteMovie property and flag any matches as favorite movie
   *
   * @param {string} movieid - The movieId to be validated against the user's array via fetchApiData
   * @returns {void}
   *
   * @throws {TypeError} If the provided movieid is null or undefined.
   */
  isFavorite(movieId: any): boolean {
    return this.fetchApiData.isFavoriteMovie(movieId);
  }

}