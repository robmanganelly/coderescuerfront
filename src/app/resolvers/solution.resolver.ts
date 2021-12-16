import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Solution } from '../interfaces/solution';
import { DataService } from '../services/data.service';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class SolutionResolver implements Resolve<Observable<Solution[]>> {

  constructor(private dataService: DataService){}


  //must resolve all comments for the current soltion and the solution itself
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Solution[]> {
    console.log(state.url);
    const activeProblem = state.url.split('/')[2];
    return this.dataService.getSolutionsFromProblem(activeProblem as string);
  }
}
