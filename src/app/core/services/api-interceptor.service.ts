import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = "eyJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJhY2NvdW50LXNlcnZpY2UiLCJzdWIiOiJhN2ZiMjg4YS1kMWVjLTRiMDYtYjlkZC0xNWRlMjRhMzk1YWMiLCJleHAiOjE2ODAxNzExNzQ0NzV9.soY0RuQeCt4Xf3PquvDdtLSzf64bQUq4JHCm9O7uWFTV1oA7ocgzrC60iIKDoxbZQIRY-tnu0SoJbtGso0jKCA";
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`        
      }
    });    
    return next.handle(request);
  }
}
