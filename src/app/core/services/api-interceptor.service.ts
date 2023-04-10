import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = "eyJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJhY2NvdW50LXNlcnZpY2UiLCJzdWIiOiJjMzk4ZWZmNi03NDIzLTRiYmMtY2VkZC05YzU1OWQ3ZDdiNzYiLCJleHAiOjE2ODEyMjkzMTU4NjV9.k1LwnQM-6e6JL9YJzvQOpJTYmF6LGu6vvXSwVaZU19F-L1tSBIu8Oee1Pll5VzjuHHDRQxiyuooV9j5HdMlXSg";
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`        
      }
    });    
    return next.handle(request);
  }
}
