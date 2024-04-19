import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

import { TanjunHttp } from './tanjun-http.service';
import { HttpErrorModel } from '../models/http-error.model';

describe('TanjunRequestService', () => {
  let service: TanjunHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Import HttpClientModule here
    });
    service = TestBed.inject(TanjunHttp);
  });

  it('should be created', () => {
    service.setBaseUrl(
      'https://5226b63f45414e0eb79fecad4e524308.api.mockbin.io/'
    );

    service.get('').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        let errorMessage = error as HttpErrorModel;
        console.log(errorMessage);
      },
    });
  });
});
