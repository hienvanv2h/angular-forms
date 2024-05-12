import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private _url = 'http://localhost:3000/enroll';
  constructor(private _http: HttpClient) {}

  register(user: any) {
    // returns an observable of the response
    return this._http
      .post<any>(this._url, user)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
