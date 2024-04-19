import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TanjunHttp {
  /**
   * Service properties
   */
  // Authorization token
  private _token: string | null = null;
  // Base URL
  private _baseUrl: string | null = null;

  // Options for sending form data
  httpOptionsJson = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  // Options for blob response
  httpOptionsBlob = new HttpHeaders({
    responseType: 'blob',
    observe: 'response',
  });

  /**
   * Constructor
   * /
  /**
   *
   * @param _http HttpClient
   */
  constructor(private _http: HttpClient) {}

  /**
   * Configure properties
   * /
  /**
   *
   * @param token
   * Set the authorization token for the request
   */
  setAuthorizationToken(token: string) {
    this.httpOptionsJson = this.httpOptionsJson.set(
      'Authorization',
      `Bearer ${token}`
    );
    this.httpOptionsBlob = this.httpOptionsBlob.set(
      'Authorization',
      `Bearer ${token}`
    );
  }

  /**
   * Request methods
   * /
  /**
   *
   * @param baseUrl
   * Set the base URL for the request
   */
  setBaseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  /**
   *
   * @param url
   * @param params
   * @returns
   * Get request
   */
  get<T>(url: string, params?: any): Observable<T> {
    return this._http
      .get<T>(this.buildCompleteURL(url, params), {
        headers: this.httpOptionsJson,
      })
      .pipe(catchError((error) => throwError(this.handleError(error)))); // <-- Still working on this deprecated method
  }

  /**
   *
   * @param url
   * @param body
   * @returns
   * Post request
   */
  post<T>(url: string, body: any): Observable<T> {
    return this._http
      .post<T>(this.buildCompleteURL(url), body, {
        headers: this.httpOptionsJson,
      })
      .pipe(catchError((error) => throwError(this.handleError(error)))); // <-- Still working on this deprecated method
  }

  /**
   *
   * @param url
   * @param body
   * @returns
   * Put request
   */
  put<T>(url: string, body: any): Observable<T> {
    return this._http
      .put<T>(this.buildCompleteURL(url), body, {
        headers: this.httpOptionsJson,
      })
      .pipe(catchError((error) => throwError(this.handleError(error)))); // <-- Still working on this deprecated method
  }

  /**
   *
   * @param url
   * @param params
   * @returns
   * Delete request
   */
  delete<T>(url: string, params: any): Observable<T> {
    return this._http
      .delete<T>(this.buildCompleteURL(url, params), {
        headers: this.httpOptionsJson,
        params,
      })
      .pipe(catchError((error) => throwError(this.handleError(error)))); // <-- Still working on this deprecated method
  }

  /**
   * Blob request
   */

  /**
   * @param url
   * @param params
   * @returns
   * Get request for blob
   */
  getBlob(url: string, params: any): Observable<any> {
    return this._http
      .get(this.buildCompleteURL(url, params), {
        headers: this.httpOptionsBlob,
        responseType: 'blob',
        params,
      })
      .pipe(catchError((error) => throwError(this.handleError(error)))); // <-- Still working on this deprecated method
  }

  /**
   * Service utility methods
   * /
  /**
   * @param error
   */
  private handleError(error: Response | any): HttpErrorModel {
    let errorMessage: HttpErrorModel = {
      code: error.status,
      message: error.message,
    };

    return errorMessage;
  }

  buildCompleteURL(url: string, params?: any): string {
    let apiUrl = this._baseUrl + url;
    // Add parameters to the URL
    if (params) {
      // If single parameter
      if (typeof params === 'string') {
        apiUrl += `/${params}`;
      } else {
        // If multiple parameters
        for (let key in params) {
          if (params.hasOwnProperty(key)) {
            apiUrl += `/${params[key]}`;
          }
        }
      }
    }
    return apiUrl;
  }
}
