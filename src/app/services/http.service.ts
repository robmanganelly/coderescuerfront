import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { Lang } from '../interfaces/lang';
import { Problem, ProblemSeed } from '../interfaces/problem';
import { Solution } from '../interfaces/solution';
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

  getAllProblemsFromLanguage(
    languageId:string,
    options?:{[k:string]:string|number|boolean}
  ): Observable<EnvelopedResponse<Problem[]>>{

    const opt = options?{params: new HttpParams({fromObject:options})}: {};

    return this.http.get<EnvelopedResponse<Problem[]>>(`${environment.apiUrl}/problems/${languageId}`,opt);
  }

  postProblemOnLanguage(languageId: string,payload: ProblemSeed): Observable<EnvelopedResponse<Problem>>{
    return this.http.post<EnvelopedResponse<Problem>>(
      `${environment.apiUrl}/problems/${languageId}`,
      payload
    )
  }

  getCommentsBySolutionId(solutionId: string): Observable<EnvelopedResponse<Comment[]>>{
    return this.http.get<EnvelopedResponse<Comment[]>>(`${environment.apiUrl}/comments/${solutionId}`);
  }

  getSolutionsByProblemId(problemId: string):Observable<EnvelopedResponse<Solution[]>>{
    return this.http.get<EnvelopedResponse<Solution[]>>(`${environment.apiUrl}/solutions/${problemId}`);
  }

  postCommentBySolutionId(solutionId: string, text: string): Observable<EnvelopedResponse<Comment>>{
    return this.http.post<EnvelopedResponse<Comment>>(
      `${environment.apiUrl}/comments/${solutionId}`,{text},{observe: "body"}
      )}

  postSolutionByProblemId(problemId: string, solution: string): Observable<EnvelopedResponse<Solution>>{
    return this.http.post<EnvelopedResponse<Solution>>(
      `${environment.apiUrl}/solutions/${problemId}`,{solution},{observe: "body"}
    );
  }

}
