import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, mergeMap, Observable, of, Subject, take, tap } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { Generic } from '../interfaces/generic';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { Lang } from '../interfaces/lang';
import { Problem, ProblemSeed } from '../interfaces/problem';
import { Solution } from '../interfaces/solution';
import { User } from '../interfaces/users';
import { DataExtractor } from '../utils/data-extractor';
import { StaticPath } from '../utils/static-path';
import { UserConstructor } from '../utils/userConstructor';
import { HttpService } from './http.service';
import { UIErrorService } from './uierror.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userBehaviorSubject: BehaviorSubject<UserConstructor| null > = new BehaviorSubject<UserConstructor|null>(null);
  currentLanguageSubject: BehaviorSubject<Lang | null>  = new BehaviorSubject <Lang|null>(null);
  allLanguagesSubject: BehaviorSubject<Lang[] | []>  = new BehaviorSubject <Lang[]|[]>([]);
  problemsOnSelectedLanguageSubject: BehaviorSubject<Problem[] | []> = new BehaviorSubject<Problem[] | []>([])
  favoritesSubject: BehaviorSubject<{favProblems?:string[],favSolutions?:string[],}> = new BehaviorSubject({});

  constructor(
    private uiErrorHandler: UIErrorService,
    private httpService: HttpService) { }

  getLanguages(){
    return this.httpService.getAllLanguages().pipe(
      // map((dataArray: EnvelopedResponse<Lang[]>)=>{return dataArray.data.data}),
      catchError(this.uiErrorHandler.handleUIError),
      map((d)=>{return  DataExtractor.extract(d) } ),
      map((lang: Lang[])=>{
        // lang.img = StaticPath.generatePath(lang.img);
        lang.forEach(element => {
          element.img = StaticPath.generatePath(element.img);
        });
        return lang
       }),
       tap((lang: Lang[])=>{ this.allLanguagesSubject.next(lang)})
      );
  }

  postLanguage(payload: Lang){
    return this.httpService.postLanguage(payload).pipe(
      catchError(this.uiErrorHandler.handleUIError),
      mergeMap(
        (d)=>{
          return this.getLanguages().pipe(
            tap((lang: Lang[])=>{ this.allLanguagesSubject.next(lang)})
          )
        })
    );
  }

  getProblemsFromLanguage(
    langId: string,
    options?:{[k:string]:string|number|boolean}
  ): Observable<Problem[] | {data: Problem[], meta: Generic} >{
      return this.httpService.getAllProblemsFromLanguage(langId,options).pipe(
        catchError(this.uiErrorHandler.handleUIError),
        map((raw)=>{
          if ((options as Generic)['withMeta']){
            return DataExtractor.extractWithMeta(raw) as {data:Problem[], meta: Generic}
          }else{
            return DataExtractor.extract(raw) as Problem[]
          }
        }),
        tap((data)=>{
          let problems = undefined;
          if((options as Generic)['withMeta']){
            problems = (data as {data: Problem[]}).data;
          }else{
            problems = data
          }
          this.problemsOnSelectedLanguageSubject.next(problems as Problem[]);})
      )
  }

  createProblem(langId: string, payload: ProblemSeed): Observable<Problem[]>{
    return this.httpService.postProblemOnLanguage(langId,payload).pipe(
      catchError(this.uiErrorHandler.handleUIError),
      map(response=>{return DataExtractor.extract(response)}),
      mergeMap((data)=>{ return this.getProblemsFromLanguage(langId,{withMeta:false}) as Observable<Problem[]>; })
    )
  }


  getCommentsFromSolution(solution: string): Observable<Comment[]>{
    return this.httpService.getCommentsBySolutionId(solution).pipe(
      catchError(this.uiErrorHandler.handleUIError),
      map(payload=>{return DataExtractor.extract(payload); })
    );
  }

  getSolutionsFromProblem(problem: string): Observable<Solution[]>{
    return this.httpService.getSolutionsByProblemId(problem).pipe(
      catchError(this.uiErrorHandler.handleUIError),
      map(payload=>{return DataExtractor.extract(payload); })
    );
  }

  postSolution(problemId: string, solution: string): Observable<Solution>{
    return this.httpService.postSolutionByProblemId(problemId, solution).pipe(
      catchError(this.uiErrorHandler.handleUIError),
      map(payload=>{return DataExtractor.extract(payload); })
    )
  }

  postComment(solutionId: string, text:string): Observable<Comment>{
    return this.httpService.postCommentBySolutionId(solutionId, text).pipe(
      catchError(this.uiErrorHandler.handleUIError),
      map(payload=>{return DataExtractor.extract(payload); })
    )
  }

  manageFavorites(favorite: string,action: string,source: string):Observable<string[]>{
    return this.httpService.manageFavorites(favorite,action,source).pipe(
      catchError(this.uiErrorHandler.handleUIError),
      map(payload=>DataExtractor.extract(payload)),
      tap((data)=>{this.favoritesSubject.next(source === "problems"? {favProblems: data}: {favSolutions: data})})
    );
  }

  manageLikeState(item:string, state: number){
    if(-1>state || state>1){ throw new Error(`state ${state} not supported`);}

    return this.httpService.manageLikeState(item,state).pipe(
      catchError(this.uiErrorHandler.handleUIError),
      map(payload=>DataExtractor.extract(payload)),
      tap(data=>{
        if(data.favSolutions){this.favoritesSubject.next({favSolutions:data.favSolutions});}
      })
    )
  }

  updateProfileRaw(seed:{username?:string, photo?:string}):Observable<User>{ // use the authService version instead of this.
    return this.httpService.updateProfile(seed).pipe(
      catchError(this.uiErrorHandler.handleUIError),
      map(payload=>DataExtractor.extract(payload)),
    )
  }

  patchSolutionIfOwner(item: string, solution:string){
    return this.httpService.patchSolution(item,solution).pipe(
      catchError(this.uiErrorHandler.handleUIError),
      map(payload=>DataExtractor.extract(payload)),
    )
  }
}
