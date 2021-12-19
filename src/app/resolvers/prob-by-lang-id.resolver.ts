import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { Problem } from '../interfaces/problem';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProbByLangIdResolver implements Resolve<Observable<Problem[]>> {

  constructor(private dataService: DataService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Problem[]> {
    return this.dataService.getProblemsFromLanguage(route.params['id'],{skip:1,limit:10}) as Observable<Problem[]>;
  }
}
