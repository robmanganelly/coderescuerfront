import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { Lang } from '../interfaces/lang';
import { Problem } from '../interfaces/problem';
import {environment} from './../../environments/environment'
import { FormDataParserService } from './form-data-parser.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private formDataParser: FormDataParserService
    ) {}

  getAllLanguages(): Observable<EnvelopedResponse<Lang[]>>{
    return this.http.get<EnvelopedResponse<Lang[]>>(`${environment.apiUrl}/languages`)
  }

  postLanguage(payload: Lang): Observable<EnvelopedResponse<String>>{
    return this.http.post<EnvelopedResponse<String>>(
      `${environment.apiUrl}/languages`,
      this.formDataParser.generate(payload),
      {observe: "body"})
  }

  getAllProblemsFromLanguage(languageId:string): Observable<EnvelopedResponse<Problem[]>>{
    return this.http.get<EnvelopedResponse<Problem[]>>(`${environment.apiUrl}/problems/${languageId}`)
  }

}
