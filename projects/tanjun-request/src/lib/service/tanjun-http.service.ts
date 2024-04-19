import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
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
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
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
    this.httpHeaders = this.httpHeaders.set('Authorization', `Bearer ${token}`);
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
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError.bind(this))); // <-- Still working on this deprecated method
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
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError.bind(this))); // <-- Still working on this deprecated method
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
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError.bind(this))); // <-- Still working on this deprecated method
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
        headers: this.httpHeaders,
        params,
      })
      .pipe(catchError(this.handleError.bind(this))); // <-- Still working on this deprecated method
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
        headers: this.httpHeaders,
        responseType: 'blob' as 'json',
        params,
      })
      .pipe(catchError(this.handleError.bind(this))); // <-- Still working on this deprecated method
  }

  /**
   * Service utility methods
   * /
  /**
   * @param error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage: HttpErrorModel = {
      code: error.status,
      message: error.message,
    };
    return throwError(errorMessage);
  }

  buildCompleteURL(url: string, params?: any): string {
    // Check if _baseUrl ends with a slash
    if (this._baseUrl && !this._baseUrl.endsWith('/')) {
      this._baseUrl += '/';
    }

    // Check if url starts with a slash
    if (url.startsWith('/')) {
      url = url.substring(1);
    }

    // Check if url ends with a slash
    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }


    let apiUrl = this._baseUrl + url;
    // Add parameters to the URL
    if (params) {
      // If single parameter
      if (typeof params === 'string') {
        // Check if parameter starts with a slash
        if (params.startsWith('/')) {
          params = params.substring(1);
        }


        apiUrl += `/${params}`;
      } else {
        // If multiple parameters
        for (let key in params) {
          if (params.hasOwnProperty(key)) {
            // Check if parameter starts with a slash
            if (params[key].startsWith('/')) {
              params[key] = params[key].substring(1);
            }
            apiUrl += `/${params[key]}`;
          }
        }
      }
    }

    console.log(apiUrl);

    return apiUrl;
  }
}
