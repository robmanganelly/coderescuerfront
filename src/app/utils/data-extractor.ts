import { HttpErrorResponse } from "@angular/common/http";
import { EnvelopedResponse } from "../interfaces/httpResponse"

export class DataExtractor<T> {

  constructor(){}

  static extract<T>(bodyPayload: EnvelopedResponse<T>){
    return bodyPayload.data.data;
  }

  static extractError<T>(bodyPayload: HttpErrorResponse){
    return bodyPayload.error
  }

}
