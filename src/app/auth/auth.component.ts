import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subscription, throwError} from "rxjs";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import { SnackService } from '../services/snack.service';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
    isLogin = true;
    isRequesting = false;
    hidePass = true;  // for implementing visibility icon on password
    retrySubmit = false;
    bannerMessage = "";
    subscription: Subscription = new Subscription();

    authForm = new FormGroup({
        username: new FormControl(null),
        email: new FormControl(null, [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl(null, [
            Validators.required,
            Validators.pattern(/^\S{12,}$/)]
        ),
        passwordRepeat: new FormControl(null)
    }, {validators: this.comparePasswordsValidator().bind(this)})

    constructor(
        private snackBarService: SnackService,
        private router: Router,
        private authService: AuthService,
        private location: Location
    ) {
    }

    ngOnInit(): void {
        this.authService.autologin()
    }

    onSubmit(): void {
        this.isRequesting = true;

        if (this.isLogin) {
            this.onLogin()
        } else {
            this.onSignUp()
        }
        this.authForm.reset()
    }

    onLogin() {
        if (!this.authForm.valid) {
            return this.snackBarService.warnSnack('invalid form, can not submit');
        }
        this.isRequesting = true;
        this.subscription = this.authService.login(
            this.authForm.value.email,
            this.authForm.value.password
        ).pipe().subscribe({
            next: (user) => {
              this.snackBarService.successSnack(`Hi ${user.username}, welcome!`)
              this.location.back();
              // this.router.navigate(['index']);
            },
            error:(error)=>{
              this.bannerMessage = error.message;
              this.retrySubmit = true;
              this.isRequesting = false;
            }
          })
    }

    onSignUp() {
        this.isLogin = false;
        if (!this.authForm.valid) {
            return alert('invalid form todo: switch to dialog');
        }
        this.isRequesting = true;
        this.subscription = this.authService.signUp(
            this.authForm.value.username,
            this.authForm.value.email,
            this.authForm.value.password
        ).pipe(
            tap((user) => {})
        ).subscribe(
            (user) => {
              this.snackBarService.successSnack(`Hi ${user.username}, welcome!`)
              this.location.back();
              // this.router.navigate(['index']);
            }
        )

    }

    goPrevious(){
      this.location.back();
    }

    // ui methods
    changeTab(): void {
        this.isLogin = !this.isLogin
        this.retrySubmit = false;
        if (this.isLogin) {
            this.authForm.controls['username'].clearValidators();
            this.authForm.controls['passwordRepeat'].clearValidators();
        } else {
            this.authForm.controls['username'].setValidators([
                Validators.required,
                Validators.pattern(/\w{5,50}/)
            ])
            this.authForm.controls['passwordRepeat'].setValidators([
                Validators.required,
                Validators.pattern(/^\S{12,}$/)
            ])
        }
        this.authForm.reset();
    }

    updateUIonError() {
        return (e: string) => {
            this.bannerMessage = e
            this.isRequesting = false;
            this.retrySubmit = true;
        }
    }

    //custom form validators
    comparePasswordsValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (this.isLogin) {
                return null
            } else if (control.get('password')?.value !== control.get('passwordRepeat')?.value) {
                return {'passwordDoesNotMatchError': true}
            }
            return null
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
