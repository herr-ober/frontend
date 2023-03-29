import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private readonly baseUrl: string = environment.api.baseUrl;

  constructor(private http: HttpClient) {
  }

  /* General Get-Function */
  doGetRequest<T>(url: string): Promise<T> {
    const request: Observable<Object> = this.http.get(`${this.baseUrl}` + url, {responseType: 'json'});
    return firstValueFrom(request) as Promise<T>
  }

  
  /* General Post-Function */
  doPostRequest<T> (url: string, body: object): Promise<T> {
    const request: Observable<Object> = this.http.post(`${this.baseUrl}` + url, body, {responseType: 'json'})
    return firstValueFrom(request) as Promise<T>
  }


  /* General Delete-Function */
  doDeleteRequest<T> (url: string, body: object): Promise<T> {
    const request: Observable<Object> = this.http.delete(`${this.baseUrl}` + url, {body, responseType: 'json'})
    return firstValueFrom(request) as Promise<T>
  }


  /* General Patch-Function */
  doPatchRequest<T> (url: string, body: object): Promise<T> {
    const request: Observable<Object> = this.http.patch(`${this.baseUrl}` + url, body)
    return firstValueFrom(request) as Promise<T>
  }
}
