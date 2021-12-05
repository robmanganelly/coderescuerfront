import { environment } from "src/environments/environment"

export class StaticPath {

  static apiUrl: string = environment.apiUrl;

  constructor(){}

  static generatePath(filePath: string): string{
    if (new RegExp(this.apiUrl).test(filePath)){
      return filePath;
    }else return `${this.apiUrl}/${filePath}`;
  }
}
