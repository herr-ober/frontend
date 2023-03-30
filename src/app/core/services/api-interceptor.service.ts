import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = "eyJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJhY2NvdW50LXNlcnZpY2UiLCJzdWIiOiIzZjlhNmQzOS1hZDZjLTRhNTEtYTBjNC0wZDE5NDE5NWRkMjQiLCJleHAiOjE2ODAxNzEwOTgyMjZ9.tF3Uvs07Git8B-mk8BylN8Ev6WJZjKzm_FYVJYL5Ro08H2Zy44Bpu9bAB9o2S5trozXbBjOjcpxRqvVzkLI3ug"

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`        
      }
    });    
    return next.handle(request);
  }
}
