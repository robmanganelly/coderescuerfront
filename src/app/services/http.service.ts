import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { Lang } from '../interfaces/lang';

const HTTP_DEV_SERVER = "http://localhost:3000/api/v1"

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getAllLanguages(): Observable<EnvelopedResponse<Lang[]>>{
    return this.http.get<EnvelopedResponse<Lang[]>>(`${HTTP_DEV_SERVER}/languages`)
  }

}
