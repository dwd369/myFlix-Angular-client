import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://dd-myflix.herokuapp.com/';

// define injectable
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  
  // Inject the HttpClient module to the construct or params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {};

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails); // TESTING ONLY
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  };

  // making the api call for user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails); // TESTING ONLY
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  };

  // making the api call to get all movies
  public getAllMovies(): Observable<any> {

    // get token from local storage
    const token = localStorage.getItem('token');
    console.log("getAllMovies" + token); // TESTING ONLY

    // return movies
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData),catchError(this.handleError));
  };

  // making the api call to get details on a movie
  public getMovieDetails(movieID: any): Observable<any> {
    console.log(movieID);
    return this.http.post(apiUrl + 'movieID', movieID).pipe(
      catchError(this.handleError)
    )
  };
  
  // making the api call to get info on director
  public getDirector(movie: any): Observable<any> {
    // fetch token from local storage
    const token = localStorage.getItem('token');
    console.log(movie); // TESTING ONLY

    return this.http
      .get(apiUrl + 'movies/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  };

  // making the api call to get info on a genre
  public getGenre(movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(movie); // TESTING ONLY

    return this.http
      .get(apiUrl + 'movies/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  };

  // making api call to get detail of user
  public getUser(userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(userName); //TESTING ONLY

    return this.http
      .get(apiUrl + 'users' + userName , {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  };

  // making the api call to get list of favorite movies for a user
  public getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(token); // TESTING ONLY

    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  };

  // making the api call to add a favorite movie
  public addFavoriteMovie(movieId: any): Observable<any> {
    
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    user.FavoriteMovies.push(movieId); // push to favorite movies
    localStorage.setItem('user', JSON.stringify(user)); // set localStorage user
    
    return this.http
      .post(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // making the api call to delete a movie from user's favorite movies
  public removeFavoriteMovie(movieId: String): Observable<any> {
    
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const index = user.FavoriteMovies.indexOf(movieId);

    console.log(apiUrl + 'users/' + user.Username + '/' + movieId);

    if(index > -1) {
      user.FavoriteMovies.splice(index, 1);
    }

    localStorage.setItem('user', JSON.stringify(user));

    return this.http
      .delete(apiUrl + 'users/' + user.Username + '/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  };

  // making the api call to edit user info
  public updateUser(updateUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userString = JSON.stringify(updateUser);
    const token = localStorage.getItem('token');

    const originalUser = localStorage.getItem('user');

    console.log(token);
    console.log(user.Username);
    console.log(apiUrl + 'users/' + user.Username);
    console.log(userString);

    return this.http
      .put(apiUrl + 'users/' + updateUser.Username, userString, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  };

  // making the api call to delete the user account upon request
  public deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}' );
    const token = localStorage.getItem('token');

    console.log(user.Username); // TESTING ONLY

    return this.http
      .delete(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  };

  public isFavoriteMovie(movieId: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieId) >= 0;

  }

  // api to extract respose data
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

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