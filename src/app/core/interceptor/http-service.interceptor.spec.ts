import { TestBed } from '@angular/core/testing';

import { HttpInterceptorService } from './http-service.interceptor';

describe('InterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpInterceptorService
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpInterceptorService = TestBed.inject(HttpInterceptorService);
    expect(interceptor).toBeTruthy();
  });
});
