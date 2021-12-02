import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { Lang } from '../interfaces/lang';
import {environment} from './../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getAllLanguages(): Observable<EnvelopedResponse<Lang[]>>{
    return this.http.get<EnvelopedResponse<Lang[]>>(`${environment.apiUrl}/languages`)
  }

}
