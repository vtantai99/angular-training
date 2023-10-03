import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../store';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiUrl = 'https://movie0706.cybersoft.edu.vn/api';
    const accessToken = this.store.selectSnapshot(AuthState.accessToken);
    const apiRequest = request.clone({
      url: `${apiUrl}${request.url}`,
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
    });
    return next.handle(apiRequest);
  }
}
