import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { Problem } from '../interfaces/problem';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProbByLangIdResolver implements Resolve<Observable<EnvelopedResponse<Problem[]>>> {

  constructor(private http: HttpService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EnvelopedResponse<Problem[]>> {
    return this.http.getAllProblemsFromLanguage(route.params['id']);
  }
}
