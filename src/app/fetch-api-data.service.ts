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

/**
 * FetchApiDataService is an service component that provides methods for making API requests
 *
 * @example
 * // In a component or service
 * constructor(private apiService: FetchApiDataService) {}
 *
 * // Example usage
 * this.apiService.getAllMovies().subscribe(data => {
 *   // Handle the response data
 * });
 */
export class FetchApiDataService {
  
  // Inject the HttpClient module to the construct or params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {};

  // Making the api call for the user registration endpoint
  /**
   * Making the API call for the user registration endpoint via POST request
   *
   * @param {any} userDetails - The details of the user to be registered. The object will include username, password, email, and birthday
   * @returns {Observable<any>} An observable that emits the registration response.
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  };

  /**
   * Making the api call for user login endpoint via POST request
   *
   * @param {any} userDetails - The details of the user to be registered. The object will include username and password.
   * @returns {Observable<any>} An observable that emits the login response.
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  };

  /**
   * Making the api call to get all movies via GET request
   *
   * @returns {Observable<any>} An observable that emits the response
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
  public getAllMovies(): Observable<any> {

    // get token from local storage
    const token = localStorage.getItem('token');

    // return movies
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({  
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData),catchError(this.handleError));
  };

  /**
   * Making the API call to get movie details 
   *
   * @param {any} movieId - The movieId to be used to fetch the movie details
   * @returns {Observable<any>} An observable that emits the response
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
  public getMovieDetails(movieID: any): Observable<any> {
    console.log(movieID);
    return this.http.post(apiUrl + 'movieID', movieID).pipe(
      catchError(this.handleError)
    )
  };
  
  /**
   * Making the api call to get info on director for the specific movie
   *
   * @param {any} movie - The movie object to be used to get director info from
   * @returns {Observable<any>} An observable that emits the response
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
  public getDirector(movie: any): Observable<any> {
    // fetch token from local storage
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  };

  /**
   * Making the API call to get info on a genre
   *
   * @param {any} movie - The movie object to be used to get genre info from
   * @returns {Observable<any>} An observable that emits the response
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
  public getGenre(movie: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  };

  /**
   * Making API call to get details of user
   *
   * @param {any} userName - The userName to be used to fetch user details
   * @returns {Observable<any>} An observable that emits the response
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
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

  /**
   * Making the API call to get list of favorite movies for a user via GET request to the server
   *
   * @returns {Observable<any>} An observable that emits the response
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
  public getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  };

  /**
   * Making the API call to add a favorite movie
   *
   * @param {any} movieId - The movieId to be added to the user's favorite movie list
   * @returns {Observable<any>} An observable that emits the response
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
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

  /**
   * Making the API call to remove a movie from user's favorite movies via DELETE request
   *
   * @param {string} movieId - The movieId to be added to the user's favorite movie list
   * @returns {Observable<any>} An observable that emits the response
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
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

  /**
   * Making the API call to update user info
   *
   * @param {any} updateUser - The user object to be used that will updated the corresponding user object in the database
   * @returns {Observable<any>} An observable that emits the updateUser response.
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
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

  /**
   * Making the API call to remove the user account. user from localStorage will be used to
   * fetch the user info
   *
   * @returns {Observable<any>} An observable that emits the delete user response.
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
  public deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}' );
    const token = localStorage.getItem('token');

    return this.http
      .delete(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  };

  /**
   * Making the API call to check whether a movie was flagged as favorite by the user
   *
   * @param {any} movieId - ID of the movie that will be used to check against user.FavoriteMovies
   * @returns {boolean} - to indicate whether the movieId is in the user.FavoriteMovies list
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
  public isFavoriteMovie(movieId: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieId) >= 0;

  }

   /**
   * API to extract response data
   *
   * @param {any} res - The the response to be used to extract the body from
   * @returns {boolean} - to indicate whether the movieId is in the user.FavoriteMovies list
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * API call to handleError
   *
   * @param {any} res - The the response to be used to extract the body from
   * @returns {boolean} - to indicate whether the movieId is in the user.FavoriteMovies list
   * 
   * @throws {Error} If there is an issue with the user registration process on the API.
   */
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