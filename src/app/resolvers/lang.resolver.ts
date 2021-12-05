import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Lang } from '../interfaces/lang';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class LangResolver implements Resolve<Observable<Lang[]> | Promise<Lang[]> | Lang[]> {

  constructor(private dataService: DataService){};

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lang[]> {
    // return of(true);
    return this.dataService.getLanguages();
  }
}
