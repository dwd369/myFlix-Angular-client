import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'YOUR-HOSTED-API_URL_HERE/';

// define injectable
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  
  // Inject the HttpClient module to the construct or params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    )
  };

  // making the api call for user login endpoint
  public userLogin(userDetails: any): Observable<any> {

    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    )
  };

  // making the api call to get all movies
  public getMovies(token: any) {
    console.log(token);
  };


  // making the api call to get details on a movie
  public getMovieDetails(movieID: any): Observable<any> {
    console.log(movieID);
    return this.http.post(apiUrl + 'movieID', movieID).pipe(
      catchError(this.handleError)
    )
  };
  
  // making the api call to get info on director
  public getDirectorDetails(directorName: any): Observable<any> {
    console.log(directorName);
    return this.http.post(apiUrl + 'directorName', directorName).pipe(
      catchError(this.handleError)
    )
  };

  // making the api call to get info on a genre
  public getGenreDetails(genre: any): Observable<any> {
    console.log(genre);
    return this.http.post(apiUrl + 'genre', genre).pipe(
      catchError(this.handleError)
    )
  };

  // making api call to get detail of user
  public getUserDetails(userID: any): Observable<any> {
    console.log(userID);
    return this.http.post(apiUrl, 'users', userID).pipe(
      catchError(this.handleError)
    )
  };

  // making the api call to get list of favorite movies for a user
  public getFavoriteMovies(userID: any, token: any, movie: any) {
    console.log(userID, token);
    return this.http.post(apiUrl + 'users', userID).pipe(
      catchError(this.handleError)
    )
  };

  // making the api call to add a favorite movie
  public addFavorite(userID: any, movieID: any): Observable<any> {
    console.log(userID, movieID);
    return this.http.post(apiUrl + 'users' + 'movieID', userID, movieID).pipe(
      catchError(this.handleError)
    )
  }

  // making the api call to edit user info
  public updateUserInfo(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    )
  };

  // making the api call to delete the user account upon request
  public deleteUser(userID: any) {
    console.log(userID)
    return this.http.post(apiUrl + 'users', userID).pipe(
      catchError(this.handleError)
    )
  };

  // making the api call to delete a movie from user's favorite movies
  public removeFavorite(userID: any, movieID: any): Observable<any> {
    console.log(userID, movieID);
    return this.http.post(apiUrl + 'users' + 'movies', userID, movieID).pipe(
      catchError(this.handleError)
    )
  };

  // api call to handleError
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}` + `Error body is: ${error.error}`
      )
      return throwError(
        'Something bad happened; please try again later.'
      );
    }
  };
}