import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { Lang } from '../interfaces/lang';
import { Problem, ProblemSeed } from '../interfaces/problem';
import { LikeStateSolution, Solution } from '../interfaces/solution';
import { User } from '../interfaces/users';
import { UserConstructor } from '../utils/userConstructor';
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

  postLanguage(payload: Lang): Observable<EnvelopedResponse<string>>{
    return this.http.post<EnvelopedResponse<string>>(
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

  postNewUserSignUp(username: string, email: string, password: string): Observable<EnvelopedResponse<string>>{
    return this.http.post<EnvelopedResponse<string>>(
      `${environment.apiUrl}/session/new`,{username, email, password}
    );
  }

  userLogin(email:string, password: string): Observable<EnvelopedResponse<string>>{
    return this.http.post<EnvelopedResponse<string>>(
      `${environment.apiUrl}/session/login`,{email, password}
    );
  }

  getCurrentLoggedUser(token: string): Observable<EnvelopedResponse<User>>{
    return this.http.get<EnvelopedResponse<User>>(
      `${environment.apiUrl}/users/profile`,
      { responseType: 'json', observe: 'body', headers: new HttpHeaders({ Authorization: `Bearer ${token}`}) }
    );
  }

  manageFavorites(favorite: string, action:string, source: string):Observable<EnvelopedResponse<string[]>>{
    if(!["problems","solutions"].includes(source) || !["add","remove"].includes(action)){
      throw new Error('incorrect values for either source or action');
    }
    const options = {favorite, action, source};
    return this.http.patch<EnvelopedResponse<string[]>>(
      `${environment.apiUrl}/users/favorites`,{},{
        params: new HttpParams({fromObject:options})})
  }

  manageLikeState(item:string, state:number):Observable<EnvelopedResponse<LikeStateSolution>>{
    return this.http.patch<EnvelopedResponse<LikeStateSolution>>(
      `${environment.apiUrl}/solutions/${item}`,{},{
        params: new HttpParams({fromObject:{state}})}
    )
  }

  updateProfile(seed: {user?:string, photo?: string}){
    return this.http.patch<EnvelopedResponse<User>>(
      `${environment.apiUrl}/users/profile/edition`,
      this.formDataParser.generate(seed), {observe: 'body'}
    );
  }

}
