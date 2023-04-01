import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = "eyJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJhY2NvdW50LXNlcnZpY2UiLCJzdWIiOiIwMzBhMmNlOS1mZWM1LTRjNTQtYjdkOS0zNmE2YzljYTNmMGUiLCJleHAiOjE2ODAxODczMjUzNTN9.EvFjepfTfadOER6qvoQomc0KWSNIcJggPf8wJaDrhsIHKGaQwZNFrkjbkf_Ke3m1_Br7EgFMN7rRt7WGI0Z_vA";
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`        
      }
    });    
    return next.handle(request);
  }
}
