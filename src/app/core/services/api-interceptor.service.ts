import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let token = "eyJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJhY2NvdW50LXNlcnZpY2UiLCJzdWIiOiJmN2U4MzNkOS0wZGZmLTQ5OWMtZjhjYy1iODU0ZjYwZmE4NmQiLCJleHAiOjE2ODEwNjU1OTUzMzB9.4rTWBHmD8dYaG92T1cRYeHeEqho8AO5CJc4WpylVuSEPHBledKA-74fJnDlj6iBFX8PSLqiE45MYGuSgi5CBmQ"

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`        
      }
    });    
    return next.handle(request);
  }
}
