import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let token = "eyJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJhY2NvdW50LXNlcnZpY2UiLCJzdWIiOiIzNWFlZjYzYy01M2ZkLTRkYjYtZDA4YS1lNDRkNmEwNTJjNmEiLCJleHAiOjE2ODA4ODI5OTkyOTd9.pJK8J6PIauQ9AEhhN8pIcuupv6nG0Hpdt2Q-1-PfZvWjSltaet0TW0qaJIS6uCGjvdsRBquGCIMnwstqljUQJg"

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`        
      }
    });    
    return next.handle(request);
  }
}
