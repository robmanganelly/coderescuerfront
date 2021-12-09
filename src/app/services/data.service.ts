import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { Lang } from '../interfaces/lang';
import { Problem, ProblemSeed } from '../interfaces/problem';
import { DataExtractor } from '../utils/data-extractor';
import { StaticPath } from '../utils/static-path';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentLanguageSubject: BehaviorSubject<Lang | null>  = new BehaviorSubject <Lang|null>(null);
  allLanguagesSubject: BehaviorSubject<Lang[] | []>  = new BehaviorSubject <Lang[]|[]>([]);
  currentLanguageProblemsSubject: BehaviorSubject<Problem[] | []> = new BehaviorSubject<Problem[] | []>([])


  constructor(private httpService: HttpService) { }

  getLanguages(){
    return this.httpService.getAllLanguages().pipe(
      // map((dataArray: EnvelopedResponse<Lang[]>)=>{return dataArray.data.data}),
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
      map((payload)=>{return DataExtractor.extract(payload);}),
      tap((data)=>{this.currentLanguageProblemsSubject.next(data); })
    )
  }

  createProblem(langId: string, payload: ProblemSeed): Observable<Problem[]>{
    return this.httpService.postProblemOnLanguage(langId,payload).pipe(
      map(response=>{return DataExtractor.extract(response)}),
      mergeMap((data)=>{ return this.getProblemsFromLanguage(data.language as string); })
    )
  }


}
