import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';


import { TanjunHttp } from './tanjun-http.service';

describe('TanjunRequestService', () => {
  let service: TanjunHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TanjunHttp);
  });

  it('should be created', () => {
    service.setBaseUrl(
      ''
    );

    service.setAuthorizationToken(
      ''
    );

    service.get('selectByCompany', '0001').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        // let errorMessage = error as HttpErrorModel;
        // console.log(errorMessage);
        console.log(error);

      },
    });
  });
});
