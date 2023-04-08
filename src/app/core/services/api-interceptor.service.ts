import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let token = "eyJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJhY2NvdW50LXNlcnZpY2UiLCJzdWIiOiJjNTM5ZmE2Mi1hZjM3LTQ2NDAtYTRiZi0xYTc2NzU3ZjQ5ZTciLCJleHAiOjE2ODEwNTMyMTk2OTh9.EzgT_-oujq1D1bWmO8wSuNvMRd8S2YXi8NYWVcMduS8KyhT8GrR-QAxIzjxSAdYnsusuZPD4CiablX5n_odHNg"

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`        
      }
    });    
    return next.handle(request);
  }
}
