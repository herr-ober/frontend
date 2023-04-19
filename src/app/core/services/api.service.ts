import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private readonly baseUrl: string = environment.api.baseUrl;

    constructor(private http: HttpClient) {
    }

    /* General Get-Function */
    doGetRequest<T>(url: string): Promise<T> {
        const request: Observable<T> = this.http.get<T>(`${this.baseUrl}` + url, {responseType: 'json'});
        return firstValueFrom(request);
    }


    /* General Post-Function */
    doPostRequest<T>(url: string, body: object): Promise<T> {
        const request: Observable<T> = this.http.post<T>(`${this.baseUrl}` + url, body, {responseType: 'json'});
        return firstValueFrom(request);
    }


    /* General Delete-Function */
    doDeleteRequest<T>(url: string, body: object): Promise<T> {
        const request: Observable<T> = this.http.delete<T>(`${this.baseUrl}` + url, {body, responseType: 'json'});
        return firstValueFrom(request);
    }


    /* General Patch-Function */
    doPatchRequest<T>(url: string, body: object): Promise<T> {
        const request: Observable<T> = this.http.patch<T>(`${this.baseUrl}` + url, body);
        return firstValueFrom(request);
    }
}
