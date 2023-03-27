import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = "eyJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJhY2NvdW50LXNlcnZpY2UiLCJzdWIiOiJmZmFhZjJiNy0yY2UyLTRmODEtODU1My1iMjJmNTM0MjFiMmIiLCJleHAiOjE2ODAwMDQ5NDg4MTB9.loFMTiCHkic9XtNqASGV4q7LSIXRL8wgN5-X3R5PM9r0r-Q1Gqog32f-KQOSasW9hh34bxejGypFmDXoSgk2ag";
    
    console.log("testt");

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`        
      }
    });    
    return next.handle(request);
  }
}
