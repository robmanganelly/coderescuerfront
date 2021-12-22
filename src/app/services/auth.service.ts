import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpService} from "./http.service";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {DataService} from "./data.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { User } from "../interfaces/users";
import { UIErrorService } from "./uierror.service";
import { DataExtractor } from "../utils/data-extractor";
import { EnvelopedResponse } from "../interfaces/httpResponse";
import { UserConstructor } from "../utils/userConstructor";

@Injectable({providedIn: 'root'})
export class AuthService {

    private tokenExpirationTimer: any;


    constructor(
      private dataService: DataService,
      private errorManager: UIErrorService,
      private router: Router,
      private httpService: HttpService) {
    }

    signUp(username: string, email: string, password: string): Observable<User> {
        return this.httpService.postNewUserSignUp(username,email,password).pipe(
            catchError(this.errorManager.handleUIError),
            map(envRes=>{return DataExtractor.extract(envRes) }),
            switchMap((token) => {
                this.autologout(2*3600*1000)  // auto logout on 2 hours
                return this.loadUserData(token);
            })
        )
    }

    login(email: string, password: string): Observable<User> {
        return this.httpService.userLogin(email,password).pipe(
            catchError(this.errorManager.handleUIError),
            map((response)=>{
              return DataExtractor.extract(response)}),
            switchMap((token) => {
                this.autologout(2*3600*1000)
                return this.loadUserData(token);
            })
        )
    }

    logout() {
        // cleaning subjects...
        this.dataService.userBehaviorSubject.next(null);

        localStorage.removeItem('USER_DATA');
        localStorage.clear(); // ??
        if (this.tokenExpirationTimer){
            clearInterval(this.tokenExpirationTimer);
        }
    }

    autologin() {
        const loggedUser = this.getLoadedUser();
        if (!loggedUser) return;

        if (!loggedUser.token) return;

        if (loggedUser.token) {
            this.autologout(new Date(loggedUser.tokenExpiration).getTime()-Date.now())
            this.dataService.userBehaviorSubject.next(loggedUser);
        }

    }


    autologout(countdown: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, countdown);
    }

    loadUserData(token?: string): Observable<User> {
        if (!token){
            token = JSON.parse(localStorage.getItem('USER_DATA') || 'null').token;
        }
        if (!token){ throw new Error('dev error: failed on grab token')}; // remove after testing
        return this.httpService.getCurrentLoggedUser(token as string).pipe(
          tap(this.writeLocally(token)),
          map(response=>{return DataExtractor.extract(response)})
        );
    }

    writeLocally(token: string){
        if (!token){
            throw Error('cant write without token')
        }
        return (userData: EnvelopedResponse<User>) => {
            const {_id, username, email, photo, active, favProblems, favSolutions} = DataExtractor.extract(userData);
            const _tokenExpiration = new Date(Date.now() + 2*3600*1000)
            const loadedUser = new UserConstructor(
              _id as string,token,_tokenExpiration,photo,username,email,active,favProblems,favSolutions)
            localStorage.setItem('USER_DATA', JSON.stringify(loadedUser));
            this.dataService.userBehaviorSubject.next(loadedUser);
        }
    }

    getLoadedUser(){
        const loadedLocalStorage = localStorage.getItem('USER_DATA') || 'null';
        const user =  JSON.parse(loadedLocalStorage);

        if (!user){ return null; }
        const { _token, _tokenExpiration, _id, email, username, photo , active, favProblems, favSolutions} = user;
        return new UserConstructor(
          _id as string, _token as string, _tokenExpiration as Date, photo,
          username, email, active, favProblems, favSolutions
          );
    }



}
