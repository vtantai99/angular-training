import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  // constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiUrl = 'https://movie0706.cybersoft.edu.vn/api';
    const apiRequest = request.clone({ url: `${apiUrl}${request.url}` });
    return next.handle(apiRequest);
  }
}
