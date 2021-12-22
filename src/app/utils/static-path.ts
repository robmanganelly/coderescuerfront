import { environment } from "src/environments/environment"

export class StaticPath {

  static  apiUrl: string = environment.apiUrl;

  constructor(){}

  static generatePath(filePath: string): string{
    return RegExp(StaticPath.apiUrl).test(filePath)? filePath: `${StaticPath.apiUrl}/${filePath}`;
  }
}
