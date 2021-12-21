import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {exhaustMap, take} from "rxjs/operators";
import { DataService } from "../services/data.service";
import { UserConstructor } from "../utils/userConstructor";

@Injectable()
export class SetTokenInterceptorService implements  HttpInterceptor{

  constructor(
    private dataService: DataService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @ts-ignore
    return this.dataService.userBehaviorSubject.pipe(take(1),
      exhaustMap(
        (userData: UserConstructor)=>{
          if (!userData){
            return next.handle(req)
          }
          const modifiedRequest = req.clone({
              headers: new HttpHeaders({
              Authorization: `Bearer ${userData.token}`
            })
          })
          return next.handle(modifiedRequest)
        }
      ))
  }

}
