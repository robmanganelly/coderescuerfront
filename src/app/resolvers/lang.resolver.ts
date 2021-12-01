import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { Lang } from '../interfaces/lang';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class LangResolver implements Resolve<Observable<EnvelopedResponse<Lang[]>> | Promise<EnvelopedResponse<Lang[]>> | EnvelopedResponse<Lang[]>> {

  constructor(private httpService: HttpService){};

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EnvelopedResponse<Lang[]>> {
    // return of(true);
    return this.httpService.getAllLanguages();
  }
}
