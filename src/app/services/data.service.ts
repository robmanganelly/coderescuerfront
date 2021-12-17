import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, mergeMap, Observable, Subject, tap } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { Lang } from '../interfaces/lang';
import { Problem, ProblemSeed } from '../interfaces/problem';
import { Solution } from '../interfaces/solution';
import { DataExtractor } from '../utils/data-extractor';
import { StaticPath } from '../utils/static-path';
import { HttpService } from './http.service';
import { UIErrorService } from './uierror.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentLanguageSubject: BehaviorSubject<Lang | null>  = new BehaviorSubject <Lang|null>(null);
  allLanguagesSubject: BehaviorSubject<Lang[] | []>  = new BehaviorSubject <Lang[]|[]>([]);
  problemsOnSelectedLanguageSubject: BehaviorSubject<Problem[] | []> = new BehaviorSubject<Problem[] | []>([])

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
      tap((d)=>{this.getLanguages().subscribe((lang: Lang[])=>{ this.allLanguagesSubject.next(lang)})})
    );
  }

  // getProblemsFromLanguage(langId: string){
  //   return this.httpService.getAllProblemsFromLanguage(langId).pipe(
  //     map((payload)=>{return DataExtractor.extract(payload);}),
  //   )
  // }

  getProblemsFromLanguage(langId: string): Observable<Problem[]>{
    return this.httpService.getAllProblemsFromLanguage(langId).pipe(
      // tap((d)=>{console.log('raw'); console.log(d)}),
      catchError(this.uiErrorHandler.handleUIError),
      map((payload)=>{return DataExtractor.extract(payload);}),
      tap((data)=>{this.problemsOnSelectedLanguageSubject.next(data); })
    )
  }

  createProblem(langId: string, payload: ProblemSeed): Observable<Problem[]>{
    return this.httpService.postProblemOnLanguage(langId,payload).pipe(
      catchError(this.uiErrorHandler.handleUIError),
      map(response=>{return DataExtractor.extract(response)}),
      mergeMap((data)=>{ return this.getProblemsFromLanguage(langId); })
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

  postSolution(problemId: string, text: string): Observable<Solution>{
    return this.httpService.postSolutionByProblemId(problemId, text).pipe(
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


}
