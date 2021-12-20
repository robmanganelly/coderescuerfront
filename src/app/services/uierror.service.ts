import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { EnvelopedResponse } from '../interfaces/httpResponse';
import { DataExtractor } from '../utils/data-extractor';
import { SnackService } from './snack.service';

@Injectable({
  providedIn: 'root'
})
export class UIErrorService {

  constructor(private snackBarService: SnackService) {

  }

  UIErrorNotifier(e: Error): void {
    let message = e.message as string;

    return this.snackBarService.warnSnack(message);
  }

  handleUIError = (errorRes: HttpErrorResponse) => {
    let message = DataExtractor.extractError(errorRes)["message"] as string;
    switch (errorRes['error'].code) {
      case 404:
        message = 'the requested resource was not found on this server!!';
        break;
      case 400:
        message = "invalid input "+ message
        break;
      case 401:
        message = 'Invalid credentials, please check your input or login again';
        break;
      case 403:
        message = 'Invalid credentials, please check your input or create an account';
        break;
      case 429:
        message = 'Too many request, please try to log in in a few minutes';
        break;
      default:
        message = 'unknown error, try in a few minutes'
        break;
    }
    this.snackBarService.warnSnack(`${message}`,3000);
    return throwError(()=>{new Error(message)})
  }



}
