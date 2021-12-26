import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticPathGeneratorService {

  apiUrl: string = environment.apiUrl;

  constructor(){}

  generatePath(filePath: string): string{
    return new RegExp(this.apiUrl).test(filePath)? filePath: `${this.apiUrl}/${filePath}`;
  }

}
