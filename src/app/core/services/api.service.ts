import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private readonly baseUrl: string = environment.api.baseUrl;

  constructor(private http: HttpClient) {
  }

  /*
    HIER DIE 4 API SERVICES
  */
}
