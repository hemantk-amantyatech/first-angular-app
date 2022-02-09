import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import {JwtHelperService} from '@auth0/angular-jwt';
import{CanActivate, Router} from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate {
 
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router:Router) { }
  urllogin= "https://localhost:5001/Login";
  urlregis = "https://localhost:5001/UserRegistration"
  loginUser(data: any){
    return this.http.post(this.urllogin,data).pipe(catchError(this.handleError));
  }

  regUser(data:any){
    return this.http.post(this.urlregis,data).pipe(catchError(this.handleError));

  }
  canActivate(){

  const token = localStorage.getItem("jwt");
  if((token) && !this.jwtHelper.isTokenExpired(token)){
   return true;
  }
  this.router.navigate([""])
  return false;
  }  

  private handleError(error: HttpErrorResponse) {
    let errorMessage:string  = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error);
      errorMessage=`Bad network gateway, please try after some time, error code:${error.status}`
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(
      //   `Backend returned code ${error.status}, body was: `, error.error);
      errorMessage='Invalid login credentials'
    }
    console.warn(error.status)
    // Return an observable with a user-facing error message.
    return throwError(errorMessage
      );
  }
}
