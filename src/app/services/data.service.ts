import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { Lang } from '../interfaces/lang';
import { DataExtractor } from '../utils/data-extractor';
import { StaticPath } from '../utils/static-path';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentLanguageSubject: BehaviorSubject<Lang | null>  = new BehaviorSubject <Lang|null>(null);
  allLanguagesSubject: BehaviorSubject<Lang[] | []>  = new BehaviorSubject <Lang[]|[]>([]);


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

  getProblemsFromLanguage(langId: string){
    return this.httpService.getAllProblemsFromLanguage(langId).pipe(
      map((payload)=>{return DataExtractor.extract(payload);}),



    )
  }


}
