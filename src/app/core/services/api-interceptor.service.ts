import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = "eyJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJhY2NvdW50LXNlcnZpY2UiLCJzdWIiOiJmN2U4MzNkOS0wZGZmLTQ5OWMtZjhjYy1iODU0ZjYwZmE4NmQiLCJleHAiOjE2ODExNTYzNTM4NzB9.Jk_qI_1qO2FZ3TF7Y2tDDers0R9vwyzpbdrLX9vs-x5GFBXBParPcwdnW3UpzRPgf-7Y62Wk77tA_9akI1G_Qg";
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`        
      }
    });    
    return next.handle(request);
  }
}
