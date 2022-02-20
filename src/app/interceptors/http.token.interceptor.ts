import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  private apiKey = 'e560768469f6f03abdf5140f8ab93cae';
  private token =
    'dc3a4bc44701b0ef285421ae03eb30c8546593871e5afc7c17749e647813db29';

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const request = req.clone({
      setHeaders: headersConfig,
      setParams: { key: this.apiKey, token: this.token },
    });
    return next.handle(request);
  }
}
